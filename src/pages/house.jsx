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
import ModalPanelConfiguracion from "../components/house/modalPanelConfiguracion";
import ModalNewReservation from "../components/house/modalNewReservation";
import { setUpReservationsOfAHouse } from '../helper/setUpReservationOfAHouse.js';
import { setUpGasStation } from "../helper/SetUpGasStation";
import { setUpTourist } from "../helper/setUpTourist";
import ModalConfirmationReservation from "../components/house/modalConfirmationReservation";

const House = () => {

    const { id } = useParams();
    const [ house, setHouse ] = useState();
    const [ showModal, setShowModal ] = useState(false);
    const [ showNewReservationModal, setShowNewReservationModal ] = useState(false);
    const [ confirmationReservationModal, setConfirmationReservationModal ] = useState(false);
    const [ reservations, setReservations ] = useState([]);
    const [ gasStation, setGasStation ] = useState([]);
    const [ tourist, setTourist ] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [valueCapacity, setValueCapacity] = useState({value: 1, label: 1});

    useEffect( () => {

        setUpHouse(id, setHouse);

    }, [id])

    useEffect( () => {
        
        if(house !== undefined){
            document.title = house.titulo
            setUpReservationsOfAHouse( house._id, setReservations );
            setUpGasStation(house.coordenadas.latitud, house.coordenadas.longitud, 20, setGasStation)
            setUpTourist(house.coordenadas.latitud, house.coordenadas.longitud, setTourist)
        }

    }, [house])

    const iconMarker = L.icon({
        iconUrl: require('../static/marker.png'),
        iconSize: [48,48],
        iconAnchor: [32, 64],
    });

    const modalShow = () => setShowModal(true);

    const modalShowNewReservation = () => setShowNewReservationModal(true);

    const modalConfirmationReservationModal = () => setConfirmationReservationModal(true);

    const marcadoresGasolineras = gasStation.map((gas, index) => {
        const latitudGas = Number(gas["Latitud"].replace(',', '.'));
        const longitudGas = Number(gas["Longitud"].replace(',', '.'));
        return <Marker position={[latitudGas, longitudGas]} key={index} icon={ iconMarker } >
                    <Popup>
                        <span>{gas["Dirección"]}</span>
                    </Popup>
                </Marker>
    })

    const conversionMes = (mes) => {
        switch(mes){
            case 'M01' : return "enero"
            case 'M02' : return "febrero"
            case 'M03' : return "marzo"
            case 'M04' : return "abril"
            case 'M05' : return "mayo"
            case 'M06' : return "junio"
            case 'M07' : return "julio"
            case 'M08' : return "agosto"
            case 'M09' : return "septiembre"
            case 'M10' : return "octubre"
            case 'M11' : return "noviembre"
            case 'M12' : return "diciembre"
            default : return "mes no válido"
        }
    }

    return(
        house === undefined
            ? <div></div>
            : <div>
                <Header/>
                <main className="row justify-content-center main">
                    <div className="col-lg-8">
                        <h1>{house.titulo}</h1>
                        <div className="padreInlineBlock">
                            <h6 className="hijoInlineBlock me-5">
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
                            <ModalPanelConfiguracion
                                house = {house}
                                setShowModal = {setShowModal}
                                showModal = {showModal}
                                reservations = {reservations}
                                modalShowNewReservation = {modalShowNewReservation}
                                setConfirmationReservationModal = {setConfirmationReservationModal}
                            />
                            <ModalNewReservation
                                house = {house}
                                setShowNewReservationModal = {setShowNewReservationModal}
                                showNewReservationModal = {showNewReservationModal}
                                modalConfirmationReservationModal = {modalConfirmationReservationModal}
                                startDate = {startDate}
                                setStartDate = {setStartDate}
                                endDate = {endDate}
                                setEndDate = {setEndDate}
                                valueCapacity = {valueCapacity}
                                setValueCapacity = {setValueCapacity}
                            />
                            <ModalConfirmationReservation
                                house = {house}
                                setConfirmationReservationModal = {setConfirmationReservationModal}
                                confirmationReservationModal = {confirmationReservationModal}
                                startDate = {startDate}
                                endDate = {endDate}
                                valueCapacity = {valueCapacity}
                                setStartDate = {setStartDate}
                                setEndDate = {setEndDate}
                                setValueCapacity = {setValueCapacity}
                                setHouse = {setHouse}
                            />
                        </div>
                        <br/>
                        <div className="padreInlineBlock">
                            <Carousel className="croppedpx hijoInlineBlock marginRight100px marginBottom30px">
                                {
                                    house.imagenes.map( (imagen, index ) => {
                                        return  <Carousel.Item key={index}>
                                                    <div className="croppedpx padreCentrar">
                                                        <img
                                                            className="card-img-top rounded-2 hijoCentrar"
                                                            src={imagen}
                                                            alt="Imagen de la casa"/>
                                                    </div>
                                                </Carousel.Item>
                                    } )
                                }
                            </Carousel>
                            <MapContainer center={[house.coordenadas.latitud, house.coordenadas.longitud]} zoom={13} className="croppedpx hijoInlineBlock" >
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
                        <br/>
                        <br/>
                        <h4>Mapa de las 20 gasolineras más cercanas</h4>
                        <br/>
                        <MapContainer center={[house.coordenadas.latitud, house.coordenadas.longitud]} zoom={13} >
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {marcadoresGasolineras}
                        </MapContainer>
                        <br/>
                        <div className="breakSpaces">
                            {gasStation.map((gas, index) => {
                                return (
                                    <p key={index}>
                                        · La gasolinera con la dirección <strong className="breakSpaces">{gas["Dirección"]}</strong> tiene de precio la Gasolina 95 E5 a <strong className="breakSpaces">{gas["Precio Gasolina 95 E5"]}€</strong> y está a <strong className="breakSpaces">{gas["Distancia"]} km</strong>
                                    </p>
                                )
                            })}
                        </div>
                        {tourist.length === 0 ?
                            <div>
                                <br/>
                                <br/>
                                <h5>Con respecto a los turistas, no hemos podido obtener datos :(</h5>
                            </div> 
                            :   
                            <div>
                                <br/>
                                <br/>
                                <h5>Con respecto a los turistas, estos son los datos obtenidos: </h5>
                                <br/>
                                <p>El mes de <strong className="breakSpaces">{conversionMes(tourist["0"].month)}</strong> ha sido en el que más turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["0"].value}</strong> turistas.</p>
                                <p>El mes de <strong className="breakSpaces">{conversionMes(tourist["1"].month)}</strong> ha sido el segundo mes en el que más turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["1"].value}</strong> turistas.</p>
                                <p>El mes de <strong className="breakSpaces">{conversionMes(tourist["2"].month)}</strong> ha sido en el que menos turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["2"].value}</strong> turistas.</p>
                                <p>El mes de <strong className="breakSpaces">{conversionMes(tourist["3"].month)}</strong> ha sido el segundo mes en el que menos turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["3"].value}</strong> turistas.</p>
                            </div>}
                    </div>
                </main>
                <Footer/>
            </div>
    )

}

export default House