package com.project.chatconnectbackend.model;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    
    @NotNull(message = "Name cannot be null")
    private String first_name;
    
    private String last_name;
    
    @Column(unique = true)
    @Size(min = 10, max = 10, message = "Phone number should be 10 digits")
    private String phone_number;
    
    @Column(unique = true) @Email(message = "Email should be valid")
    private String email;
    
    private String password;
    
    private String profile_photo;
    
    @CreationTimestamp
    private LocalDateTime created_at;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    Set<GroupMember> groupMembers;
}
