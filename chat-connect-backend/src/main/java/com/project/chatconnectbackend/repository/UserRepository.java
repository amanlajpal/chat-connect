package com.project.chatconnectbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.chatconnectbackend.model.User;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserRepository extends JpaRepository<User, Integer>{

    
}