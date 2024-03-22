package com.project.chatconnectbackend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.project.chatconnectbackend.model.enumValues.MessageStatus;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ForeignKey;

public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer message_id;

    private String message_text;

    private String from_number;

    private MessageStatus status;

    @CreationTimestamp
    private LocalDateTime sent_at;

    @ManyToOne
    @JoinColumn(
        name = "conversation_id",
        foreignKey = @ForeignKey(name = "CONVERSATION_ID_FK")
    )
    private Conversation conversation;

}
