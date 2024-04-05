package com.project.chatconnectbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.chatconnectbackend.model.Message;
import com.project.chatconnectbackend.model.enumValues.MessageStatus;

// This will be AUTO IMPLEMENTED by Spring into a Bean called messageRepository

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query(value = "SELECT * FROM messages WHERE conversation_id = ?1", nativeQuery = true)
    List<Message> findMessagesByConversationId(Integer conversationId);

    @Query(value = "UPDATE messages SET status = ?1 WHERE conversation_id = ?2", nativeQuery = true)
    void updateMessageStatusByConversationId(String status, Integer conversationId);

    @Modifying
    @Query(value = "INSERT INTO messages (message_text, from_number, status, conversation_id) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    @org.springframework.transaction.annotation.Transactional
    Integer createMessageCustom(String messageText, String fromNumber, String status, Integer conversationId);
}