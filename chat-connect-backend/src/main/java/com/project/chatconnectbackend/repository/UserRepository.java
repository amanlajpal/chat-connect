package com.project.chatconnectbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.chatconnectbackend.model.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.phone_number = :phone AND u.password = :password")
    User findByPhoneAndPassword(@Param("phone") String phone, @Param("password") String password);
}