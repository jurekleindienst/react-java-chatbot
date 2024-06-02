// Manages all API calls to the backend
const URL = "http://localhost:8080/api";

// Async:   Allows the use of await inside the function.
// Await:   Pauses the execution of the function until the promise returned by fetch is resolved.
export const fetchCategories = async () => {
    const response = await fetch(`${URL}/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await response.json();
};

export const fetchQuestionsByCategory = async (categoryId) => {
    try {
        const response = await fetch(`${URL}/questions/category/${categoryId}`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const fetchAnswerByQuestions = async (questionId) => {
    try {
        const response = await fetch(`${URL}/answers/question/${questionId}`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}