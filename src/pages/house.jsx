import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setUpHouse } from "../helper/SetUpHouse";
import { Carousel } from "react-bootstrap";
import '../styles/main.css'
import '../styles/image.css'
import '../styles/centrar.css'

const House = () => {

    const { id } = useParams();
    const [ house, setHouse ] = useState();

    useEffect( () => {

        setUpHouse(id, setHouse);

    }, [id])

    useEffect( () => {
        
        if(house !== undefined){
            document.title = house.titulo
        }

    }, [house])

    return(
        house === undefined
            ? <div></div>
            : <div>
                <Header/>
                <main className="row justify-content-center main">
                    <div className="col-lg-8">
                        <h1>{house.titulo}</h1>
                        <h6>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill mb-1 mx-2" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            {house.valoracion} 
                            <span className="mx-3">·</span>
                            {house.direccion}
                        </h6>
                        <br/>
                        <Carousel className="cropped500px">
                            {
                                house.imagenes.map( (imagen, index ) => {
                                    return  <Carousel.Item key={index}>
                                                <div className="cropped500px contenedor">
                                                    <img
                                                        className="card-img-top rounded-2 hijo"
                                                        src={imagen}
                                                        alt="Imagen de la casa"/>
                                                </div>
                                            </Carousel.Item>
                                } )
                            }
                        </Carousel>
                        <br/>
                        <br/>
                        <h4>Anfitrión: {house.propietario.nombre}</h4>
                    </div>
                </main>
                <Footer/>
            </div>
    )

}

export default House