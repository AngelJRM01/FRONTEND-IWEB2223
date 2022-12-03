import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'

import { Header } from "../components/header";
import { Footer } from "../components/footer";

import '../styles/reservation.css';
import { setUpReservation } from "../helper/SetUpReservation";

const Reservation = () => {

    const { id } = useParams();
    const [ reservation, setReservation ] = useState();

    useEffect( () => { setUpReservation(id, setReservation); }, [id]);
    useEffect( () => { document.title = "Información general de tu viaje - SwishHouses"; }, [reservation]);

    const ReservationDetails = () => {
        return(
            <div className="row">

                <div className="col data">

                    <div className='firstContainer'>

                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://top-mmo.fr/wp-content/uploads/2022/11/l-intro-1667494654.jpg" className="d-block w-100" alt="..."/>
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

                        <div className='flexito1'>
                            <div className='fl'>
                                <p className='title'>Llegada:</p>
                                <p className='date'>&ensp;mié, 11 ene.</p>
                                <p className='time'>&ensp;14:00</p>
                            </div>
                            <div className='fl salida'>
                                <p className='title'>Salida:</p>
                                <p className='date'>&emsp;jue, 12 ene.</p>
                                <p className='time'>&emsp;11:00</p>
                            </div>
                        </div>

                        <div className="list-group bottonss">
                            <a href="http://localhost:3000/vivienda/6371a2d0cbdef810a6e09c83" className="list-group-item list-group-item-action house">
                                <i class="fa-solid fa-pager">
                                </i>&emsp;Mostrar anuncio
                                <i class="fa-sharp fa-solid fa-chevron-right arrow"></i>
                            </a>
                        </div>
                    </div>

                    <div className='secondContainer'>
                        <div className='auxDiv'></div>
                        <table className="table">
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='auxDiv'></div>
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

                <div className="col">
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
        
        <div className='reservation-component'>
            <Header/>
            <main className="main">
                <div className="container-fluid">
                    { reservation == null ? "Reservation not found." : <ReservationDetails/> }
                </div>
            </main>
            <Footer/>
        </div>

    );

};

export default Reservation;