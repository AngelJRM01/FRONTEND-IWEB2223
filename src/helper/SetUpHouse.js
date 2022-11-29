import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHouse = ( id, setHouse ) => {
  
  fetch( `${baseUrl}viviendas/${id}` )
    .then( res => res.json())
    .then( data => {
      console.log(data)
      setHouse( data );
    })
    
};