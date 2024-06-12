import React, {useState} from 'react';
import CategoryList from './CategoryList';
import QuestionList from './QuestionList';
import EmailForm from "./EmailForm";

function App() {
    // Set and Save the ID of current selected category.
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    // Set and Save the Name of current selected category.
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    // Set and Save the Description of current selected category.
    const [selectedCategoryDesc, setSelectedCategoryDesc] = useState("");
    // Set and Save the component view we are currently in.
    const [currentView, setCurrentView] = useState('categoryList');
    // Set and Save the opacity (of (*) faq-container, greeting and category descriptions) - used for transitions (initialState: 1 - (*)-components shown).
    const [opacity, setOpacity] = useState(1);
    // Set and Save the opacity of the email form - used for transitions (initialState: 0 - email form hidden at render).
    const [emailFormOpacity, setEmailFormOpacity] = useState(0);
    // Set and Save the current status of the email form (initialState: false - not in email form view at render).
    const [showEmailForm, setShowEmailForm] = useState(false);
    // Set and Save the current status of the greeting (initialState: true - greeting messages are shown at render).
    const [showGreetings, setShowGreetings] = useState(true);


    // Check if on Mobile (for open button visibility).
    const isMobileScreen = () => window.innerWidth <= 769;
    // Set and Save the current app visibility status (initialState: false - app is not seen at render)
    const [isAppVisible, setIsAppVisible] = useState(!isMobileScreen());
    // Set and Save the open icon visibility status (initialState: true - icon is seen at render)
    const [showOpenIcon, setShowOpenIcon] = useState(isMobileScreen);


    const backButtonSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="m14 18-6-6 6-6"></path>
        </svg>
    );

    const closeButtonSvg = (
        <svg width="24" height="24" viewBox="0 0 40 40" fill="#0077BD" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 L30 30 M30 10 L10 30" stroke="#0077BD" stroke-width="3" stroke-linecap="round"/>
        </svg>
    );

    const sendSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none" viewBox="0 0 17 16" color="linkColor">
            <path fill="currentColor" fill-rule="evenodd" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966" clip-rule="evenodd"></path>
        </svg>
    );

    // Map the category ID with their description.
    const categoryDescriptions = {
        1: "Find key details on booking procedures, payment methods, and reservation policies here.",
        2: "Quickly access our campsite rules, pet policies, and safety guidelines.",
        3: "Explore amenities and services available at our campsite from utilities to fun activities.",
        4: "Learn about our health protocols and safety measures to ensure your well-being during your stay.",
        5: "Get tips on local attractions and activities to enhance your experience in our region."
    }

    // Receive categoryId, categoryName parameter values from CategoryList component.
    // Make the transition to question list view.
    const handleSelectCategory = (categoryId, categoryName) => {
        const categoryDesc = categoryDescriptions[categoryId];
        setOpacity(0); // Start by fading out (of faq-container (category list view)).
        setTimeout(() => {
            setSelectedCategoryId(categoryId);
            setSelectedCategoryName(categoryName);
            setSelectedCategoryDesc(categoryDesc);
            setCurrentView('questionList');
            setShowGreetings(false);
            setOpacity(1); // Fade in after transition duration.
        }, 1000)
    }

    // Reset the view back to the list of categories, allow to select a different category.
    const handleBackToCategories = () => {
        setOpacity(0); // Start by fading out (of faq-container (question list view)).
        setEmailFormOpacity(0);
        setTimeout(() => {
            setCurrentView('categoryList');
            setSelectedCategoryId(null);
            setShowEmailForm(false);
            setShowGreetings(true);
            setOpacity(1);
        }, 1000)
    }

    // Make the transition to email view.
    const handleSendMessageClick = () => {
        setOpacity(0); // Start by fading out (of faq-container (category/question list view)).
        setEmailFormOpacity(0);
        setTimeout(() => {
            setCurrentView('emailView');
            setShowEmailForm(true);
            setShowGreetings(false);
            setEmailFormOpacity(1); // Fade in the email form view.
        }, 1000)
    }

    // Transition from email form view.
    const handleCloseEmailForm = () => {
        setEmailFormOpacity(0);
        setShowEmailForm(false);
        setShowGreetings(false);
        setCurrentView('emailView')
    }

    // Clicking on the close button.
    const handleCloseClick = () => {
        setIsAppVisible(false);
        setShowOpenIcon(true);
    }

    // Clicking on the Open Icon (Ask a question!).
    const handleOpenClick = () => {
        setIsAppVisible(true);
        setShowOpenIcon(false);
    }

    // Depending on the value of 'currentView', either the 'CategoryList' or the 'QuestionList' is rendered.
    return (
        <div>
            {showOpenIcon && (
                <div className="open-icon-container" onClick={handleOpenClick}>
                    <button className="open-icon-button">Ask a question!</button>
                </div>
            )}

            {isAppVisible && (
                <div className={`app-container ${(currentView === 'questionList' || currentView === 'emailView') ? 'adjust-height' : ''}`}>
                    {/* Header */}
                    <div className="header">
                        {/* Back button - allows navigating back to the category list from the question list view or email form view. */}
                        {(currentView === 'questionList' || currentView === 'emailView') && (
                            <div className="back-to-categories-container">
                                <button className="back-to-categories-button" onClick={handleBackToCategories}>
                                    {backButtonSvg}
                                </button>
                            </div>
                        )}

                        {/* Logo */}
                        <div className="logo-container">
                            <img src="/logo_transparent.png" alt="Logo" className="logo"/>
                        </div>

                        {/* Close button */}
                        <div className="close-chatbot-container">
                            <button className="close-chatbot-button" onClick={handleCloseClick}>
                                <svg width="24" height="24" viewBox="0 0 40 40" fill="#0077BD" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 10 L30 30 M30 10 L10 30" stroke="#0077BD" stroke-width="3" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Greeting */}
                    <div className="greetings-container" style={{ opacity }}>
                        {showGreetings && (
                            <div>
                                <p className="hi-there">Hi there! 👋</p>
                                <p className="welcome">Welcome to Camping Šobec!</p>
                                <p className="information">
                                    Click on a category to view frequently asked questions and their answers.
                                    If you have specific questions, don't hesitate to send us a message!
                                </p>
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

                    {/* Email Form */}
                    <div className="email-form-container" style={{ opacity: emailFormOpacity, transition: 'opacity 1s ease'}}>
                        {currentView === 'emailView' && showEmailForm && (
                            <div>
                                <p>How can we help you?</p>
                                <EmailForm closeForm={handleCloseEmailForm} />
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
                            {sendSvg}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
