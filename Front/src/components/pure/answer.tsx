import React, { useEffect } from 'react'
import { answer } from '../../interfaces/interfaces'

type Props = {
    answer: answer,
    siguiente: Function
    timeStop:Function
}

export default function IanswerComponent({ answer, siguiente,timeStop }: Props): JSX.Element {

    const select = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        timeStop()
        console.log(e.target)
        let element = e.target as Element
        if (answer.correct){
            element.classList.add("correct")
        } else {
            element.classList.add("incorrect")
        }
        setTimeout(() => {
            element.classList.remove("correct")
            element.classList.remove("incorrect")
            siguiente(answer.correct)
        }, 3000)
    }

    return (
        <div className="col-12 col-md-6 col-questions" >
            <button className="respuesta" onClick={select}>
                {answer.answerText}
            </button>
        </div>
    )
}