package com.project.chatconnectbackend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "group_members")
@Entity
public class GroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @CreationTimestamp
    private LocalDateTime joined_at;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime left_at;

    @ManyToOne
    @JoinColumn(
        name = "conversation_id",
        foreignKey = @ForeignKey(name = "CONVERSATION_ID_FK")
    )
    private Conversation conversation;

    @ManyToOne
    @JoinColumn(
        name = "user_id",
        foreignKey = @ForeignKey(name = "USER_ID_FK")
    )
    private Conversation users;
}
