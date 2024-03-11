import React, { useState, useEffect } from "react";

const QuestionList = ({ categoryId, onSelectQuestion }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch(`/api/questions/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setQuestions(data);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [categoryId]); // Re-render once category changes

    return (
        <div className="button-container">
            {questions.map((question) => (
                <button
                    className="button"
                    key={question.id}
                    onClick={() => onSelectQuestion(question)}>
                    {question.question}
                </button>
            ))}
        </div>
    );
}

export default QuestionList;