import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import QuestionList from "./components/QuestionList";
import './styles/App.css';

function App() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [chatStarted, setChatStarted] = useState(false);
    const greetingText = "Hi, it's great to see you!";
    const instructionText1 = "What information are you looking for? Please use the navigation below.";

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
            <div className="chat-header">Camping Šobec</div>

            <div className="chat">
                <div className="message-sender-intro">Chatbot</div>
                <div className="greeting">
                    <p>{greetingText} {String.fromCodePoint(0x1F44B)}</p>
                </div>
                <div className="greeting">
                    <p>{instructionText1}</p>
                </div>

                {chatHistory.map((entry, index) => (
                    <div className={`chat-entry ${entry.sender}`} key={index}>
                        <div className={`message-sender ${entry.sender}`}>
                            {entry.sender === 'system' ? 'Chatbot' : 'You'}
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
    );
}

export default App;