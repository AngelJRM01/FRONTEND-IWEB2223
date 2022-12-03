import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setUpHouse } from "../helper/SetUpHouse";
import { Carousel } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import '../styles/main.css'
import '../styles/house.css'
import '../styles/orientacion.css'
import '../styles/texto.css'
import '../styles/div.css'

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
    
    const iconMarker = L.icon({
        iconUrl: require('../static/marker.png'),
        iconSize: [48,48],
        iconAnchor: [32, 64],
    });

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
                        <div className="padre">
                            <Carousel className="croppedpx inlineBlock marginRight100px marginBottom30px">
                                {
                                    house.imagenes.map( (imagen, index ) => {
                                        return  <Carousel.Item key={index}>
                                                    <div className="croppedpx contenedor">
                                                        <img
                                                            className="card-img-top rounded-2 hijo"
                                                            src={imagen}
                                                            alt="Imagen de la casa"/>
                                                    </div>
                                                </Carousel.Item>
                                    } )
                                }
                            </Carousel>
                            <MapContainer center={[house.coordenadas.latitud, house.coordenadas.longitud]} zoom={13} className="croppedpx inlineBlock" >
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[house.coordenadas.latitud, house.coordenadas.longitud]} icon={ iconMarker } >
                                    <Popup>
                                        <span>{house.titulo}</span>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                        <br/>
                        <br/>
                        <div className="padre">
                            <div className="inlineBlock breakSpaces">
                                <h3>Anfitrión: {house.propietario.nombre}</h3>
                                <br/>
                                <br/>
                                <br/>
                                <h4>Descripción</h4>
                                <br/>
                                <h6 className="breakSpaces">
                                    {house.descripcion}
                                </h6>                        
                            </div>
                            <div className="inlineBlock bordeNegro mx-5">
                                <h5 className="mx-5 mt-5 mb-2">Precio noche: <strong>{house.precioNoche}€</strong></h5>
                                <button className="mx-5 mt-4 mb-3 btn btn-outline-primary">
                                    Hacer reserva
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
    )

}

export default House