package com.project.chatconnectbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.chatconnectbackend.model.Message;


// This will be AUTO IMPLEMENTED by Spring into a Bean called messageRepository

public interface MessageRepository extends JpaRepository<Message, Integer>{

    
}