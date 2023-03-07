import React, { useState, useEffect } from 'react'
import { TQuiz } from '../../interfaces/interfaces'
import { getQuizes } from '../../hooks/getCollections'
import { useNavigate } from 'react-router-dom'
import backgroundImage from "../../resources/5719387.jpg"

type Props = {}

type appState = {
    quizes: TQuiz[]
}

export default function IallQuizes({ }: Props) {

    const [quizes, setQuizes] = useState<appState["quizes"]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getQuizes()
            .then(res => {
                setQuizes(res.data)
            })
    }, [])

    return (
        <div className='div-home'>
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="home">
                <h1 className='title-home'>LeTriviarn !!</h1>
                <h2 className=''> Estas son todas nuestras trivias</h2>
                <h2>Estan ordenadas por popularidad</h2>
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
            </div>
        </div>
    )
}