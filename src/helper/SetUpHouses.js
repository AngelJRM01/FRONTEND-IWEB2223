import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpHouses = ( setHouses ) => {

  Swal.showLoading();

  
  console.log(`${baseUrl}viviendas`);
  fetch( `${baseUrl}viviendas` )
    .then( res => res.json())
    .then( data => {
      
      setHouses( data );
      console.log( data );
    })
    

  Swal.close();

};