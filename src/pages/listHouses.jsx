import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import iconMarker from '../static/marker.png';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpHouses } from '../helper/SetUpHouses.js';
import { HouseCards } from '../components/houses/houseCard';

 


const List = () => {

  const [houses, setHouses] = useState([]);
  const { id } = useParams();

  const iconMarker = L.icon({
    iconUrl: require('../static/marker.png'),
    iconSize: [48,48],
    iconAnchor: [32, 64],
});

  const houseMarkers = houses.map((house) => (
    
    <Marker position={[house.coordenadas.latitud, house.coordenadas.longitud]} key={house._id} icon={ iconMarker } >
      <Popup>
        <span>{house.titulo}</span>
      </Popup>
    </Marker>
  ));
 
  // const URI = `${baseUrl}contentsLists/`;

  useEffect( () => {

    setUpHouses( id, setHouses );

    document.title = 'Mis viviendas';

  }, [id]);


  return (
    houses.length === 0
      ? <div>{ }</div>
      : <div>
        <Header
        />
        <main className="row justify-content-center"
          id="main-content">
          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
            {
              <HouseCards
                houses={ houses }
                setHouses={ setHouses }
                id = { id }
              />
            }
          </div>
          <div className='col-lg-8'>
              <MapContainer center={[40.41831, -3.70275]} zoom={13} >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { houseMarkers }
              </MapContainer>
          </div>
        </main>
        { <Footer/> }
      </div>
  );

};

export default List;
