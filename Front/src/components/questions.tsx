import React, { useState, useEffect } from 'react'
import "../styles/scss/questions/questions.scss"
import NavQuestion from './pure/navQuestion'
import { TQuiz, TQuestions, TPoints } from '../interfaces/interfaces'
import IanswerComponent from './pure/answer'
import IFinalAnswerPage from './pure/finalAnswerPage'
import backgroundImage from "../resources/5719387.jpg"
import { useParams } from 'react-router-dom'
import { getPoints, submitPoints } from '../hooks/getCollections'

interface appState {
    secondsState: number
    nQuestions: number
    question: TQuestions
    questions: TQuestions[]
    loading: boolean
    numCorrects: number
    points: number
    secondsForAnswer: number
    pointsI: TPoints[]
}

type Props = {
    questionsList: TQuestions[]
    quiz: TQuiz
}


let seconds = 20

let finalPage = false

let answerSeconds = 0

export default function IQuestions({ questionsList, quiz }: Props): JSX.Element {

    const [secondsState, setSecondsState] = useState<appState["secondsState"]>(20)
    const [nQuestions, setNQuestions] = useState<appState["nQuestions"]>(1)
    const [question, setQuestion] = useState<appState["question"]>(questionsList[0])
    const [questions, setQuestions] = useState<appState["questions"]>(questionsList)
    const [loading, setLoading] = useState<appState["loading"]>(false)
    const [numCorrects, setNumCorrects] = useState<appState["numCorrects"]>(0)
    const [points, setPoints] = useState<appState["points"]>(0)
    const [secondsForAnswer, setsecondsForAnswer] = useState<appState["secondsForAnswer"]>(0)
    const [pointsState, setPointsState] = useState<appState["pointsI"]>([])

    useEffect(() => {

        if (finalPage) {
            finalPage = false
        }

        getPoints(quiz._id)
            .then(res => {
                const pointsUnOrder = res.data.points
                console.log(pointsUnOrder)
                let pointsOrder = pointsUnOrder.sort(
                    (p1: any, p2: any) => (p1.pointsUser < p2.pointsUser) ? 1 : (p1.pointsUser > p2.pointsUser) ? -1 : 0);
                setPointsState(pointsOrder)
                console.log(pointsOrder)
            })

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

    const timeStop = () => {
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

    const submitPointsEvent = async (data: Object) => {
        submitPoints(quiz._id, data)
            .then(res => {
                const pointsUnOrder = res.data.points
                console.log(pointsUnOrder)
                let pointsOrder = pointsUnOrder.sort(
                    (p1: any, p2: any) => (p1.pointsUser < p2.pointsUser) ? 1 : (p1.pointsUser > p2.pointsUser) ? -1 : 0);
                setPointsState(pointsOrder)
                console.log(pointsOrder)
            })
    }

    if (finalPage) {
        return (
            <IFinalAnswerPage numCorrects={numCorrects} questions={questions} secondsForAnswer={answerSeconds} quizId={quiz._id} pointsState={pointsState} submitPointsEvent={submitPointsEvent}></IFinalAnswerPage>
        )
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
                    <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",justifyContent:"center"}}>
                        <img src={quiz.image.url} alt="" width={"200px"} style={{borderRadius:"50%"}} />
                        <h2 className='mb-5 text-center'>{question.questionsTitle}</h2>
                    </div>

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
                                    <IanswerComponent answers={question.answers} quizImage={quiz.image.url} siguiente={siguiente} timeStop={timeStop}></IanswerComponent>
                                    :
                                    <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}