package com.project.chatconnectbackend.repository;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.chatconnectbackend.model.Conversation;
import java.util.List;
import java.util.Map;

// This will be AUTO IMPLEMENTED by Spring into a Bean called conversationRepository

public interface ConversationRepository extends JpaRepository<Conversation, Integer> {

    @Query(value = """
            SELECT
            sq.*
            FROM
                (SELECT
                    conv.conversation_name,
                        grp_mmb.conversation_id,
                        grp_mmb.user_id
                FROM
                    conversations conv
                INNER JOIN group_members grp_mmb
                ON conv.id = grp_mmb.conversation_id) AS sq
            INNER JOIN
                (SELECT
                    conv.conversation_name,
                        grp_mmb.conversation_id,
                        grp_mmb.user_id
                FROM
                    conversations conv
                INNER JOIN group_members grp_mmb ON conv.id = grp_mmb.conversation_id) AS sq2
                ON (
                    sq.conversation_id = sq2.conversation_id
                        AND sq.conversation_name = :conversationName
                        AND sq.user_id <> sq2.user_id
                        AND sq.user_id = :userId1 
                        AND sq2.user_id = :userId2
                    );
                """, nativeQuery = true)

    List<Map<String, Object>> findDirectConversationBetweenUsers(
            @Param("conversationName") String conversationName, @Param("userId1") Integer userId1, @Param("userId2") Integer userId2);
}