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
import '../styles/twitter.css'
import ModalPanelConfiguracion from "../components/house/modalPanelConfiguracion";
import ModalNewReservation from "../components/house/modalNewReservation";
import { setUpReservationsOfAHouse } from '../helper/setUpReservationOfAHouse.js';
import { setUpGasStation } from "../helper/SetUpGasStation";
import { setUpTourist } from "../helper/setUpTourist";
import ModalConfirmationReservation from "../components/house/modalConfirmationReservation";
import { HouseRating } from "../components/house/houseRating";
import { useAuth0 } from "@auth0/auth0-react";
import { Global } from '../helper/Global';
import Comments from '../components/house/comments'


const House = () => {

    const { getAccessTokenSilently } = useAuth0();
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
    const [ comment, setComment ] = useState('');
    const { user, isAuthenticated } = useAuth0();
    const [valueCapacity, setValueCapacity] = useState({value: 1, label: 1});
    const baseUrl = Global.baseUrl
    const URIVivienda = `${baseUrl}viviendas/`+id
    let numCommentsToView = 5
    const [addCommentsToView, setAddCommentsToView] = useState(false)
    const [ comentarios, setComentarios ] = useState([])

    useEffect( () => {

        setUpHouse(id, setHouse, setComentarios);

    }, [id])

    useEffect( () => {
        
        if(house !== undefined && comentarios !== undefined){
            document.title = house.titulo
            async function fetchData() {
                const accessToken = await getAccessTokenSilently();
                setUpReservationsOfAHouse( house._id, setReservations, accessToken );
            }
            fetchData();
            setUpGasStation(house.coordenadas.latitud, house.coordenadas.longitud, 20, setGasStation)
            setUpTourist(house.coordenadas.latitud, house.coordenadas.longitud, setTourist)
            setAddCommentsToView(comentarios < numCommentsToView)
            house.comentarios = []
            for(let i = numCommentsToView - 5; i < numCommentsToView; i++){
                house.comentarios.push(comentarios[i])
            }
        }
    }, [house, getAccessTokenSilently, comentarios])

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

    const handleSubmit = () => {
        let comentario = {
            vivienda: house._id,
            usuario: user.name,
            likes: [],
            dislikes: [],
            mensaje: comment,
            respuestas: []
        };

        house.comentarios = comentarios
        house.comentarios.push(comentario)

        fetch(URIVivienda, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(house)})
            .then( res => res.json())
            .then( data => {
                    console.log(data)
                })
            .catch(err => console.log(err));
    }

    function add5CommentsToView(){
        numCommentsToView = numCommentsToView + 5
        setAddCommentsToView(house.comentarios.length < numCommentsToView)
        for(let i = numCommentsToView - 5; i < numCommentsToView && i < comentarios.length; i++){
            house.comentarios.push(comentarios[i])
        }
    }

    const textURL = "Mirad esta vivienda tan guay que podéis reservar en";
    const URL = `http://localhost:3000/vivienda/${id}`;
    const via = "SwishHouse";
    const hashtags = "reservar,alquilar_viviendas"
    const twitterURL = `https://twitter.com/intent/tweet?text=${textURL}&url=${URL}&via=${via}&hashtags=${hashtags}`;

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
                            <a className="btn btn-primary" id="twitter" target="_blank"  //si no pongo el elemento de esa clase no está centrado con el botón de arriba
                            href={twitterURL} rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter" viewBox="0 1 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                </svg>
                                <i className="bi bi-twitter"> Compartir por Twitter</i>
                            </a>
                            {/* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
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
                        <HouseRating house={id}></HouseRating>
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
                        <br/>
                        <br/>
                        <div>
                            {house.comentarios.length === 0 ?
                                <div>
                                    <h5>No hay comentarios</h5>
                                </div>
                                :
                                <div>
                                    <h5>Comentarios ({comentarios.length})</h5>
                                    {house.comentarios.map( (comentario, index) => {
                                        return <div key={index}><Comments comentario={comentario}/></div>
                                    })}
                                    <button hidden={addCommentsToView} className="btn mt-3" onClick={add5CommentsToView}>Ver más comentarios</button>
                                </div>
                            }
                            
                            {isAuthenticated ?
                                <div>
                                    <form className="mt-4" onSubmit={handleSubmit}>
                                        <label>Añade un comentario</label>
                                        <input  type="text" 
                                                className="form-control mt-1"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}></input>
                                        <button className="btn btn-primary mt-3" type="submit">Comentar</button>
                                    </form>
                                </div>
                                :
                                <div></div>
                            }
                            
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
    )

}

export default House