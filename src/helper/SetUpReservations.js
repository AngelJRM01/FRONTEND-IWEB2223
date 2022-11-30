import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpReservations = ( userId, setHouses ) => {
  
  fetch( `${baseUrl}reservas/usuario/${userId}` )
    .then( res => res.json())
    .then( data => {
      
      setHouses( data );
    })
    
};