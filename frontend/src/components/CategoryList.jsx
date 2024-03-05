import React, { useState, useEffect } from "react";

const CategoryList = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error))
    }, []);

    return (
        <div>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}>
                    {category.category}
                </button>
            ))}
        </div>
    );
}

export default CategoryList;