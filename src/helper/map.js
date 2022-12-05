// import { DraggableMarker } from '../helper/draggableMarker';
// import { MapContainer, TileLayer } from 'react-leaflet';

// export const Map = (data, center) => {
    
//     return(
//         <MapContainer id='map' center={center} zoom={10} >
//             <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {DraggableMarker(center)}
//             {/* <script>

//             </script> */}
//         </MapContainer>
//     );
// };

// #map { height: 280px; }

const apiKey = "0ab94b07fa6043a491f0050f801c58c2";

center = {
    latitud : 40,
    longitud : -3
}

let mapOptions = {
    center:[center.latitud, center.longitud],
    zoom:13
}

let map = new L.map('map', mapOptions);
let marker = null;

let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

const addressSearchControl = L.control.addressSearch(apiKey, {
    position:"topleft",
    placeholder:"Introduce una dirección",
    resultCallback : (address) => {
        if(marker !== null){
            map.removeLayer(marker);
        }
        marker = L.marker([address.lat, address.lon]).addTo(map);
        map.setView([address.lat, address.lon], 17);
        center.latitud = address.lat;
        center.longitud = address.lon;
        // console.log(center);
    }
});

map.addControl(addressSearchControl);