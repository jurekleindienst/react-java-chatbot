import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import QuestionList from "./components/QuestionList";

function App() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [chatStarted, setChatStarted] = useState(false);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setSelectedQuestion(null); // Clear previously selected question
        setChatStarted(true);
        setChatHistory(history => [...history, { type: 'category', text: category.category }]);
    };

    const handleSelectQuestion = (question) => {
        setSelectedQuestion(question);
        setChatHistory(history => [...history, { type: 'question', text: question.question }]);
    };

    const handleResetChat = () => {
        setSelectedCategory(null);
        setSelectedQuestion(null);
        setChatStarted(false);
    };

    useEffect(() => {
        if (selectedQuestion) {
            fetch(`/api/answers/question/${selectedQuestion.id}`)
                .then(response => response.json())
                .then(data => setChatHistory(history => [...history, { type: 'answer', text: data.answer }]))
                .catch(error => {
                    console.error('Error fetching answer:', error);
                    setChatHistory(history => [...history, { type: 'answer', text: 'Failed to load answer.' }]);
                });
        }
    }, [selectedQuestion]);

    return (
        <div className="app">
            {chatHistory.map((entry, index) => (
                <div className={`chat-entry ${entry.type}`} key={index}>
                    <p>{entry.text}</p>
                </div>
            ))}

            {!chatStarted && <CategoryList onSelectCategory={handleSelectCategory} />}

            {chatStarted && selectedCategory && !selectedQuestion && (
                <QuestionList categoryId={selectedCategory.id} onSelectQuestion={handleSelectQuestion} />
            )}

            <button className="reset-button" onClick={handleResetChat}>
                Ask a new question!
            </button>
        </div>
    );
}

export default App;