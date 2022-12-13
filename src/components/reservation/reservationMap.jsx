import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';

import styles from '../../styles/reservation.module.css';

const iconMarker = L.icon({
    iconUrl: require('../../static/houseMarker.png'),
    iconSize: [48, 48],
    iconAnchor: [24, 48]
});

const ReservationMap = ({position}) => {
    return(
        <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={iconMarker}>
                <Tooltip direction="bottom" opacity={1} offset={[0, -5]} permanent>
                    <p className={styles.mapText}>Donde te alojarás</p>
                </Tooltip>
            </Marker>
        </MapContainer>
    );
};

export default ReservationMap;