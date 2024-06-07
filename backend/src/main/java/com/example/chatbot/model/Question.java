package com.example.chatbot.model;

import jakarta.persistence.*;

// Entity to create "QUESTIONS" table with columns (id, question) where 'id' is the primary key.
// It defines a many-to-one relationship with 'Category' entity, linking each question to one category.
// It defines a one-to-one relationship with 'Answer' entity, linking each question to its specific answer.
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }
}
