import React from 'react'
import backgroundImage from "../../resources/5719387.jpg"
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function Ierror({ }: Props) {

  const navigate = useNavigate()

  return (
    <div className='div-home'>
      <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="home">
        <h1>La pagina o el quiz que buscas no existe</h1>
        <button className='btn btn-primary' onClick={() => {
          navigate("../../")
        }}>Volver a la pagina de Home</button>
      </div>
    </div>

  )
}