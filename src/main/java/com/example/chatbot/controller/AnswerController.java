package com.example.chatbot.controller;

import com.example.chatbot.model.Answer;
import com.example.chatbot.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {
    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<Answer> getAnswerByQuestionId(@PathVariable Long questionId) {
        Answer answer = answerService.getAnswerByQuestionId(questionId);
        return ResponseEntity.ok(answer);
    }
}
