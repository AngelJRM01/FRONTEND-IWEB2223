import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHouses = ( propietarioId, setHouses, accessToken ) => {
  
  fetch( `${baseUrl}viviendas/propietario/${propietarioId}`, {headers: { 'Authorization': `Bearer ${accessToken}` }} )
    .then( res => res.json())
    .then( data => {
      
      setHouses( data );
    })
    
};