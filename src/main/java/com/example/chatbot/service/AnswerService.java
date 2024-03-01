package com.example.chatbot.service;

import com.example.chatbot.model.Answer;
import com.example.chatbot.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer getAnswerByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
    }
}
