package com.example.chatbot.repository;

import com.example.chatbot.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Provides CRUD (Create, Read, Update, Delete) operations on the database.
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    // Retrieves an answer associated with a specific 'questionId'.
    Optional<Answer> findByQuestionId(Long questionId);
}
