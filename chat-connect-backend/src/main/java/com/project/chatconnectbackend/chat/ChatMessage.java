package com.project.chatconnectbackend.chat;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String messageText;
    private String fromNumber;
    private Date sentAt;
    private ChatStatus status;
    private String content;
    private String sender;
    private String receiver;
    private MessageType type;
}
