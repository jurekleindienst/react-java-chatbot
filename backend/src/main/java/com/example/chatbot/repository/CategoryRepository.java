package com.example.chatbot.repository;

import com.example.chatbot.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

// Provides CRUD (Create, Read, Update, Delete) operations on the database.
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Retrieve a category, determined by 'name'.
    Category findByCategory(String name);
}
