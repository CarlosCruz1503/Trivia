export type TAnswer = {
    answerTitle: String
    correct: Boolean
}



export type TQuestions = {
    questionsTitle: String,
    answers: TAnswer[]
}

export type TImage = {
    filename: string,
    url: string,
    _id: string,
    __v: number
}

export type TPoints = {
    name: string,
    pointsUser: number,
    _id: string
}

export type TQuiz = {
    _id: String
    name: String
    questions: TQuestions[]
    image: TImage
    private: Boolean
    author: {}
    points: []
    createdAt: Date
    updatedAt: Date
}

