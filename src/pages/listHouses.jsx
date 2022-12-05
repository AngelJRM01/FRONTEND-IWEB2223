import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpHouses } from '../helper/SetUpHouses.js';
import { HouseCard } from '../components/houses/houseCard';

 


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
  const crearViviendaURL = `http://localhost:3000/viviendas/propietario/${id}/nuevaVivienda`;  

  useEffect( () => {

    setUpHouses( id, setHouses );

    document.title = 'Mis viviendas';

  }, [id]);

  function createHouse () {
    window.location.href = crearViviendaURL;
  }

  return (
    houses.length === 0
      ? <div>{ }</div>
      : <div>
        <Header
        />
        <main className="row justify-content-center main"
          id="main-content">
          <h1 className='col-sm-8'>Mis viviendas</h1>
          <div className="col-sm-8 list-group"
            data-bs-spy="scroll">
            {
              <div className="container">
                <div className="row gy-1 my-3">
                  {houses.map ( house => (
                    <HouseCard key={house._id}
                      house={ house }
                    />
                  ))}
                </div>
              </div>
            }
            <a>
              <button type="button" onClick={createHouse} className="btn btn-primary">Crear vivienda</button>
            </a>
          </div>
          <div className='col-sm-8'>
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
