import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpHouses = ( propietarioId, setHouses ) => {

  Swal.showLoading();

  
  console.log(`${baseUrl}viviendas/propietario/${propietarioId}`);
  fetch( `${baseUrl}viviendas/propietario/${propietarioId}` )
    .then( res => res.json())
    .then( data => {
      
      setHouses( data );
      console.log( data );
    })
    

  Swal.close();

};