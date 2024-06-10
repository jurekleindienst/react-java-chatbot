import React, {useState} from 'react';
import CategoryList from './CategoryList';
import QuestionList from './QuestionList';
import EmailForm from "./EmailForm";

function App() {
    // Set and Save the ID of current selected category.
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    // Set and Save the Name of current selected category
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    // Set and Save the current category description
    const [selectedCategoryDesc, setSelectedCategoryDesc] = useState("");
    // Set and Save the current component to display.
    const [currentView, setCurrentView] = useState('categoryList');
    // Set and Save the current opacity
    const [opacity, setOpacity] = useState(1);
    // Set and Save the current status of the greeting
    const [showGreetings, setShowGreetings] = useState(true);
    // Set and Save the current status of the email form
    const [showEmailForm, setShowEmailForm] = useState(false);

    // Map categoryId with their descriptions
    const categoryDescriptions = {
        1: "Find out how to book your stay with us, including reservation policies and rates.",
        2: "Learn about the site rules, pet policies, and safety guidelines to ensure a pleasant stay.",
        3: "Explore the amenities and services available at our campsite, from electric hookups to laundry facilities.",
        4: "Your health and safety are our top priorities. Read our health protocols and emergency procedures.",
        5: "Discover nearby attractions, trails, and activities to enhance your visit."
    }

    // Set the categoryId and change the current view to display questions associated with the selected category.
    const handleSelectCategory = (categoryId, categoryName) => {
        const categoryDesc = categoryDescriptions[categoryId];
        setOpacity(0); // Start by fading out
        setTimeout(() => {
            setSelectedCategoryId(categoryId);
            setSelectedCategoryName(categoryName);
            setSelectedCategoryDesc(categoryDesc);
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
            setShowEmailForm(false);
            setShowGreetings(true);
        }, 1000)
    }

    const handleSendMessageClick = () => {
        setShowEmailForm(true);
        setCurrentView('emailView');
    }

    const handleCloseEmailForm = () => {
        setShowEmailForm(false);
        setCurrentView('emailView');
    }

    // Depending on the value of 'currentView', either the 'CategoryList' or the 'QuestionList' is rendered.
    return (
        <div className={`app-container ${(currentView === 'questionList' || currentView === 'emailView') ? 'adjust-height' : ''}`}>
            {/* Header */}
            <div className="header">
                {(currentView === 'questionList' || currentView === 'emailView') && (
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
            <div className="greetings-container" style={{ opacity }}>
                {showGreetings && (
                    <div>
                        <p className="hi-there">Hi there! 👋</p>
                        <p className="use-navigation">Please use the navigation below.</p>
                    </div>
                )}
            </div>

            {/* Category Description */}
            <div className="category-desc-container" style={{ opacity }}>
                {currentView === 'questionList' && (
                    <div className="category-desc">
                        <h1>{selectedCategoryName}</h1>
                        <p>{selectedCategoryDesc}</p>
                    </div>
                )}
            </div>

            {/* FAQ */}
            <div className="faq-container" style={{ opacity }}>
                {currentView === 'categoryList' && <CategoryList onSelectCategory={handleSelectCategory} />}
                {currentView === 'questionList' && selectedCategoryId && (
                    <div>
                        <QuestionList categoryId={selectedCategoryId}/>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="footer">
                <button className="message-button" onClick={handleSendMessageClick}>
                    Send us a message
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none" viewBox="0 0 17 16" color="linkColor">
                        <path fill="currentColor" fill-rule="evenodd" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default App;
