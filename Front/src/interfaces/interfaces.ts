export interface answer{
    answerText:string
    correct:boolean
}

export interface question {
    questionTitle:string
    answers:answer[]
}