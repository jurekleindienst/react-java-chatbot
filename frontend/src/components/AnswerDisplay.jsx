import React, { useState, useEffect } from "react";

const AnswerDisplay = ({ questionId }) => {
    const [answerText, setAnswerText] = useState('');

    useEffect(() => {
        fetch(`/api/answers/question/${questionId}`)
            .then(response => response.json())
            .then(data => setAnswerText(data.answer))
            .catch(error => console.error('Error fetching answer:', error))
    }, [questionId]); // Re-render once questionId changes

    return <div>{answerText}</div>
}

export default AnswerDisplay;