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
public class Chat {
    private String phoneNumber;
    private Integer id;
    private String lastMessage;
    private Date lastMessageTime;
    private String name;
    private String profilePhoto;
    private ChatStatus status;
}
