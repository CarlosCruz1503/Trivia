import React, { useRef, useEffect, useState } from 'react'
import { TPoints, TQuestions } from '../../interfaces/interfaces'

import "../../styles/scss/questions/finalPage.scss"
import backgroundImage from "../../resources/5719387.jpg"
import { instance } from '../../utils/axiosConfig'
import { getPoints, submitPoints } from '../../hooks/getCollections'
import oro from "../../resources/oro.png"
import plata from "../../resources/plata.png"
import bronze from "../../resources/bronze.png"

type Props = {
    numCorrects: number
    questions: TQuestions[]
    secondsForAnswer: number,
    quizId: String,
    pointsState: TPoints[],
    submitPointsEvent: Function
}



export default function IFinalAnswerPage({ numCorrects, questions, secondsForAnswer, quizId, pointsState, submitPointsEvent }: Props) {

    const points = ((questions.length * numCorrects) * 100) - (secondsForAnswer * 5)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const [puntajeSubmit, setPuntajeSubmit] = useState(false)

    console.log(pointsState)

    return (
        <div className="div-final">
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="final">
                    <h1>Respuestas Correctas</h1>
                    <h1>{numCorrects}/{questions.length}</h1>
                    <h1 className='text-center m-1'>Tardaste {secondsForAnswer}s en contestar la trivia</h1>
                    <h1> Tu puntaje es {points}</h1>
                    {
                        !puntajeSubmit
                            ?
                            <h4 className='text-center text-medallero'>Digita tú nombre para que entres en nuestro medallero</h4>
                            :
                            <></>
                    }
                    <form method="POST" action="" onSubmit={(e) => {
                        e.preventDefault()
                        if (inputRef.current?.value && !puntajeSubmit) {
                            let data = {
                                name: inputRef.current.value,
                                pointsUser: points
                            }
                            submitPointsEvent(data)
                            inputRef.current.value = ""
                            setPuntajeSubmit(true)
                        }
                    }}>
                        {
                            !puntajeSubmit
                                ?
                                <div style={{ display: 'flex' }}>
                                    <input ref={inputRef} type="text" name="nameUser" className="form-control" style={{ maxWidth: "20rem" }} placeholder='Digita tú nombre' minLength={4} maxLength={30} />
                                    <button type="submit" ref={buttonRef} className='btn btn-dark'>Unirme al medallero</button>
                                </div>
                                :
                                <></>
                        }
                    </form>

                    {
                        pointsState
                            ?
                            <div>
                                {
                                    puntajeSubmit
                                        ?
                                        <h2 className='text-sucess text-center'> Ya subiste tú puntaje al medallero</h2>
                                        :
                                        <></>
                                }
                                <h1 className='text-center'>Nuestro Medallero</h1>
                                <table className="table table-bordered mt-3 table-dark" >
                                    <thead >
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Puntos</th>
                                        </tr>
                                    </thead>
                                    {pointsState.map((points, index) => {
                                        return (
                                            <tbody>
                                                {
                                                    index == 0
                                                        ?
                                                        <tr className='table tr-golden' style={{ backgroundColor: "#EBCF51" }}>
                                                            <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <img src={oro} width={"60px"} height={"60px"} alt="" />
                                                                <h1>{points.name}</h1>
                                                            </td>
                                                            <td style={{ height: "50px", width: "100px" }}  >
                                                                <h1 className='text-center'>{points.pointsUser}</h1>
                                                            </td>
                                                        </tr>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    index == 1
                                                        ?
                                                        <tr className='table' style={{ backgroundColor: "#737F87" }}>
                                                            <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <img src={plata} width={"50px"} height={"50px"} alt="" />
                                                                <h2>{points.name}</h2>
                                                            </td>
                                                            <td style={{ height: "45px", width: "100px" }}  >
                                                                <h2 className='text-center'>{points.pointsUser}</h2>
                                                            </td>
                                                        </tr>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    index == 2
                                                        ?
                                                        <tr className='table' style={{ backgroundColor: "#E38A46" }}>
                                                            <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <img src={bronze} width={"40px"} height={"40px"} alt="" />
                                                                <h3>{points.name}</h3>
                                                            </td>
                                                            <td style={{ height: "40px", width: "100px" }}  >
                                                                <h3 className='text-center'>{points.pointsUser}</h3>
                                                            </td>
                                                        </tr>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    index != 0 && index != 1 && index != 2
                                                        ?
                                                        <tr>
                                                            <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <h4>{points.name}</h4>
                                                            </td>
                                                            <td style={{ height: "35px", width: "100px" }}  >
                                                                <h4 className='text-center'>{points.pointsUser}</h4>
                                                            </td>
                                                        </tr>
                                                        :
                                                        <></>
                                                }

                                            </tbody>
                                        )
                                    })}
                                </table>
                            </div>

                            :
                            <></>
                    }
                </div>
            </div >
        </div>
    )
}