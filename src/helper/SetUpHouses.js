import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHouses = ( propietarioId, setHouses ) => {
  
  console.log(baseUrl)
  fetch( `${baseUrl}viviendas/propietario/${propietarioId}` )
    .then( res => res.json())
    .then( data => {
      
      setHouses( data );
    })
    
};