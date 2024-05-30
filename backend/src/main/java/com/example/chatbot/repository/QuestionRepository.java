package com.example.chatbot.repository;

import com.example.chatbot.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Provides CRUD (Create, Read, Update, Delete) operations on the database.
public interface QuestionRepository extends JpaRepository<Question, Long> {
    // Retrieve all questions associated with a specific 'categoryId'.
    List<Question> findByCategoryId(Long categoryId);
}
