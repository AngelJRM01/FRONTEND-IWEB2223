import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import DatePicker from "react-datepicker";
import { useEffect } from 'react';
import { getAddress, setUpOwners } from '../../helper/setUpHome';

const iconMarker = L.icon({
    iconUrl: require('../../static/marker.png'),
    iconSize: [48, 48],
    iconAnchor: [24, 48],
});

const height = {
    'height': '50vh'
}

const today = new Date();

function Filter({ show, onHide, setFilter }) {

    const [price, setPrice] = useState();
    const [capacity, setCapacity] = useState();
    const [rating, setRating] = useState(0);
    const [address, setAddress] = useState();
    const [state, setState] = useState();

    const [owner, setOwner] = useState();
    const [owners, setOwners] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [location, setLocation] = useState();
    const [prox, setProx] = useState(0);
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();

    useEffect(() => {
        if (!owners) {
            setUpOwners(setOwners);
        }
    }, [owners]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let filter = {};

        if (price) {
            filter.price = price;
        }
        if (capacity) {
            filter.capacity = capacity;
        }
        if (rating) {
            filter.rating = rating;
        }
        if (address) {
            filter.address = address;
        }
        if (state) {
            filter.state = state;
        }
        if (owner) {
            filter.owner = owner;
        }
        if (startDate && endDate) {
            filter.startDate = new Date(startDate);
            filter.endDate = new Date(endDate);
        }
        if ((prox || prox === 0) && lat && lon) {
            filter.prox = prox;
            filter.lat = lat;
            filter.lon = lon;
        }

        setFilter(filter);
        onHide();
    };

    const clean = () => {
        setPrice(undefined);
        setCapacity(undefined);
        setRating(0);
        setAddress("");
        setState("");
        setOwner("");
        setStartDate(undefined);
        setEndDate(undefined);
        setLocation("");
        setProx(0);
        setLat(undefined);
        setLon(undefined);
    }

    const handleDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleSearch = async () => {
        if (!location) {
            console.log("Error");
        } else {
            let geocoding = await getAddress(location, setLocation);

            if (geocoding) {
                setLat(geocoding.lat);
                setLon(geocoding.lon);
            }
        }
    }

    function ObjectMarker() {
        const map = useMapEvents({
            mouseover() {
                map.flyTo([lat, lon], 13);
            }
        })

        return (
            <Marker position={[lat, lon]} icon={iconMarker}>

            </Marker>
        )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Filtro de viviendas
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div>
                    <form className="row g-3" onSubmit={handleSubmit}>

                        <div className="col-md-6">
                            <label htmlFor="price" className="form-label">Precio máximo</label>
                            <input type="number" className="form-control" id="price" min="0"
                                value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="capacity" className="form-label">Capacidad mínima</label>
                            <input type="number" className="form-control" id="capacity" min="0"
                                value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="rating" className="form-label">
                                Valoración mínima
                                <i className="fas fa-star py-1 ms-1 me-1"></i>
                                {rating}
                            </label>
                            <Form.Range id="rating" max="5" min="0" step="0.1"
                                value={rating} onChange={(e) => setRating(e.target.value)} required />
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="address" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="address"
                                value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="state" className="form-label">Estado</label>
                            <select className="form-select" id="state"
                                value={state} onChange={(e) => setState(e.target.value)} required>
                                <option defaultValue value="">Elegir...</option>
                                <option value="libre" >Libre</option>
                                <option value="no disponible" >No disponible</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="owner" className="form-label">Propietario</label>
                            <select className="form-select" id="owner"
                                value={owner} onChange={(e) => setOwner(e.target.value)} required>
                                <option defaultValue value="">Elegir...</option>

                                {owners === undefined || owners.length === 0 ?
                                    <option disabled value="" >No hay propietarios</option> :
                                    owners.map((owner) => (<option value={owner.nombre} key={owner._id} >{owner.nombre}</option>))}
                            </select>
                        </div>

                        <div className="col-12">
                            <label htmlFor="date" className="form-label">Rango de fechas disponibles </label>
                            <div className="input-group d-flex justify-content-center">
                                <DatePicker id="date"
                                    onChange={handleDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={today}
                                    maxDate={new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())}
                                    selectsRange
                                    selectsDisabledDaysInRange
                                    inline
                                />
                            </div>
                        </div>

                        <div className="col-10">
                            <label htmlFor="prox" className="form-label">Proximidad a una dirección</label>
                            <div className="input-group">
                                <a className="btn btn-primary" onClick={handleSearch}>Buscar</a>
                                <input type="text" className="form-control" id="prox"
                                    value={location} onChange={(e) => setLocation(e.target.value)} required />
                            </div>
                        </div>

                        <div className="col-2">
                            <label htmlFor="price" className="form-label">Proximidad</label>
                            <input type="number" className="form-control" id="price" min="0"
                                value={prox} onChange={(e) => setProx(e.target.value)} required />
                        </div>

                    </form>

                    <MapContainer center={[38.7, -3.7]} zoom={6} scrollWheelZoom={true} style={height} className="mt-4">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {(lat !== undefined && lon !== undefined) ? <ObjectMarker /> : <div></div>}
                    </MapContainer>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-danger" onClick={clean}>Limpiar Filtro</button>
                <Button onClick={handleSubmit}>Aplicar Filtro</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const ModalFilter = ({ setFilter }) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className='d-flex mt-2 justify-content-center col-12'>

            <Button variant="primary" onClick={() => setModalShow(true)}>
                <i className="fa-solid fa-magnifying-glass me-2"></i>
                Aplicar filtro
            </Button>

            <Filter
                show={modalShow}
                onHide={() => setModalShow(false)}
                setFilter={setFilter}
            />
        </div>
    );
}
