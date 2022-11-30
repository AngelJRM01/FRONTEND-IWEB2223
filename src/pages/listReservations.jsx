import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpReservations } from '../helper/SetUpReservations.js';
import { HouseCards } from '../components/houses/houseCard';

 


const List = () => {

  const [reservations, setReservations] = useState([]);
  const { userId } = useParams();


  useEffect( () => {

    setUpReservations( userId, setReservations );

    document.title = 'Mis viviendas';
    
  }, [userId]);


  return (
    
    reservations.length === 0
      ? <div>{ console.log(reservations) }</div>
      : <div>
        <Header
        />
        <main className="row justify-content-center main"
          id="main-content">
          <div className="col-sm-8 list-group"
            data-bs-spy="scroll">
            {
              reservations.persona
            }
          </div>
          
        </main>
        { <Footer/> }
      </div>
  );

};

export default List;
