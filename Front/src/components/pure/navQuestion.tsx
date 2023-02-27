import React, { useState, useEffect } from 'react'
import "../../styles/scss/questions/navQuestions.scss"
import { TQuestions } from '../../interfaces/interfaces'

type Props = {
    secondsState:number
    nQuestions:number
    questions:TQuestions[]
}

export default function NavQuestion({ secondsState, nQuestions,questions }: Props) {

    return (
        <div className='div-navquestions'>
            <div className="navquestions">
                <h2>{`${secondsState}`}</h2>
                <h2>{nQuestions}/{questions.length}</h2>
            </div>
        </div>
    )
}