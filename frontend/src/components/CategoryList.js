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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#0077BD">
                        <path d="M5.42773 4.70898C5.46387 4.85254 5.53809 4.98828 5.65039 5.10059L8.54932 8L5.64893 10.9004C5.31689 11.2324 5.31689 11.7705 5.64893 12.1025C5.98096 12.4336 6.51904 12.4336 6.85107 12.1025L10.3516 8.60059C10.5591 8.39355 10.6367 8.10449 10.585 7.83691C10.5537 7.67578 10.4761 7.52246 10.3516 7.39844L6.85254 3.89941C6.52051 3.56738 5.98242 3.56738 5.65039 3.89941C5.43066 4.11816 5.35645 4.42871 5.42773 4.70898Z"></path>
                    </svg>
                </button>
            ))}
        </div>
    )
};

export default CategoryList;