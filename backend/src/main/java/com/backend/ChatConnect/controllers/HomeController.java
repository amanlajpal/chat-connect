package com.backend.ChatConnect.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ChatConnect.models.User;
import com.backend.ChatConnect.services.UserService;

@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/home")
    public String home() {
        System.out.println();
        return "Welcome to the ChatConnect API";
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return this.userService.getUsers();
    }
}