import React, {useState} from "react";
import CategoryList from "../components/CategoryList";
import QuestionList from "../components/QuestionList";
import AnswerDisplay from "../components/AnswerDisplay";

function App() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    function handleSelectCategory(id) {
      setSelectedCategoryId(id);
      // Reset selectedQuestionId when new category is selected
      setSelectedQuestionId(null);
    }

    function handleSelectQuestion(id) {
      setSelectedQuestionId(id);
    }

    return (
        <div className="App">
            <CategoryList onSelectCategory={handleSelectCategory} />
            {selectedQuestionId && (<QuestionList categoryId={selectedCategoryId} onSelectQuestion={handleSelectQuestion}/>)}
            {selectedQuestionId && <AnswerDisplay questionId={selectedQuestionId} />}
        </div>
    )
}

export default App;
