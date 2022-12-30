import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpReservations = ( userId, setReservations, accessToken ) => {
  fetch( `${baseUrl}reservas/usuario/${userId}`, {headers: { 'Authorization': `Bearer ${accessToken}` }} )
    .then( res => res.json())
    .then( data => {

      setReservations( data );
    })
    
};