package com.example.chatbot.controller;

import com.example.chatbot.model.Answer;
import com.example.chatbot.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Handle HTTP requests. Receive user input and call services to process input data.
@RestController
@RequestMapping("/api/answers")
public class AnswerController {
    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    // Retrieves the answer associated with a specific 'questionId'.
    @CrossOrigin
    @GetMapping("/question/{questionId}")
    public ResponseEntity<Answer> getAnswerByQuestionId(@PathVariable Long questionId) {
        Answer answer = answerService.getAnswerByQuestionId(questionId);
        return ResponseEntity.ok(answer);
    }
}