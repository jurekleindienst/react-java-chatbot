import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import QuestionList from "./components/QuestionList";
import './styles/App.css';
import chatbotIcon from './assets/images/turtle.png';

function App() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [chatStarted, setChatStarted] = useState(false);
    const [isChatOpen,setIsChatOpen] = useState(false);
    const greetingText = "Hi, it's great to see you!";
    const instructionText1 = "What information are you looking for? Please use the navigation below.";

    const openChat = () => {
        setIsChatOpen(true);
    }

    const closeChat = () => {
        setIsChatOpen(false);
    }

    const addInstructionToHistory = () => {
        setChatHistory(history => [
            ...history,
            { type: 'instruction', text: instructionText1, sender: 'system' },
        ]);
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setSelectedQuestion(null); // Clear previously selected question
        setChatStarted(true);
        // Spread operator (...) -> copy the current history array, add to that the {object}
        setChatHistory(history => [
            ...history,
            { type: 'category', text: category.category, sender: 'user' }]);
    };

    const handleSelectQuestion = (question) => {
        setSelectedQuestion(question);
        setChatHistory(history => [
            ...history,
            { type: 'question', text: question.question, sender: 'user' }]);
    };

    const handleResetChat = () => {
        setSelectedCategory(null);
        setSelectedQuestion(null);
        setChatStarted(false);
        addInstructionToHistory();
    };

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

    return (
        <div className="app">
            {!isChatOpen && (
                <button className="chat-popup" onClick={openChat}>ASK A QUESTION!</button>
            )}

            <div className={`chat-container ${isChatOpen ? 'chat-container-visible' : ''}`}>
                <div className="chat-header">
                    <img src={chatbotIcon} className="chatbot-header-icon" alt="Chatbot"/>
                    <span>Tomi</span>
                    <button className="close-chat" onClick={closeChat}>×</button>
                </div>

                <div className="chat">
                    <div className="message-sender-intro">Tomi</div>
                    <div className="greeting">
                        <p>{greetingText} {String.fromCodePoint(0x1F44B)}</p>
                    </div>
                    <div className="greeting">
                        <p>{instructionText1}</p>
                    </div>

                    {chatHistory.map((entry, index) => (
                        <div className={`chat-entry ${entry.sender}`} key={index}>
                            <div className={`message-sender ${entry.sender}`}>
                                <div className="message-sender-chat">
                                    {entry.sender === 'system' ? 'Tomi' : 'You'}
                                </div>
                            </div>
                            <div className="message-content">
                                <p>{entry.text}</p>
                            </div>
                        </div>
                    ))}

                    {!chatStarted && <CategoryList onSelectCategory={handleSelectCategory} />}

                    {chatStarted && selectedCategory && !selectedQuestion && (
                        <QuestionList categoryId={selectedCategory.id} onSelectQuestion={handleSelectQuestion} />
                    )}
                </div>

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