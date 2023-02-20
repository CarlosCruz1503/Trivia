import React from 'react'
import "../../styles/scss/home/home.scss"
import backgroundImage from "../../resources/5719387.jpg"

interface Props { }

export default function Home({ }: Props): JSX.Element {
    return (
        <div className='div-home'>
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="home">
                <h1 className='title-home'>LeTriviarn !!</h1> 
                <h2 className=''> Nuestras trivias más populares</h2>
                <div className="five-more-popular-trivias">
                    <button
                        className="btn btn-more-popular ">
                        <h3>Mundial 2022</h3>
                        <img src="https://exitocol.vtexassets.com/arquivos/ids/14210660/album-pasta-dura-panini-mundial-qatar-2022.jpg?v=637957634588070000" alt="" />
                    </button>
                    <button
                        className="btn btn-more-popular ">
                        <h3>Mundo Animal</h3>
                        <img src="https://i.pinimg.com/originals/34/d9/b5/34d9b55e8faff54c1c7a6238d40340fe.jpg" alt="" />
                    </button>
                    <button
                        className="btn btn-more-popular ">
                        <h3>Paises</h3>
                        <img src="https://m.media-amazon.com/images/I/81XzbgokD1L.jpg" alt="" />
                    </button>
                    <button
                        className="btn btn-more-popular ">
                        <h3>Deportes</h3>
                        <img src="https://w7.pngwing.com/pngs/235/824/png-transparent-drawing-others-sport-logo-sports-equipment.png" alt="" />
                    </button>
                    <button
                        className="btn btn-more-popular ">
                        <h3>Colombia</h3>
                        <img src="https://www.kindpng.com/picc/m/197-1979135_colombia-png-colombia-logo-transparent-png.png" alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}