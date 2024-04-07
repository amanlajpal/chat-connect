package com.project.chatconnectbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

import com.project.chatconnectbackend.model.User;
import java.util.List;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByPhoneNumberAndPassword(String phoneNumber, String password);
}