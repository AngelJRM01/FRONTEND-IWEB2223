import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpReservation = (id, setReservation) => {

    fetch(`${ baseUrl }reservas/${ id }`)
        .then(res => res.json())
        .then(data => { setReservation(data); });
    
};