package com.project.chatconnectbackend.controller.v1;

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

import com.project.chatconnectbackend.dto.AuthenticationRequest;
import com.project.chatconnectbackend.dto.AuthenticationResponse;
import com.project.chatconnectbackend.dto.GetAllChatsServiceResponseDTO;
import com.project.chatconnectbackend.dto.GetAllMessagesBetweenUsersServiceResponseDTO;
import com.project.chatconnectbackend.dto.RegisterRequest;
import com.project.chatconnectbackend.dto.ResponseDTO;
import com.project.chatconnectbackend.service.AuthenticationService;
import com.project.chatconnectbackend.service.ChatService;
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

  private final AuthenticationService authenticationService;

  private final ChatService chatService;

  @PostMapping(path = "/auth/register", produces = "application/json") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<AuthenticationResponse> registerNewUser(
      @RequestBody RegisterRequest request, HttpServletResponse response) {
    try {
      return ResponseEntity.ok(authenticationService.register(request, response));
    } finally {
      System.out.println("Register controller called!");
    }
  }

  @PostMapping(path = "/auth/login", produces = "application/json") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<AuthenticationResponse> loginUser(
      @RequestBody AuthenticationRequest request, HttpServletResponse response) {
    try {
      return ResponseEntity.ok(authenticationService.authenticate(request, response));
    } finally {
      System.out.println("Login controller called!");
    }
  }

  @GetMapping(path = "/auth/getUserFromToken", produces = "application/json") // Map ONLY GET Requests
  public @ResponseBody ResponseEntity<?> getUserFromToken(
      HttpServletRequest request, HttpServletResponse response) {
    try {
      ResponseDTO responseObj = authenticationService.getUserFromToken(request, response);
      return new Response().send(responseObj);
    } finally {
      System.out.println("Get User From Token controller called!");
    }
  }

  @PostMapping(path = "/logout", produces = "application/json") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<?> logoutUser(
      HttpServletRequest request, HttpServletResponse response) {
    try {
      return ResponseEntity.ok(authenticationService.logout(request, response));
    } finally {
      System.out.println("Logout controller called!");
    }
  }

  @GetMapping(path = "/allChats", produces = "application/json") // Map ONLY GET Requests
  public @ResponseBody ResponseEntity<ResponseDTO> getAllUsers() {
    try {
      ResponseDTO responseBody = chatService.getAllChats();
      return new Response().send(responseBody);
    } finally {
      System.out.println("Get All Chats controller called!");
    }
  }

  @GetMapping(path = "/users/messages", produces = "application/json") // Map ONLY GET Requests
  @Transactional
  public @ResponseBody ResponseEntity<ResponseDTO> getUserMessages(
      @RequestParam String userId1, String userId2) {
    try {
      // Get messages between two users
      ResponseDTO responseBody = chatService.getAllMessagesBetweenUsers(userId1, userId2);
      return new Response().send(responseBody);
    } finally {
      System.out.println("Get User Messages controller called!");
    }
  }
}