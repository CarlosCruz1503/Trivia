import { instance } from "../utils/axiosConfig"

const URL = process.env.REACT_APP_API_URL

export const getQuizes = async () => {
    const quizes = await instance.get("https://quizhook.hopto.org/api/quiz/")
    return quizes
}

export const getQuiz = async (id: string) => {
    const quiz = await instance.get(`https://quizhook.hopto.org/api/quiz/${id}`)
    return quiz
}
export const submitPoints = async (quizId: String, data: Object) => {
    const points = await instance.post(`/api/quiz/points/${quizId}`, data)
    return points
}

export const getPoints = async (quizId: String) => {
    const points = await instance.get(`/api/quiz/points/${quizId}`)
    return points
}