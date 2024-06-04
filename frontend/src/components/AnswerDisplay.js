import React, {useState, useEffect} from "react";

const AnswerDisplay = ({questionId}) => {
    // question: Current state
    // setQuestion: Update state
    const [answer, setAnswer] = useState('');

    // [categoryId]: Only re-render the effect if questionId changes (if question changes)
    useEffect(() => {
        fetch(`/api/answers/question/${questionId}`)
            .then(response => response.json())
            .then(data => setAnswer(data.answer))
            .catch(error => console.error('Error fetching answer:', error))
    }, [questionId]);

    return <div>{answer}</div>
};

export default AnswerDisplay;