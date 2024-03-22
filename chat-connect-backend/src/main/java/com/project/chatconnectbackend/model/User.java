package com.project.chatconnectbackend.model;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    private String first_name;
    
    private String last_name;
    
    private String phone_number;
    
    private String email;
    
    private String password;
    
    private String profile_photo;
    
    @CreationTimestamp
    private LocalDateTime created_at;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    Set<GroupMember> groupMembers;
}
