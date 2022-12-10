import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import '../../styles/map.css'
import '../../styles/image.css';

const iconMarker = L.icon({
    iconUrl: require('../../static/marker.png'),
    iconSize: [48, 48],
    iconAnchor: [24, 48],
});

const houseMarker = (house) => {
    return (
        <Marker position={[house.lat, house.lon]} key={house.id} icon={iconMarker}>
            <Popup>
                <a href={house.link} className="card col-12 bg-transparent border-0 text-decoration-none text-bg-info">

                    <img src={house.img} className="card-img-top mb-2 rounded-4 cropped-marker" alt={house.title} />
                    <div className="card-body py-0">
                        <p className="card-text my-0 fw-bold fs-6">{house.title}</p>
                        <p className="card-text my-1 fw-bold">{house.price} € noche</p>
                        <p className="card-text my-0 fst-italic">{house.address}</p>
                    </div>
                </a>
            </Popup>
        </Marker>
    )
}

export const HouseMap = ({ houses }) => {

    return (

        <MapContainer center={[38.7, -3.7]} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {houses.map((house) => (houseMarker(house)))}
        </MapContainer>

    );
}