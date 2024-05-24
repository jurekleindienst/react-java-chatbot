package com.example.chatbot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

// Entity to create "ANSWERS" table with columns (id, answer) where 'id' is the primary key.
// It defines a one-to-one relationship with 'Question' entity , linking each answer to its specific question.
@Entity
@Table(name = "ANSWERS")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answer", nullable = false)
    private String answer;

    @OneToOne
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private Question question;

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
