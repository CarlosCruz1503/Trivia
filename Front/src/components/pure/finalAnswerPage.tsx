import React from 'react'
import { question } from '../../interfaces/interfaces'
import "../../styles/scss/questions/finalPage.scss"
import backgroundImage from "../../resources/5719387.jpg"
type Props = {
    numCorrects: number
    questions: question[]
    secondsForAnswer: number
}

export default function IFinalAnswerPage({ numCorrects, questions, secondsForAnswer }: Props) {
    return (
        <div className="div-final">
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="final">
                <h1>Respuestas Correctas</h1>
                <h1>{numCorrects}/{questions.length}</h1>
                <h1>Tardaste {secondsForAnswer}s en contestar la trivia</h1>
                { numCorrects === 0
                    ?
                    <h1> Tu puntaje es  0 </h1>
                    :
                    <h1> Tu puntaje es {((questions.length * numCorrects) * 100) - (secondsForAnswer * 5)}</h1>
                }
                <h4 className='text-center text-medallero'>Si quieres guardar tu puntaje y estar en nuestro medallero, crea tu usuario o inicia sesión</h4>
            </div>
        </div>

    )
}