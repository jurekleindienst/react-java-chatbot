// Displays a list of categories as clickable items
import React, {useState, useEffect} from 'react';

const CategoryList = ({onSelectCategory}) => {
    // Set and Save fetched categories
    const [categories, setCategories] = useState([]);

    // []: Reset everytime when re-rendered
    useEffect(() => {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Map each category retrieved and create a button for each.
    // Clicking the button 'onSelectCategory' is called with 'category.id' and 'category.category' (name),
    // allowing the app to know which category was selected.
    return (
        <div className="category-list-container">
            {categories.map((category) => (
                <button className="category-button"
                        key={category.id}
                        onClick={() => onSelectCategory(category.id, category.category)}>
                    {category.category}
                </button>
            ))}
        </div>
    )
};

export default CategoryList;