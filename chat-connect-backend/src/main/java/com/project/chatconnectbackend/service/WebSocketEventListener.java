package com.project.chatconnectbackend.service;

import java.util.Optional;
import java.util.Objects;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.project.chatconnectbackend.dto.Chat;
import com.project.chatconnectbackend.enumValues.ChatStatus;
import com.project.chatconnectbackend.model.User;
import com.project.chatconnectbackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {
    
    private final SimpMessageSendingOperations messageTemplate;
    private final UserRepository userRepository;

    @EventListener
    public void HandleWebSocketDisconnectListener (
        SessionDisconnectEvent event
    ){
        log.info("Received a new web socket disconnect event");
       
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Integer userId = (Integer) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("userId");
        if(userId != null){
            log.info("User Disconnected: " + userId);
            Optional<User> user = userRepository.findById(Objects.requireNonNull(userId));
            Chat chatMessage = Chat.builder()
                .status(ChatStatus.LEAVE)
                .phoneNumber(user.get().getPhoneNumber())
                .id(user.get().getId())
                .name(user.get().getFirstName() + " " + user.get().getLastName())
                .profilePhoto(user.get().getProfilePhoto())
                .build();
            log.info("User Disconnected: " + chatMessage);
            messageTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}
