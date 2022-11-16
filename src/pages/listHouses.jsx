import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'
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
        <main className="row justify-content-center main"
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
              </MapContainer>
          </div>
        </main>
        {/* <Footer/> */}
      </div>
  );

};

export default List;
