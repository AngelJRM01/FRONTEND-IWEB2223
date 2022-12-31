import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
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
  const { getAccessTokenSilently } = useAuth0();

  const [houses, setHouses] = useState([]);
  const { id } = useParams();
  const { user } = useAuth0();

  const iconMarker = L.icon({
    iconUrl: require('../static/marker.png'),
    iconSize: [48,48],
    iconAnchor: [32, 64],
  });

  const houseMarkers = houses.map((house) => (
    <Marker position={[house.coordenadas.latitud, house.coordenadas.longitud]} key={house._id} icon={iconMarker}>
            <Popup>
                  <img src={house.imagenes[0]} className="card-img-top mb-2 rounded-4 cropped-marker" alt={house.titulo} />
                  <div className="card-body py-0">
                      <p className="card-text my-0 fw-bold fs-6">{house.titulo}</p>
                      <p className="card-text my-1 fw-bold">{house.precioNoche} € noche</p>
                      <p className="card-text my-0 fst-italic">{house.direccion}</p>
                  </div>
            </Popup>
        </Marker>
  ));

  const crearViviendaURL = `${process.env.REACT_APP_API_FRONTEND_URL}viviendas/propietario/${id}/nuevaVivienda`;  

  useEffect( () => {
    async function fetchData() {
      const accessToken = await getAccessTokenSilently();
      setUpHouses( id, setHouses, accessToken );
    }
    fetchData();

    document.title = 'Mis viviendas';

  }, [id, getAccessTokenSilently]);

  function createHouse () {
    window.location.href = crearViviendaURL;
    console.log(process.env.REACT_APP_API_FRONTEND_URL)
  }

  return (
    houses.length === 0
      ? <div>
        <Header
        />
        <main className="row justify-content-center main"
          id="main-content">
          <h1 className='col-sm-6'>Mis viviendas</h1>
          <div className='col-sm-2'>
              <button type="button" onClick={createHouse} className="btn btn-primary">Crear vivienda</button>
            </div>
          <div className="col-sm-8 list-group"
            data-bs-spy="scroll">
            {
              <div className="container">
                <div className="row gy-1 my-3">
                  <div className="col-sm-12"> 
                    <h2 className="card-title">No tienes viviendas</h2>   
                  </div>
                </div>
              </div>
            }
          </div>
          </main>
          <Footer/>                        
        </div>
      : <div>
        <Header
        />
        <main className="row justify-content-center main"
          id="main-content">
          <h1 className='col-sm-6'>Mis viviendas</h1>
          <div className='col-sm-2'>
              <button type="button" onClick={createHouse} className="btn btn-primary">Crear vivienda</button>
            </div>
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

export default withAuthenticationRequired(List, { 
  onRedirecting: () => "Loading..." ,
  returnTo: () => window.location.pathname
});

