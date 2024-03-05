import React, { useState } from "react";
import CategoryList from "./components/CategoryList";
import QuestionList from "./components/QuestionList";
import AnswerDisplay from "./components/AnswerDisplay";

function App() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    // Callback function for selecting a category
    function handleSelectCategory(id) {
        setSelectedCategoryId(id);
        // Reset the selectedQuestionId when a new category is selected
        setSelectedQuestionId(null);
    }

    // Callback function for selecting a question
    function handleSelectQuestion(id) {
        setSelectedQuestionId(id);
    }

    return (
        <div className="App">
            <CategoryList onSelectCategory={handleSelectCategory} />
            {selectedCategoryId && (
                <QuestionList
                    categoryId={selectedCategoryId}
                    onSelectQuestion={handleSelectQuestion}
                />
            )}
            {selectedQuestionId && <AnswerDisplay questionId={selectedQuestionId} />}
        </div>
    );
}

export default App;
