package com.project.chatconnectbackend.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "conversations")
@Entity
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer conversation_id;

    private Integer conversation_name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    Set<GroupMember> groupMembers;
}
