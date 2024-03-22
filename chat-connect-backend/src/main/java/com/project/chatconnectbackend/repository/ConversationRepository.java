package com.project.chatconnectbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.chatconnectbackend.model.Conversation;


// This will be AUTO IMPLEMENTED by Spring into a Bean called conversationRepository

public interface ConversationRepository extends JpaRepository<Conversation, Integer>{

    
}