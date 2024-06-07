import React, {useState, useEffect} from 'react';

const QuestionList = ({categoryId, categoryName}) => {
    // Set and Save questions of currently selected category.
    const [questions, setQuestions] = useState([]);
    // Set and Save current active question => which answer should be displayed.
    const [activeQuestionId, setActiveQuestionId] = useState(null);

    // [categoryId]: Only re-render the effect if categoryId changes (if different category is chosen).
    useEffect(() => {
        fetch(`/api/questions/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {setQuestions(data)})
            .catch(error => console.error('Error fetching questions:', error));
    }, [categoryId]);

    // Set or unset the active question, based on if it is already active (hiding/showing the answer).
    const toggleQuestion = (id) => {
        setActiveQuestionId(activeQuestionId === id ? null : id)
    }

    // Map each question retrieved for the selected category and create a button for each.
    // Clicking the button toggles the visibility of the corresponding answer just below it.
    return (
        <div className="question-list-container">
            <p>{categoryName}</p>
            {questions.map((question) => (
                <div className="question-item" key={question.id}>
                    {/* Each question can be clicked to toggle its answer's visibility. */}
                    <button className="question-button" onClick={() => toggleQuestion(question.id)} >
                        {question.question}
                    </button>
                    {/* Conditionally render the answer section only if this question is the active question. */}
                    {activeQuestionId === question.id && (
                        <div className="answer-container">
                            {/* Display the answer. Assumes the answer is nested within the 'answer' field of the question. */}
                            <p>{question.answer.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
};

export default QuestionList;