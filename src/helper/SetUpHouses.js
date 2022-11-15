import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHouses = ( propietarioId, setHouses ) => {
  
  fetch( `${baseUrl}viviendas/propietario/${propietarioId}` )
    .then( res => res.json())
    .then( data => {
      
      setHouses( data );
    })
    
};