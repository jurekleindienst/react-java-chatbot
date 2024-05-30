package com.example.chatbot.controller;

import com.example.chatbot.model.Question;
import com.example.chatbot.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Handle HTTP requests. Receive user input and call services to process input data.
@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // Retrieves a list of questions associated with a specific 'categoryId' from 'QuestionService'.
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable Long categoryId) {
        List<Question> questions = questionService.getQuestionsByCategory(categoryId);
        return ResponseEntity.ok(questions);
    }

    // Retrieves a question associated with a specific 'id' from 'QuestionService'.
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }
}
