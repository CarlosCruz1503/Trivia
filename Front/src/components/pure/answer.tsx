import React, { useEffect, useState } from 'react'
import { TAnswer } from '../../interfaces/interfaces'

type Props = {
    answers: TAnswer[],
    siguiente: Function
    timeStop: Function
}



export default function IanswerComponent({ answers, siguiente, timeStop }: Props): JSX.Element {

    const [answersSelect, setAnswersSelect] = useState<Boolean>(true)

    const select = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, answer: TAnswer): void => {

        timeStop()
        let element = e.target as Element
        if ( answersSelect ){
            if (answer.correct) {
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
        setAnswersSelect(false)
    }
    return (
        <div className="row" >
            {
                    answers.map((answer => {
                        return (
                            <div className="col-12 col-md-6 col-questions" >
                                <button className="respuesta" onClick={(e) => {
                                    select(e, answer)
                                }}>
                                    {answer.answerTitle}
                                </button>
                            </div>
                        )
                    }))
            }
        </div>
    )

}

