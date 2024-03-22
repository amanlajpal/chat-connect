package com.project.chatconnectbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.chatconnectbackend.model.GroupMember;

// This will be AUTO IMPLEMENTED by Spring into a Bean called groupMemberRepository

public interface GroupMemberRepository extends JpaRepository<GroupMember, Integer> {

}