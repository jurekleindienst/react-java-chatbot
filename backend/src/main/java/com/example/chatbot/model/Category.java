package com.example.chatbot.model;

import jakarta.persistence.*;

import java.util.Set;

// Entity to create "CATEGORIES" table with two columns (id, category) where 'id' is the primary key.
// It defines a one-to-many relationship with the 'Question' entity, linking each category to multiple questions.
@Entity
@Table(name = "CATEGORIES")
public class Category {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category", nullable = false)
    private String category;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Question> questions;

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
