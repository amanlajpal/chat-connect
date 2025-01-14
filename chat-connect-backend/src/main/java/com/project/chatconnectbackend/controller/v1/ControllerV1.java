package com.project.chatconnectbackend.controller.v1;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.chatconnectbackend.chat.Chat;
import com.project.chatconnectbackend.dto.AuthenticationRequest;
import com.project.chatconnectbackend.dto.AuthenticationResponse;
import com.project.chatconnectbackend.dto.RegisterRequest;
import com.project.chatconnectbackend.model.Conversation;
import com.project.chatconnectbackend.model.GroupMember;
import com.project.chatconnectbackend.model.Message;
import com.project.chatconnectbackend.model.User;
import com.project.chatconnectbackend.repository.ConversationRepository;
import com.project.chatconnectbackend.repository.GroupMemberRepository;
import com.project.chatconnectbackend.repository.MessageRepository;
import com.project.chatconnectbackend.repository.UserRepository;
import com.project.chatconnectbackend.service.AuthenticationService;
import com.project.chatconnectbackend.utility.Response;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Validated
@RestController // This means that this class is a Controller
@RequestMapping(path = "/api/v1") // This means URL's start with /api/v1 (after Application path)
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ControllerV1 {
  @Autowired // This means to get the bean called userRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private UserRepository userRepository;

  @Autowired // This means to get the bean called conversationRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private ConversationRepository conversationRepository;

  @Autowired // This means to get the bean called messageRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private MessageRepository messageRepository;

  @Autowired // This means to get the bean called groupMemberRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private GroupMemberRepository groupMemberRepository;

  private final AuthenticationService service;

  @PostMapping(path = "/auth/register", produces = "application/json") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<AuthenticationResponse> registerNewUser(
      @RequestBody RegisterRequest request, HttpServletResponse response) {
    try {
      return ResponseEntity.ok(service.register(request, response));
    } finally {
      System.out.println("User saved");
    }
  }

  @PostMapping(path = "/auth/login", produces = "application/json") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<AuthenticationResponse> loginUser(
     @RequestBody AuthenticationRequest request, HttpServletResponse response) {
    try {
      return ResponseEntity.ok(service.authenticate(request, response));
    } finally {
      System.out.println("User logged in");
    }
  }

  @GetMapping(path = "/getUserFromToken", produces = "application/json") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<?> getUserFromToken(
    HttpServletRequest request, HttpServletResponse response) {
    try {
      Object responseObj = service.getUserFromToken(request, response);
      System.out.println(responseObj);
      return ResponseEntity.ok(responseObj);
    } finally {
      System.out.println("getUserFromToken called!");
    }
  }

  @PostMapping(path = "/logout", produces = "application/json") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<?> logoutUser(
    HttpServletRequest request, HttpServletResponse response) {
    try {
      return ResponseEntity.ok(service.logout(request, response));
    } finally {
      System.out.println("User logged out!");
    }
  }

  @GetMapping(path = "/allChats", produces = "application/json") // Map ONLY GET Requests
  public @ResponseBody ResponseEntity<Map<String, Object>> getAllUsers() {
    try {
      // This returns a JSON or XML with the users
      // Create the response body
      Iterable<User> users = userRepository.findAll();
      ArrayList<Chat> chats = new ArrayList<>();
      users.forEach(user -> {
        user.setPassword(null);
        chats.add(Chat.builder()
            .phoneNumber(user.getPhoneNumber())
            .name(user.getFirstName() + " " + user.getLastName())
            .profilePhoto(user.getProfilePhoto())
            .status(null)
            .lastMessage(null)
            .lastMessageTime(null)
            .id(user.getId())
            .build());
      });
      Map<String, Object> responseBody = new HashMap<>();
      responseBody.put("status", "success");
      responseBody.put("data", chats);
      responseBody.put("message", "Users fetched successfully!");

      return ResponseEntity.ok(responseBody);
    } finally {
      System.out.println("Users fetched");
    }
  }

  @GetMapping(path = "/users/messages", produces = "application/json") // Map ONLY GET Requests
  @Transactional
  public @ResponseBody ResponseEntity<Map<String, Object>> getUserMessages(
      @RequestParam String userId1, String userId2) {
    try {
      // Create the response body
      Integer[] userIdsForMessages = new Integer[] { Integer.parseInt(userId1), Integer.parseInt(userId2) };
      List<Map<String, Object>> foundConversations = conversationRepository
          .findDirectConversationBetweenUsers("direct", userIdsForMessages[0], userIdsForMessages[1]);
      Integer foundConversationId = foundConversations.size() > 0
          ? (Integer) ((Map<String, Object>) foundConversations.get(0)).get("conversation_id")
          : null;
      if (foundConversationId != null) {
        List<Message> foundMessages = messageRepository.findMessagesByConversationId(foundConversationId);        
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("conversationId", foundConversationId);
        responseBody.put("messages", foundMessages);
        responseBody.put("fromUserId", userIdsForMessages[0]);
        responseBody.put("toUserId", userIdsForMessages[1]);
        if (foundMessages.isEmpty()) {
          return new Response().success(responseBody, "No messages found between users");
        } else {
          return new Response().success(responseBody, "Messages fetched successfully!");
        }
      } else {
        Conversation newConversation = new Conversation();
        newConversation.setConversationName("direct");
        Conversation createdConversation = conversationRepository.save(newConversation);
        Set<GroupMember> createdGroupMembers = new HashSet<>();
        for (Integer userId : userIdsForMessages) {
          GroupMember groupMember = new GroupMember();
          groupMember.setConversation(createdConversation);
          Optional<User> user = userRepository.findById(Objects.requireNonNull(userId));
          if (user.isPresent()) {
            groupMember.setUsers(user.get()); // Fix: Pass the actual User object instead of Optional<User>
          }
          GroupMember createdGroupMember = groupMemberRepository.save(groupMember);
          createdGroupMembers.add(createdGroupMember);
        }
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("conversationId", createdConversation.getId());
        responseBody.put("messages", new ArrayList<>());
        responseBody.put("fromUserId", userIdsForMessages[0]);
        responseBody.put("toUserId", userIdsForMessages[1]);
      }
      // Get messages between two users
      return new Response().success(foundConversationId, "Messages fetched successfully!");
    } finally {
      System.out.println("Messages fetched");
    }
  }
}