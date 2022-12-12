import { Global } from './Global';

const baseUrl = Global.baseUrl;


export const setUpReservationsOfAHouse = ( viviendaId, setReservations ) => {
  fetch( `${baseUrl}viviendas/${viviendaId}/reservas` )
    .then( res => res.json())
    .then( data => {

      setReservations( data );
    })
    
};