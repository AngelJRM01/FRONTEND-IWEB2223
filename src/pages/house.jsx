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
    const [house, setHouse] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showNewReservationModal, setShowNewReservationModal] = useState(false);
    const [confirmationReservationModal, setConfirmationReservationModal] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [gasStation, setGasStation] = useState([]);
    const [tourist, setTourist] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [comment, setComment] = useState('');
    const { user, isAuthenticated } = useAuth0();
    const [valueCapacity, setValueCapacity] = useState({ value: 1, label: 1 });
    const baseUrl = Global.baseUrl
    const URIVivienda = `${baseUrl}viviendas/` + id
    let numCommentsToView = 10
    const [allCommentsToView, setAllCommentsToView] = useState(false)
    const [comentarios, setComentarios] = useState([])

    useEffect(() => {

        setUpHouse(id, setHouse, setComentarios);

    }, [id])

    useEffect(() => {

        if (house !== undefined && comentarios !== undefined) {
            document.title = house.titulo
            async function fetchData() {
                const accessToken = await getAccessTokenSilently();
                setUpReservationsOfAHouse(house._id, setReservations, accessToken);
            }
            fetchData();
            setUpGasStation(house.coordenadas.latitud, house.coordenadas.longitud, 20, setGasStation)
            setUpTourist(house.coordenadas.latitud, house.coordenadas.longitud, setTourist)
            if (comentarios.length > 0) {
                setAllCommentsToView(comentarios.length < numCommentsToView)
                house.comentarios = []
                for (let i = numCommentsToView - 10; i < numCommentsToView && i < comentarios.length; i++) {
                    house.comentarios.push(comentarios[i])
                }
            }
        }
    }, [house, getAccessTokenSilently, comentarios])

    const iconMarker = L.icon({
        iconUrl: require('../static/marker.png'),
        iconSize: [48, 48],
        iconAnchor: [24, 48],
    });

    const modalShow = () => setShowModal(true);

    const modalShowNewReservation = () => setShowNewReservationModal(true);

    const modalConfirmationReservationModal = () => setConfirmationReservationModal(true);

    const marcadoresGasolineras = gasStation.map((gas, index) => {
        const latitudGas = Number(gas["Latitud"].replace(',', '.'));
        const longitudGas = Number(gas["Longitud"].replace(',', '.'));
        return <Marker position={[latitudGas, longitudGas]} key={index} icon={iconMarker} >
            <Popup>
                <span>{gas["Dirección"]}</span>
            </Popup>
        </Marker>
    })

    const conversionMes = (mes) => {
        switch (mes) {
            case 'M01': return "enero"
            case 'M02': return "febrero"
            case 'M03': return "marzo"
            case 'M04': return "abril"
            case 'M05': return "mayo"
            case 'M06': return "junio"
            case 'M07': return "julio"
            case 'M08': return "agosto"
            case 'M09': return "septiembre"
            case 'M10': return "octubre"
            case 'M11': return "noviembre"
            case 'M12': return "diciembre"
            default: return "mes no válido"
        }
    }

    const handleSubmit = async () => {
        let comentario = {
            vivienda: house._id,
            usuario: user.name,
            imagenUsuario: user.picture,
            likes: [],
            dislikes: [],
            mensaje: comment,
            respuestas: []
        };

        house.comentarios = comentarios
        house.comentarios.push(comentario)

        const accessToken = await getAccessTokenSilently();
        await fetch(URIVivienda, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(house)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err));

        console.log("Hola")
    }

    function addAllCommentsToView() {
        setAllCommentsToView(true)
        house.comentarios = comentarios
    }

    const textURL = "Mirad esta vivienda tan guay que podéis reservar en";
    const URL = `http://localhost:3000/vivienda/${id}`;
    const via = "SwishHouse";
    const hashtags = "reservar,alquilar_viviendas"
    const twitterURL = `https://twitter.com/intent/tweet?text=${textURL}&url=${URL}&via=${via}&hashtags=${hashtags}`;

    const margin = {
        'marginTop': '8em',
    }

    const height = {
        'height': '1vh'
    }

    return (
        house === undefined
            ? <div></div>
            : <div>
                <Header />

                <main className="container-fluid px-0 main" style={margin}>

                    <div className="row px-5">
                        <h1 className="col-12">{house.titulo}</h1>

                        <div className='d-flex justify-content-start my-2 col-12 col-md-6'>
                            <p className="mb-0 fw-bold">{house.valoracion}</p>
                            <i className="fas fa-star py-1 ms-1"></i>
                            <span className="mx-1">·</span>
                            {house.direccion}
                            <span className="mx-1">·</span>
                            <strong>Precio noche: {house.precioNoche}€</strong>
                        </div>

                        <div className='d-flex justify-content-md-end col-12 my-2 col-md-6'>
                            <button variant="primary" className="btn btn-outline-primary" onClick={modalShow}>Panel de Acciones</button>
                            <ModalPanelConfiguracion
                                house={house}
                                setShowModal={setShowModal}
                                showModal={showModal}
                                reservations={reservations}
                                modalShowNewReservation={modalShowNewReservation}
                                setConfirmationReservationModal={setConfirmationReservationModal}
                            />
                            <ModalNewReservation
                                house={house}
                                setShowNewReservationModal={setShowNewReservationModal}
                                showNewReservationModal={showNewReservationModal}
                                modalConfirmationReservationModal={modalConfirmationReservationModal}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                valueCapacity={valueCapacity}
                                setValueCapacity={setValueCapacity}

                            />
                            <ModalConfirmationReservation
                                house={house}
                                setConfirmationReservationModal={setConfirmationReservationModal}
                                confirmationReservationModal={confirmationReservationModal}
                                startDate={startDate}
                                endDate={endDate}
                                valueCapacity={valueCapacity}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                setValueCapacity={setValueCapacity}
                                setHouse={setHouse}
                            />
                            <a className="btn btn-primary" id="twitter"
                                href={twitterURL} rel="noreferrer" target="_blank">
                                <i className="fa-brands fa-twitter"></i>
                                <i className="bi bi-twitter"> Compartir por Twitter</i>
                            </a>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center col-12 mt-3 px-5'>
                        <div className='d-flex justify-content-center col-12 col-md-7 row align-items-center'>
                            <Carousel className="croppedCarrousel">
                                {
                                    house.imagenes.map((imagen, index) => {
                                        return <Carousel.Item key={index}>
                                            <img
                                                className="croppedCarrousel"
                                                src={imagen}
                                                alt="Imagen de la casa" />
                                        </Carousel.Item>
                                    })
                                }
                            </Carousel>
                        </div>

                        <div className='d-flex justify-content-center col-5 d-none d-md-block croppedpx hijoInlineBlock'>
                            <MapContainer center={[house.coordenadas.latitud, house.coordenadas.longitud]} zoom={13} className="croppedpx hijoInlineBlock" >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[house.coordenadas.latitud, house.coordenadas.longitud]} icon={iconMarker} >
                                    <Popup>
                                        <span>{house.titulo}</span>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center d-md-none col-12 px-5'>
                        <div className='d-flex justify-content-center col-5 croppedpx hijoInlineBlock'>
                            <MapContainer center={[house.coordenadas.latitud, house.coordenadas.longitud]} zoom={13} className="croppedpx hijoInlineBlock" >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[house.coordenadas.latitud, house.coordenadas.longitud]} icon={iconMarker} >
                                    <Popup>
                                        <span>{house.titulo}</span>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    <div className="row px-5">

                        <div className='d-flex justify-content-start mt-3 col-12 col-sm-4'>
                            <i className="fas fa-bed py-1 me-1"></i>
                            <p><strong>Anfitrión: </strong> {house.propietario.nombre}</p>
                        </div>

                        {(isAuthenticated) ?
                            <div className='d-flex justify-content-center justify-content-sm-end col-12 col-sm-8 px-0'>
                                <strong className="d-none d-sm-block mt-3">Valorar vivienda:</strong>
                                <HouseRating house={id}></HouseRating>
                            </div> : <div></div>}
                    </div>

                    <div className="row px-5">

                        <div className='d-flex justify-content-start mt-3 col-12'>
                            <p className="fs-4">Descripción:</p>
                        </div>

                        <div className='d-flex justify-content-start breakSpaces col-12 ps-5'>
                            {house.descripcion}
                        </div>
                    </div>

                    <div className="row px-5 pt-4">

                        <div className='d-flex justify-content-start mt-3 col-12'>
                            <p className="fs-4">Las 20 gasolineras más cercanas:</p>
                        </div>

                        <MapContainer center={[house.coordenadas.latitud, house.coordenadas.longitud]} zoom={13} id="gas">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {marcadoresGasolineras}
                        </MapContainer>

                        <div className='breakSpaces col-12 ps-5 mt-4'>
                            {gasStation.map((gas, index) => {
                                return (
                                    <p key={index}>
                                        <i className="fa-solid fa-gas-pump pe-2"></i>
                                        La gasolinera con la dirección <strong className="breakSpaces">{gas["Dirección"]}</strong>
                                        tiene de precio la Gasolina 95 E5 a <strong className="breakSpaces">{gas["Precio Gasolina 95 E5"]}€</strong>
                                        y está a <strong className="breakSpaces">{gas["Distancia"]} km</strong>
                                    </p>
                                )
                            })}
                        </div>
                    </div>

                    {tourist.length === 0 ?
                        <div className="row px-5 pt-4">
                            <p className="fs-4">Con respecto a los turistas, no hemos podido obtener datos :(</p>
                        </div>
                        :
                        <div className="row px-5 pt-4">
                            <p className="fs-4">Con respecto a los turistas, estos son los datos obtenidos:</p>
                            <div className='breakSpaces col-12 ps-5 mt-0'>
                                <p><i className="fa-solid fa-plane pe-2"></i>El mes de <strong className="breakSpaces">{conversionMes(tourist["0"].month)}</strong> ha sido en el que más turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["0"].value}</strong> turistas.</p>
                                <p><i className="fa-solid fa-plane pe-2"></i>El mes de <strong className="breakSpaces">{conversionMes(tourist["1"].month)}</strong> ha sido el segundo mes en el que más turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["1"].value}</strong> turistas.</p>
                                <p><i className="fa-solid fa-plane pe-2"></i>El mes de <strong className="breakSpaces">{conversionMes(tourist["2"].month)}</strong> ha sido en el que menos turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["2"].value}</strong> turistas.</p>
                                <p><i className="fa-solid fa-plane pe-2"></i>El mes de <strong className="breakSpaces">{conversionMes(tourist["3"].month)}</strong> ha sido el segundo mes en el que menos turistas han venido a esta comunidad autónoma con un total de <strong className="breakSpaces">{tourist["3"].value}</strong> turistas.</p>
                            </div>
                        </div>
                    }

                    <div className="row px-5 pt-4">
                        <div>
                            {house.comentarios.length === 0 ?
                                <div>
                                    <p className="fs-4">No hay comentarios</p>
                                </div>
                                :
                                <div>
                                    <h5>Comentarios ({comentarios.length})</h5>
                                    <hr />
                                    {house.comentarios.map((comentario, index) => {
                                        return <div key={index}>
                                            <Comments comentario={comentario}
                                                user={user}
                                                house={house}
                                                comentarios={comentarios} />
                                        </div>
                                    })}
                                    <button hidden={allCommentsToView} className="mt-3 btnViewMoreComments" onClick={addAllCommentsToView}><i className="fa-solid fa-caret-down"></i> Ver el resto de comentarios</button>
                                </div>
                            }

                            {isAuthenticated ?
                                <div>
                                    <form className="mt-4" onSubmit={handleSubmit}>
                                        <label>Añade un comentario</label>
                                        <input type="text"
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
                <Footer />
            </div>
    )

}

export default House