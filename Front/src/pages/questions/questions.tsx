import React, { useState, useEffect } from 'react'
import "../../styles/scss/questions/questions.scss"
import NavQuestion from '../../components/pure/navQuestion'
import { question, answer } from '../../interfaces/interfaces'
import answerComponent from '../../components/pure/answer'
import IanswerComponent from '../../components/pure/answer'
import IFinalAnswerPage from '../../components/pure/finalAnswerPage'
import backgroundImage from "../../resources/5719387.jpg"

interface appState {
    secondsState: number
    nQuestions: number
    question: question
    questions: question[]
    loading: boolean
    numCorrects: number
    points: number
    secondsForAnswer: number
}

let answer1: answer = {
    answerText: "Respuesta 1",
    correct: false
}

let answer2: answer = {
    answerText: "Respuesta 2",
    correct: true
}

let questionPrueba: question = {
    questionTitle: " Pregunta 1",
    answers: [answer1, answer2]
}

let questionPrueba2: question = {
    questionTitle: " Pregunta 2",
    answers: [answer1, answer2]
}

let arrayQuestions = [questionPrueba, questionPrueba2]

let seconds = 20

let finalPage = false

let answerSeconds = 0

export default function Questions(): JSX.Element {

    const [secondsState, setSecondsState] = useState<appState["secondsState"]>(20)
    const [nQuestions, setNQuestions] = useState<appState["nQuestions"]>(1)
    const [question, setQuestion] = useState<appState["question"]>(arrayQuestions[0])
    const [questions, setQuestions] = useState<appState["questions"]>(arrayQuestions)
    const [loading, setLoading] = useState<appState["loading"]>(false)
    const [numCorrects, setNumCorrects] = useState<appState["numCorrects"]>(0)
    const [points, setPoints] = useState<appState["points"]>(0)
    const [secondsForAnswer, setsecondsForAnswer] = useState<appState["secondsForAnswer"]>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsState(secondsState => secondsState - 1)
            seconds--
            if (seconds == 0) {
                answerSeconds += 20
                seconds = 20
                setSecondsState(20)
                setQuestion(questions[nQuestions])
                setNQuestions(nQuestions => nQuestions + 1)
            }
            if (finalPage) {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    if (nQuestions > questions.length) {
        finalPage = true
    }

    const timeStop  = () => {
        seconds = 20
    }

    const siguiente = (correctOrNot: boolean) => {
        seconds = 20
        if (correctOrNot) {
            setNumCorrects(numCorrect => numCorrect + 1)
        }
        setLoading(true)
        setNQuestions(nQuestions => nQuestions + 1)
        answerSeconds = answerSeconds + (20 - secondsState)
        setSecondsState(20)
        setTimeout(() => {
            seconds = 20
            setLoading(false)
            setSecondsState(20)
            setQuestion(questions[nQuestions])
        }, 2000)
    }

    return (
        <div className='div-questions'>
            {
                !finalPage
                    ?
                    <NavQuestion secondsState={secondsState} nQuestions={nQuestions} questions={questions}></NavQuestion>
                    :
                    <></>
            }
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="questions">
                {question && !loading && !finalPage
                    ?
                    <h1 className='mb-5'>{question.questionTitle}</h1>
                    :
                    <></>
                }
                {
                    finalPage
                        ?
                        <IFinalAnswerPage numCorrects={numCorrects} questions={questions} secondsForAnswer={answerSeconds}></IFinalAnswerPage>
                        :
                        <></>
                }
                <div className="container">
                    <div className="row row-questions">
                        {
                            loading && !finalPage
                                ?
                                <div className='loading-div'>
                                    <h1>Preparate Para la Siguiente Pregunta</h1>
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                :
                                question && !finalPage
                                    ?
                                    question.answers.map((answer): JSX.Element => {
                                        return (
                                            <IanswerComponent answer={answer} siguiente={siguiente} timeStop={timeStop}></IanswerComponent>
                                        )
                                    })
                                    :
                                    <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}