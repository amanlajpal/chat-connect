package com.backend.ChatConnect.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.ChatConnect.models.User;

@Service
public class UserService {
    private List<User> users = new ArrayList<User>();

    public UserService() {
        users.add(new User("1234567890", "Ankit Patel", "password"));
        users.add(new User("0987654322", "Mohan Kumar", "password"));
        users.add(new User("1234567890", "Nitin Raichu", "password"));
        users.add(new User("0987654322", "Rohan Pikachu", "password"));
    }

    public List<User> getUsers() {
        return this.users;
    }
}
