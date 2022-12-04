import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setUpHouse } from "../helper/SetUpHouse";
import { Carousel, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { setUpReservations } from '../helper/SetUpReservations.js';
import { ReservationCard } from '../components/reservations/reservationCard.jsx';
import L from 'leaflet';
import '../styles/main.css'
import '../styles/house.css'
import '../styles/orientacion.css'
import '../styles/texto.css'
import '../styles/div.css'

const House = () => {

    const { id } = useParams();
    const [ house, setHouse ] = useState();
    const [ showModal, setShowModal ] = useState(false);
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {

        setUpHouse(id, setHouse);

    }, [id])

    useEffect( () => {
        
        if(house !== undefined){
            document.title = house.titulo
            setUpReservations( house.propietario._id, setReservations );
        }

    }, [house])

    const modalClose = () => setShowModal(false);
    const modalShow = () => setShowModal(true);
    
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
                        <div className="padre">
                            <h6 className="inlineBlock me-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill mb-1 mx-2" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                {house.valoracion} 
                                <span className="mx-3">·</span>
                                {house.direccion}
                                <span className="mx-3">·</span>
                                <strong>Precio noche: {house.precioNoche}€</strong>
                            </h6>
                            <button variant="primary" className="btn btn-outline-primary" onClick={modalShow}>Panel de Configuración</button>
                            <Modal
                                show={showModal}
                                onHide={modalClose}
                                backdrop="static"
                                keyboard={false}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Panel de Configuración</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h5 className="mb-4">Lista de Reservas hechas por mis clientes:</h5>
                                    {reservations.map((reservation, index) => (
                                    <ReservationCard key={index}
                                        reservation={ reservation }
                                    />
                                    ))}
                                </Modal.Body>
                                <Modal.Footer>
                                    <button variant="primary" 
                                            className="btn btn-outline-primary" 
                                            onClick={() => {
                                                modalClose();
                                                navigate(`/viviendas/propietario/${house.propietario._id}/vivienda/${house._id}/edit`)
                                            }}>
                                                Editar Vivienda
                                    </button>
                                    <button variant="primary" className="btn btn-outline-primary" onClick={modalClose}>Hacer Reserva</button>
                                    <button variant="primary" className="btn btn-outline-secondary" onClick={modalClose}>Cerrar</button>
                                </Modal.Footer>
                            </Modal>
                        </div>
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
                        <div className="breakSpaces">
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
                    </div>
                </main>
                <Footer/>
            </div>
    )

}

export default House