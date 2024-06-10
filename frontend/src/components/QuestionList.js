import React, {useState, useEffect} from 'react';

const QuestionList = ({categoryId, categoryName, categoryDesc}) => {
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
            {questions.map((question) => (
                <div key={question.id}>
                    {/* Each question can be clicked to toggle its answer's visibility. */}
                    <button className="question-button" onClick={() => toggleQuestion(question.id)} >
                        {question.question}
                        {/* Arrow SVG, when question is active, it will have 'rotate-arrow'. */}
                        <svg
                            className={activeQuestionId === question.id ? "rotate-arrow" : ""}
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#0077BD">
                            <path d="M5.42773 4.70898C5.46387 4.85254 5.53809 4.98828 5.65039 5.10059L8.54932 8L5.64893 10.9004C5.31689 11.2324 5.31689 11.7705 5.64893 12.1025C5.98096 12.4336 6.51904 12.4336 6.85107 12.1025L10.3516 8.60059C10.5591 8.39355 10.6367 8.10449 10.585 7.83691C10.5537 7.67578 10.4761 7.52246 10.3516 7.39844L6.85254 3.89941C6.52051 3.56738 5.98242 3.56738 5.65039 3.89941C5.43066 4.11816 5.35645 4.42871 5.42773 4.70898Z"></path>
                        </svg>
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