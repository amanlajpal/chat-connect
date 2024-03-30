package com.project.chatconnectbackend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.project.chatconnectbackend.model.enumValues.MessageStatus;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ForeignKey;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "message_text")
    private String messageText;

    @Column(name = "from_number")
    private String fromNumber;

    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    @CreationTimestamp
    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @ManyToOne
    @JoinColumn(
        name = "conversation_id",
        foreignKey = @ForeignKey(name = "CONVERSATION_ID_FK_MESSAGE")
    )
    private Conversation conversation;

}
