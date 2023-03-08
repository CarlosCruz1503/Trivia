import React, { useState, useEffect, useRef } from 'react'
import "../../styles/scss/home/home.scss"
import backgroundImage from "../../resources/5719387.jpg"
import { getQuizes } from '../../hooks/getCollections'
import { TQuiz } from '../../interfaces/interfaces'
import { useNavigate } from 'react-router-dom'

type appState = {
    quizes: TQuiz[]
}

export default function Home(): JSX.Element {

    const [quizes, setQuizes] = useState<appState["quizes"]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getQuizes()
            .then(res => {
                let quizesTemp:TQuiz[] = [] 
                res.data.map((quiz:any,index:any)=> {
                    if (index < 5){
                        quizesTemp.push(quiz)
                    }
                }) 
                setQuizes(quizesTemp)
            })
    }, [])

    const idTrivia = React.useRef<HTMLInputElement>(null);




    return (
        <div className='div-home'>
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="home">
                <h1 className='title-home'>QuizHook !!</h1>
                <h2 className='text-center'> Juega Nuestros Quizs Mas populares</h2>
                <div className="five-more-popular-trivias">
                    {
                        quizes
                            ?
                            quizes.map(quiz => {
                                return (
                                    <button onClick={() => {
                                        navigate(`../preguntas/${quiz._id}`)
                                    }}
                                        className="btn btn-more-popular ">
                                        <h3>{quiz.name}</h3>
                                        <img src={quiz.image.url} alt="" />
                                    </button>
                                )
                            })
                            :
                            <></>
                    }
                </div>
                <button className='btn btn-dark' onClick={()=>{
                    navigate("../quizes")
                }}>
                    Ver todos los Quizes
                </button>
                <div className="create-code">
                    <h2 className='text-center'> Crea tu propia trivia y desafia a tus amigos</h2>
                    <button className="btn btn-primary " onClick={() => {
                        navigate(`../crearQuiz`)
                    }}>
                        <h3>Crear Mi Propio Quiz</h3>
                    </button>
                    <h2 className='text-center mt-3'> Unete a un Quiz</h2>
                    <button className="btn btn-dark btn-join">
                        <input type="text" placeholder='Ingresa el id de la Quiz' name="id" ref={idTrivia} className='form-control'/>
                        <h2 className="btn btn-light" onClick={() => {
                            navigate(`../preguntas/${idTrivia.current?.value}`)
                        }}>Unirme</h2>
                    </button>
                </div>
            </div>
        </div>
    )
}