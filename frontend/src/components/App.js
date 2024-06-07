import React, {useState} from 'react';
import CategoryList from './CategoryList';
import QuestionList from './QuestionList';

function App() {
    // Set and Save the ID of current selected category.
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    // Set and Save the Name of current selected category
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    // Set and Save the current component to display.
    const [currentView, setCurrentView] = useState('categoryList');

    // Set the categoryId and change the current view to display questions associated with the selected category.
    const handleSelectCategory = (categoryId, categoryName) => {
      setSelectedCategoryId(categoryId);
      setSelectedCategoryName(categoryName)
      setCurrentView('questionList')
    }

    // Reset the view back to the list of categories, allow to select a different category.
    const handleBackToCategories = () => {
        setCurrentView('categoryList');
        setSelectedCategoryId(null);
    }

    // Depending on the value of 'currentView', either the 'CategoryList' or the 'QuestionList' is rendered.
    return (
        <div className="app-container">
            {currentView === 'categoryList' && <CategoryList onSelectCategory={handleSelectCategory} />}
            {currentView === 'questionList' && selectedCategoryId && (
                <div>
                    {/* A back button, that allows navigating back to the category list from the questions view. */}
                    <button onClick={handleBackToCategories}>Back to Categories</button>
                    <QuestionList categoryId={selectedCategoryId} categoryName={selectedCategoryName}/>
                </div>
            )}
        </div>
    );
}

export default App;
