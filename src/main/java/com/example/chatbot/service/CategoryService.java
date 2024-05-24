package com.example.chatbot.service;

import com.example.chatbot.model.Category;
import com.example.chatbot.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// Handles business logic (fetching data from the database through the repository layer).
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Retrieves a list of all categories available in the database.
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Retrieves a specific category by its 'id' from the database.
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found."));
    }
}
