import { DraggableMarker } from '../helper/draggableMarker';
import { MapContainer, TileLayer } from 'react-leaflet';

export const Map = (data, center) => {
    
    return(
        <MapContainer id='map' center={center} zoom={10} >
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {DraggableMarker(center)}
            {/* <script>

            </script> */}
        </MapContainer>
    );
};

// #map { height: 180px; }

// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);