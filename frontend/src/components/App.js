import React, {useState} from 'react';
import CategoryList from './CategoryList';
import QuestionList from './QuestionList';
import AnswerDisplay from './AnswerDisplay';

function App() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    const handleSelectCategory = (categoryId) => {
      setSelectedCategoryId(categoryId);
      // Reset selectedQuestionId when new category is selected
      setSelectedQuestionId(null);
    }

    const handleSelectQuestion = (questionId) => {
      setSelectedQuestionId(questionId);
    }

    return (
        <div>
            <CategoryList onSelectCategory={handleSelectCategory} />
            {selectedCategoryId && <QuestionList categoryId={selectedCategoryId} onSelectQuestion={handleSelectQuestion}/>}
            {selectedQuestionId && <AnswerDisplay questionId={selectedQuestionId} />}
        </div>
    )
}

export default App;
