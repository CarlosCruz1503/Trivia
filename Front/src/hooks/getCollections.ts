import { instance } from "../utils/axiosConfig"

export const getQuizes = async () => {
    const quizes = await instance.get(`/api/quiz/`)
    return quizes
}

export const getQuiz = async (id: string) => {
    const quiz = await instance.get(`/api/quiz/${id}`)
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