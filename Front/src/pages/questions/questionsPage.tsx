import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuiz } from '../../hooks/getCollections'
import { TQuestions, TQuiz } from '../../interfaces/interfaces'
import IQuestions from '../../components/questions'

type appState = {
    questions: TQuestions[]
}

type Props = {}

export default function IquestionsPage({ }: Props) {

    const { id } = useParams()

    const [questions, setQuestions] = useState<appState["questions"]>()

    useEffect(() => {
        if (id) {
            let quiz: TQuiz
            getQuiz(id)
                .then(res => {
                    setQuestions(res.data.questions)
                })
        }
    }, [])

    return (
        <div className="">
            {
                questions
                    ?
                    <IQuestions questionsList={questions}></IQuestions>
                    :
                    <></>
            }
        </div>
    )
}