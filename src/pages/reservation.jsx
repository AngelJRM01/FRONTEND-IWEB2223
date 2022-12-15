import '../styles/reservation.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from "react-bootstrap";

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import ModalRemoveReservation from "../components/reservation/modalRemoveReservation";
import ModalReservationRemoved from "../components/reservation/modalReservationRemoved";
import ReservationMap from "../components/reservation/reservationMap";
import CarouselItem from "../components/reservation/carouselItem";

import styles from '../styles/reservation.module.css';
import { setUpReservation } from "../helper/SetUpReservation";
import { print } from "../helper/Print";

const Reservation = () => {

    const { id } = useParams();
    const [ reservation, setReservation ] = useState();
    const [ position, setPosition ] = useState();
    const [ showModal, setShowModal ] = useState(false);
    const [ showModal2, setShowModal2 ] = useState(false);

    useEffect( () => { setUpReservation(id, setReservation); }, [id]);
    
    useEffect( () => { 
        document.title = "Información general de tu viaje - SwishHouses"; 
        if (reservation != null) {
            setPosition([reservation.vivienda.coordenadas.latitud, reservation.vivienda.coordenadas.longitud]);
        }
    }, [reservation]);

    const modalShow = () => setShowModal(true);
    const modalShow2 = () => setShowModal2(true);

    const RemoveButton = () => {
        return(
            <div className={"list-group " + styles.bottonss}>
                <button type="button" className={"list-group-item list-group-item-action " + styles.house} onClick={modalShow}>
                    <i className="fa-solid fa-ban"></i>
                    &emsp;Retirar solicitud
                    <i className={"fa-sharp fa-solid fa-chevron-right " + styles.arrow}></i>
                </button>
                <ModalRemoveReservation id={reservation._id} idVivienda={reservation.vivienda._id} fechaInicio={reservation.estancia.fechaInicio} 
                                        setShowModal={setShowModal} showModal={showModal} modalShow2={modalShow2}/>
                <ModalReservationRemoved setShowModal={setShowModal2} showModal={showModal2}/>
            </div>
        );
    };

    const ReservationDetails = () => {
        return(
            <div className={'row filaReserva ' + styles.row}>

                <div className={"col colaReserva " + styles.data} id='printablediv'>

                    <style>
                        {`@media print {
                            * { overflow: visible !important; } 
                        }`}
                    </style>

                    <div className={styles.firstContainer}>

                        <div className='carrusel'>
                            <Carousel>
                                { 
                                    reservation.vivienda.imagenes.map((link, index) => {
                                        return CarouselItem(link, index);
                                    })
                                }
                            </Carousel>
                        </div>

                        <div className={styles.flexito1}>
                            <div className={styles.fl}>
                                <p className={styles.title}>Llegada:</p>
                                <p className={styles.date}>&ensp;{new Intl.DateTimeFormat('es-ES', {weekday: 'short', month: 'short', day: 'numeric'}).format(Date.parse(reservation.estancia.fechaInicio))}</p>
                                <p className={styles.time}>&ensp;{new Intl.DateTimeFormat('es-ES', {hour: 'numeric', minute: 'numeric'}).format(Date.parse(reservation.estancia.fechaInicio))}</p>
                            </div>
                            <div className={styles.salida + ' ' + styles.fl}>
                                <p className={styles.title}>Salida:</p>
                                <p className={styles.date}>&emsp;{new Intl.DateTimeFormat('es-ES', {weekday: 'short', month: 'short', day: 'numeric'}).format(Date.parse(reservation.estancia.fechaFinal))}</p>
                                <p className={styles.time}>&emsp;{new Intl.DateTimeFormat('es-ES', {hour: 'numeric', minute: 'numeric'}).format(Date.parse(reservation.estancia.fechaFinal))}</p>
                            </div>
                        </div>

                        <div className={"list-group " + styles.bottonss}>
                            <a href={"http://localhost:3000/vivienda/" + reservation.vivienda._id} className={"list-group-item list-group-item-action " + styles.house}>
                                <i className="fa-solid fa-pager">
                                </i>&emsp;Mostrar anuncio
                                <i className={"fa-sharp fa-solid fa-chevron-right " + styles.arrow}></i>
                            </a>
                        </div>
                    </div>

                    <div className={styles.secondContainer}>
                        <div className={styles.secondContainer2}>
                            <div className={styles.auxDiv}></div>
                            <div className={styles.secondTable}>
                                <div className={styles.divTitle}>
                                    <p className={styles.detallesReserva}>Detalles de la reserva</p>
                                </div>
                                <div>
                                    <p className={styles.boldFont + ' ' + styles.noMarginP}>&emsp;¿Cuántos vienen?</p>
                                    <p>&emsp;{reservation.ocupantes} viajeros</p>
                                </div>
                            </div>
                            <div className={styles.auxDiv}></div>
                        </div>

                        { Date.parse(reservation.estancia.fechaInicio) >= Date.now() ? <RemoveButton/> : null }

                        <div className={"list-group " + styles.bottonss}>
                            <button type="button" className={"list-group-item list-group-item-action " + styles.house} onClick={print}>
                                <i className="fa-solid fa-print"></i>
                                &emsp;Imprimir información
                                <i className={"fa-sharp fa-solid fa-chevron-right " + styles.arrow}></i>
                            </button>
                        </div>
                    </div>

                    <div className={styles.secondContainer}>
                        <div className={styles.secondContainer2}>
                            <div className={styles.auxDiv}></div>
                            <div className={styles.secondTable}>
                                <div className={styles.divTitle}>
                                    <p className={styles.detallesReserva}>Cómo llegar</p>
                                </div>
                                <div className={styles.mapColumn + " mapsColumn"}>
                                    <ReservationMap position={position}/>
                                </div>
                                <div>
                                    <p className={styles.boldFont + ' ' + styles.noMarginP}>&emsp;Dirección</p>
                                    <p>&emsp;{reservation.vivienda.direccion}</p>
                                </div>
                            </div>
                            <div className={styles.auxDiv}></div>
                        </div>
                    </div>

                    <div className={styles.secondContainer}>
                        <div className={styles.secondContainer2}>
                            <div className={styles.auxDiv}></div>
                            <div className={styles.secondTable}>
                                <div className={styles.divTitle}>
                                    <div className={styles.anfitrion}>
                                        <p className={styles.detallesReserva}>Anfitrión: {reservation.vivienda.propietario.nombre}</p>
                                        <img src={reservation.vivienda.propietario.foto} alt="Avatar" className={styles.avatar}></img>
                                    </div>
                                </div>
                                <div>
                                    <p className={styles.boldFont + ' ' + styles.noMarginP}>&emsp;Acerca de tu anfitrión</p>
                                    <p className={styles.paragraph}>{reservation.vivienda.propietario.descripcion}</p>
                                </div>
                            </div>
                            <div className={styles.auxDiv}></div>
                        </div>
                    </div>

                    <div className={styles.secondContainer + " pagoContainer"}>
                        <div className={styles.secondContainer2}>
                            <div className={styles.auxDiv}></div>
                            <div className={styles.secondTable}>
                                <div className={styles.divTitle}>
                                    <p className={styles.detallesReserva}>Información del pago</p>
                                </div>
                                <div>
                                    <p className={styles.boldFont + ' ' + styles.noMarginP}>&emsp;Detalles del pago</p>
                                    <p>&emsp;Coste total: {reservation.precio} € EUR</p>
                                </div>
                            </div>
                            <div className={styles.auxDiv}></div>
                        </div>
                    </div>



                </div>

                <div className={"col mapitaCont " + styles.mapContainer}>
                    <ReservationMap position={position}/>
                </div>

            </div>
        );
    };

    return(
        
        <div className={styles.reservationComponent + " mapita"}>
            <Header/>
            <main className={styles.main}>
                <div className={"container-fluid " + styles.containerFluid}>
                    { reservation == null ? "Reservation not found." : <ReservationDetails/> }
                </div>
            </main>
            <Footer/>
        </div>

    );

};

export default Reservation;