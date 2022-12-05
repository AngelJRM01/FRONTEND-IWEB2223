import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'
import { Carousel } from "react-bootstrap";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

import styles from '../styles/reservation.module.css';
import { setUpReservation } from "../helper/SetUpReservation";

const Reservation = () => {

    const { id } = useParams();
    const [ reservation, setReservation ] = useState();

    useEffect( () => { setUpReservation(id, setReservation); }, [id]);
    useEffect( () => { document.title = "Información general de tu viaje - SwishHouses"; }, [reservation]);

    const Print = () => {     
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    const ReservationDetails = () => {
        return(
            <div className={'row ' + styles.row}>

                <div className={"col " + styles.data} id='printablediv'>

                    <style>
                        {`@media print {
                            * { overflow: visible !important; } 
                        }`}
                    </style>

                    <div className={styles.firstContainer}>

                        <div className='carrusel'>
                            <Carousel>
                                <Carousel.Item>
                                    <div>
                                        <img
                                            className={styles.imgSize}
                                            src='https://www.cultture.com/pics/2021/05/hunter-x-hunter-10-cosas-que-solo-los-fans-del-manga-saben-de-gon.jpg'
                                            alt="Imagen 1"/>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div>
                                        <img
                                            className={styles.imgSize}
                                            src='https://top-mmo.fr/wp-content/uploads/2022/11/l-intro-1667494654.jpg'
                                            alt="Imagen 2"/>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>

                        <div className={styles.flexito1}>
                            <div className={styles.fl}>
                                <p className={styles.title}>Llegada:</p>
                                <p className={styles.date}>&ensp;mié, 11 ene.</p>
                                <p className={styles.time}>&ensp;14:00</p>
                            </div>
                            <div className={styles.salida + ' ' + styles.fl}>
                                <p className={styles.title}>Salida:</p>
                                <p className={styles.date}>&emsp;jue, 12 ene.</p>
                                <p className={styles.time}>&emsp;11:00</p>
                            </div>
                        </div>

                        <div className={"list-group " + styles.bottonss}>
                            <a href="http://localhost:3000/vivienda/6371a2d0cbdef810a6e09c83" className={"list-group-item list-group-item-action " + styles.house}>
                                <i class="fa-solid fa-pager">
                                </i>&emsp;Mostrar anuncio
                                <i class={"fa-sharp fa-solid fa-chevron-right " + styles.arrow}></i>
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
                                    <p>&emsp;8 viajeros</p>
                                </div>
                            </div>
                            <div className={styles.auxDiv}></div>
                        </div>

                        <div className={"list-group " + styles.bottonss}>
                            <a href={"http://localhost:3000/reservas/" + reservation._id} className={"list-group-item list-group-item-action " + styles.house}>
                                <i class="fa-solid fa-ban"></i>
                                &emsp;Retirar solicitud
                                <i class={"fa-sharp fa-solid fa-chevron-right " + styles.arrow}></i>
                            </a>
                        </div>
                        <div className={"list-group " + styles.bottonss}>
                            <button type="button" className={"list-group-item list-group-item-action " + styles.house} onClick={Print}>
                                <i class="fa-solid fa-print"></i>
                                &emsp;Imprimir información
                                <i class={"fa-sharp fa-solid fa-chevron-right " + styles.arrow}></i>
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
                                <div>
                                    <p className={styles.boldFont + ' ' + styles.noMarginP}>&emsp;Dirección</p>
                                    <p>&emsp;Calle Benitez Rosa de María, 52</p>
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
                                        <p className={styles.detallesReserva}>Anfitrión: Pepito</p>
                                        <a href={"http://localhost:3000/reservas/" + reservation._id}>
                                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class={styles.avatar}></img>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <p className={styles.boldFont + ' ' + styles.noMarginP}>&emsp;Acerca de tu anfitrión</p>
                                    <p className={styles.paragraph}>
                                        ewf f ewf wefwef we fwe  fwe  f ew f e f we f  ewfewfw ewfwef we fewfefew efwef vg fbg trhr dsfwsfwef wegerg eer
                                         ewgfweg wegwegwegew wefgwe gwerg wegwerg w grgergergrfeger gfregerg ergerger g ergerg erg.
                                    </p>
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
                                    <p className={styles.detallesReserva}>Información del pago</p>
                                </div>
                                <div>
                                    <p className={styles.boldFont + ' ' + styles.noMarginP}>&emsp;Detalles del pago</p>
                                    <p>&emsp;Coste total: 29,27 € EUR</p>
                                </div>
                            </div>
                            <div className={styles.auxDiv}></div>
                        </div>
                    </div>



                </div>

                <div className={"col " + styles.mapContainer}>
                    <MapContainer center={[40.41831, -3.70275]} zoom={13} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                    </MapContainer>
                </div>

            </div>
        );
    };

    return(
        
        <div className={styles.reservationCcomponent}>
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