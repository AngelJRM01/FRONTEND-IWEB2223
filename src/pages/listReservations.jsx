import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpReservations } from '../helper/SetUpReservations.js';
import { ReservationCard } from '../components/reservations/reservationCard.jsx';

 


const List = () => {

  const [reservations, setReservations] = useState([]);
  const { userId } = useParams();


  useEffect( () => {

    setUpReservations( userId, setReservations );

    document.title = 'Mis reservas';
    
  }, [userId]);


  return (
    
    reservations.length === 0
      ? <div> { }</div>
      : <div>
        <Header
        />
        <main className="row justify-content-center main"
          id="main-content">
          <h1 className='col-sm-8'>Mis reservas</h1>
          <div className="col-md-8 row justify-content-start">
            <div className="col-lg-8 list-group"
              data-bs-spy="scroll">
              {
                <div className="container">
                  <div className="row gy-1 my-3">
                    {reservations.map(reservation => (
                      <ReservationCard
                        reservation={ reservation }
                      />
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
          
          
        </main>
        { <Footer/> }
      </div>
  );

};

export default List;
