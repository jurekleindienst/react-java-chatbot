package com.example.chatbot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "QUESTIONS")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question", nullable = false)
    private String question;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToOne(mappedBy = "question", cascade = CascadeType.ALL)
    private Answer answer;

    // Constructor
    public Question(Long id, String question, Category category, Answer answer) {
        this.id = id;
        this.question = question;
        this.category = category;
        this.answer = answer;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
