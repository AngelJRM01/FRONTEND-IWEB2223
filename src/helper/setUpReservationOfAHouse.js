import { Global } from './Global';

const baseUrl = Global.baseUrl;


export const setUpReservationsOfAHouse = ( viviendaId, setReservations, accessToken ) => {
  fetch( `${baseUrl}viviendas/${viviendaId}/reservas`, {headers: { 'Authorization': `Bearer ${accessToken}` }} )
    .then( res => res.json())
    .then( data => {

      setReservations( data );
    })
    
};