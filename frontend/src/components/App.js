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
    // Set and Save the current opacity
    const [opacity, setOpacity] = useState(1);
    // Set and Save the current status of greeting
    const [showGreetings, setShowGreetings] = useState(true);

    // Set the categoryId and change the current view to display questions associated with the selected category.
    const handleSelectCategory = (categoryId, categoryName) => {
        setOpacity(0); // Start by fading out
        setTimeout(() => {
            setSelectedCategoryId(categoryId);
            setSelectedCategoryName(categoryName);
            setCurrentView('questionList');
            setShowGreetings(false);
            setOpacity(1); // Fade in after transition duration
        }, 1000)
    }

    // Reset the view back to the list of categories, allow to select a different category.
    const handleBackToCategories = () => {
        setOpacity(0); // Start by fading out
        setTimeout(() => {
            setCurrentView('categoryList');
            setSelectedCategoryId(null);
            setOpacity(1);
            setShowGreetings(true);
        }, 1000)
    }

    // Depending on the value of 'currentView', either the 'CategoryList' or the 'QuestionList' is rendered.
    return (
        <div className="app-container">
            {/* Header */}
            <div className="header">
                {currentView === 'questionList' && selectedCategoryId && (
                    <div className="back-to-categories-container">
                        {/* A back button, that allows navigating back to the category list from the questions view. */}
                        <button className="back-to-categories-button" onClick={handleBackToCategories}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="m14 18-6-6 6-6"></path>
                            </svg>
                        </button>
                    </div>
                )}
                <div className="close-chatbot-container">
                    {/* Button to close the chatbot */}
                    <button className="close-chatbot-button">
                        <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 10 L30 30 M30 10 L10 30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Greeting */}
            {showGreetings && (
                <div className="greetings-container" style={{ opacity }}>
                    <p className="hi-there">Hi there! 👋</p>
                    <p className="use-navigation">Please use the navigation below.</p>
                </div>
            )}

            {/* FAQ */}
            <div className="faq-container" style={{ opacity }}>
                {currentView === 'categoryList' && <CategoryList onSelectCategory={handleSelectCategory} />}
                {currentView === 'questionList' && selectedCategoryId && (
                    <div>
                        <QuestionList categoryId={selectedCategoryId} categoryName={selectedCategoryName}/>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="footer">
                <button className="message-button">Send us a message</button>
            </div>
        </div>
    );
}

export default App;
