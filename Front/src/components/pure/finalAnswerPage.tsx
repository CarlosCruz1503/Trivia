import React,{useRef} from 'react'
import { TQuestions } from '../../interfaces/interfaces'

import "../../styles/scss/questions/finalPage.scss"
import backgroundImage from "../../resources/5719387.jpg"
import { instance } from '../../utils/axiosConfig'

type Props = {
    numCorrects: number
    questions: TQuestions[]
    secondsForAnswer: number,
    quizId:String,
}

export default function IFinalAnswerPage({ numCorrects, questions, secondsForAnswer,quizId }: Props) {

    const input = useRef()

    return (
        <div className="div-final">
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="final">
                <h1>Respuestas Correctas</h1>
                <h1>{numCorrects}/{questions.length}</h1>
                <h1 className='text-center m-1'>Tardaste {secondsForAnswer}s en contestar la trivia</h1>
                {numCorrects === 0
                    ?
                    <h1> Tu puntaje es  0 </h1>
                    :
                    <h1> Tu puntaje es {((questions.length * numCorrects) * 100) - (secondsForAnswer * 5)}</h1>
                }
                <h4 className='text-center text-medallero'>Digita tú nombre para que entres en nuestro medallero</h4>
                <form action="" onSubmit={(e) => {
                    e.preventDefault()
                    if (input.current?.value){
                        let data= {
                            name: input.current.value
                        }
                    }
                    instance.post(`/api/quiz/points/${quizId}`, )
                }}>
                    <div style={{display:'flex'}}>
                        <input ref={input} type="text" name="nameUser" className="form-control" style={{ maxWidth: "20rem" }} placeholder='Digita tú nombre' minLength={4} maxLength={30} />
                        <button type="submit" className='btn btn-dark'>Unirme al medallero</button>
                    </div>
                </form>
            </div>
        </div>

    )
}