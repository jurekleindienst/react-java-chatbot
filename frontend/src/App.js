import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import QuestionList from "./components/QuestionList";
import './styles/App.css';
import chatbotIcon from './assets/images/turtle.png';

function App() {
    // State to keep track of the selected category and question
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    // State to maintain the chat history
    const [chatHistory, setChatHistory] = useState([]);
    // State to know if chat has started
    const [chatStarted, setChatStarted] = useState(false);
    // State to toggle chat window visibility
    const [isChatOpen,setIsChatOpen] = useState(false);

    // Text constants for greeting and instructions
    const greetingText = "Hi, it's great to see you!";
    const instructionText = "What information are you looking for? Please use the navigation below.";

    // Function to open the chat window
    const openChat = () => {
        setIsChatOpen(true);
    }

    // Function to close the chat window
    const closeChat = () => {
        setIsChatOpen(false);
    }

    // Function to add instruction (instructionText) to the chat history
    const addInstructionToHistory = () => {
        setChatHistory(history => [
            ...history,
            { type: 'instruction', text: instructionText, sender: 'system' },
        ]);
    };

    // Handler for selecting a category, updates the selected category and chat history
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setSelectedQuestion(null); // Clear previously selected question
        setChatStarted(true);
        // Spread operator (...) -> copy the current history array, add the {object}
        setChatHistory(history => [
            ...history,
            { type: 'category', text: category.category, sender: 'user' }]);
    };

    // Handler for selecting a question, updates the selected question and chat history
    const handleSelectQuestion = (question) => {
        setSelectedQuestion(question);
        setChatHistory(history => [
            ...history,
            { type: 'question', text: question.question, sender: 'user' }]);
    };

    // Handler to reset the chat, clearing selections and starting over (button: "Ask a new question")
    const handleResetChat = () => {
        setSelectedCategory(null);
        setSelectedQuestion(null);
        setChatStarted(false);
        addInstructionToHistory();
    };

    // Fetch answer when a question is selected and update chat history
    useEffect(() => {
        if (selectedQuestion) {
            fetch(`/api/answers/question/${selectedQuestion.id}`)
                .then(response => response.json())
                .then(data => setChatHistory(history => [...history, { type: 'answer', text: data.answer, sender: 'system' }]))
                .catch(error => {
                    console.error('Error fetching answer:', error);
                    setChatHistory(history => [...history, { type: 'answer', text: 'Failed to load answer.', sender: 'system' }]);
                });
        }
    }, [selectedQuestion]);

    // Rendering the app UI
    return (
        <div className="app">

            {/* Button to open chat, only shown if chat is not open */}
            {!isChatOpen && (
                <div className="chat-popup-button" onClick={openChat}>
                    <img src={chatbotIcon} className="chat-popup-image" alt="Chat Icon" />
                    <div className="chat-popup-message">Message Us</div>
                </div>
            )}

            {/* Chat container, visible if chat is open */}
            <div className={`chat-container ${isChatOpen ? 'chat-container-visible' : ''}`}>
                {/* Chat header with image and close button */}
                <div className="chat-header">
                    <img src={chatbotIcon} className="chatbot-header-icon" alt="Chatbot"/>
                    <span>Tomi</span>
                    <button className="close-chat" onClick={closeChat}>×</button>
                </div>

                {/* Main chat container */}
                <div className="chat">

                    {/* Greeting and Instruction message */}
                    <div className="message-sender-intro">Tomi</div>
                    <div className="greeting">
                        <p>{greetingText} {String.fromCodePoint(0x1F44B)}</p>
                    </div>
                    <div className="instruction">
                        <p>{instructionText}</p>
                    </div>

                    {/* Chat history mapped to chat entries */}
                    {chatHistory.map((entry, index) => (
                        <div className={`chat-entry ${entry.sender}`} key={index}>
                            <div className={"message-sender"}>
                                    {entry.sender === 'system' ? 'Tomi' : null}
                            </div>
                            <div className={"message-content"}>
                                <p>{entry.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Category list shown when no category is selected */}
                    {!chatStarted && <CategoryList onSelectCategory={handleSelectCategory} />}

                    {/* Question list shown when no question is selected */}
                    {chatStarted && selectedCategory && !selectedQuestion && (
                        <QuestionList categoryId={selectedCategory.id} onSelectQuestion={handleSelectQuestion} />
                    )}
                </div>

                {/* Chat footer with reset button */}
                <div className="chat-footer">
                    <button className="reset-button" onClick={handleResetChat}>
                        Ask a new question
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;