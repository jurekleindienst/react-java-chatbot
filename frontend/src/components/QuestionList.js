import React, {useState, useEffect} from "react";

const QuestionList = ({categoryId, onSelectQuestion}) => {
    // question: Current state
    // setQuestion: Update state
    const [questions, setQuestions] = useState([]);

    // [categoryId]: Only re-render the effect if categoryId changes (if category changes)
    useEffect(() => {
        fetch(`/api/questions/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {setQuestions(data)})
            .catch(error => console.error('Error fetching questions:', error));
    }, [categoryId]);

    return (
        <div>
            {questions.map((question) => (
                <button key={question.id} onClick={() => onSelectQuestion(question.id)}>
                    {question.question}
                </button>
            ))}
        </div>
    )
};

export default QuestionList;