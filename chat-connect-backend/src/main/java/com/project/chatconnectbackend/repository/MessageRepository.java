package com.project.chatconnectbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.chatconnectbackend.model.Message;


// This will be AUTO IMPLEMENTED by Spring into a Bean called messageRepository

public interface MessageRepository extends JpaRepository<Message, Integer>{

    @Query(value = "SELECT * FROM messages WHERE conversation_id = ?1", nativeQuery = true)
    List<Message> findMessagesByConversationId(Integer conversationId);
}