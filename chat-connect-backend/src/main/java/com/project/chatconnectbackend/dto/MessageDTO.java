package com.project.chatconnectbackend.dto;


import com.project.chatconnectbackend.enumValues.MessageStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Integer id;  
    private String messageText;
    private String fromNumber;
    private MessageStatus status;
    private Integer conversationId;
}