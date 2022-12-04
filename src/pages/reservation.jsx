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

                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://a0.muscache.com/im/pictures/43a44c04-8eb5-4cd3-a930-397d7276d03c.jpg" className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src="..." className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src="..." className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://a0.muscache.com/im/pictures/43a44c04-8eb5-4cd3-a930-397d7276d03c.jpg" className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src="..." className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src="..." className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
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