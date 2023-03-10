import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPoints, getQuiz } from '../../hooks/getCollections'
import { TPoints, TQuestions, TQuiz } from '../../interfaces/interfaces'
import IQuestions from '../../components/questions'

type appState = {
    questions: TQuestions[],
    quiz: TQuiz,
}

type Props = {}

export default function IquestionsPage({ }: Props) {

    const { id } = useParams()

    const [questions, setQuestions] = useState<appState["questions"]>()
    const [quiz, setQuiz] = useState<appState["quiz"]>()

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            getQuiz(id)
                .then(res => {
                    setQuiz(res.data)
                    setQuestions(res.data.questions)
                }).catch(e => {
                    navigate("../xd")
                })
        }

    }, [])

    return (
        <div className="">
            {
                questions && quiz
                    ?
                    <IQuestions questionsList={questions} quiz={quiz}></IQuestions>
                    :
                    <></>
            }
        </div>
    )
}