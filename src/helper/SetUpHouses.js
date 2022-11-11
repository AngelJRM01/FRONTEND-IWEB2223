import fetch from 'node-fetch';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpHouses = ( setHouses ) => {

  Swal.showLoading();

  fetch( `${baseUrl}users` )
    .then( res => res.json())
    .then( data => {
      setHouses( data );
    }).catch( err => {
      console.log( err );
    }
);

  Swal.close();

};