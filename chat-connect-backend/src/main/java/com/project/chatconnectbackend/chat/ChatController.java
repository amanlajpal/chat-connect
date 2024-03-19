package com.project.chatconnectbackend.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@CrossOrigin(origins = "*")
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        // TODO -- to be implemented
        SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss z");
        Date date = new Date();
        formatDate.setTimeZone(TimeZone.getTimeZone("IST"));
        System.out.println(formatDate.format(date));
        chatMessage.setSentAt(new Date());
        logger.info("Message sent: " + chatMessage.getContent());
        logger.info("Message sent by: " + chatMessage.getSender());
        logger.info("Message sent by: " + chatMessage.getReceiver());
        logger.info("Message type: " + chatMessage.getType());
        logger.info("Message sentAt: " + chatMessage.getSentAt());
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor) {

        // TODO -- to be implemented
        logger.info("User added in Chatroom: " + chatMessage.getSender());
        SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss z");
        Date date = new Date();
        formatDate.setTimeZone(TimeZone.getTimeZone("IST"));
        System.out.println(formatDate.format(date));
        chatMessage.setSentAt(new Date());
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        logger.info("User added in Chatroom: " + headerAccessor);
        return chatMessage;
    }
}
