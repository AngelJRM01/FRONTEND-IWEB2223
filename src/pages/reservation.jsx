import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from "../components/header";
import { Footer } from "../components/footer";

import { setUpReservation } from "../helper/SetUpReservation";

const Reservation = () => {

    const { id } = useParams();
    const [ reservation, setReservation ] = useState();

    useEffect( () => {

        setUpReservation(id, setReservation);

    }, [id]);

    useEffect( () => {
        
        if (reservation !== undefined) {
            document.title = "Información general de tu viaje - SwishHouses";
        }

    }, [reservation])

    return(
        
        <div>
            <Header/>
            <main className="row justify-content-center main">
                <div>
                    { reservation === undefined ? "Reservation not found." : JSON.stringify(reservation) }
                </div>
            </main>
            <Footer/>
        </div>

    );

};

export default Reservation;