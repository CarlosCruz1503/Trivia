import axios from "axios"

export const getQuizes = async () => {
    const quizes = await axios.get("http://localhost:3000/api/quiz/")
    return quizes
}

export const getQuiz = async (id: string) => {
    const quiz = await axios.get(`http://localhost:3000/api/quiz/${id}`)
    return quiz
}
