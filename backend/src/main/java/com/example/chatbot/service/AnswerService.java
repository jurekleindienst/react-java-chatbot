package com.example.chatbot.service;

import com.example.chatbot.model.Answer;
import com.example.chatbot.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Handles business logic (fetching data from the database through the repository layer).
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    // Retrieves the answer associated with a specific 'questionId'.
    public Answer getAnswerByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
    }
}
