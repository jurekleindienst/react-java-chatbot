// Displays a list of categories as clickable items
import React, {useState, useEffect} from "react";

const CategoryList = ({onSelectCategory}) => {
    // categories: Current state
    // setCategories: Update state
    const [categories, setCategories] = useState([]);

    // []: Reset everytime when re-rendered
    useEffect(() => {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div>
            {categories.map((category) => (
                <button key={category.id} onClick={() => onSelectCategory(category.id)}>
                    {category.category}
                </button>
            ))}
        </div>
    )
};

export default CategoryList;