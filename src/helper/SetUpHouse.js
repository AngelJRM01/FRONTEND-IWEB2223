import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHouse = ( id, setHouse ) => {
  
  fetch( `${baseUrl}viviendas/${id}` )
    .then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                setHouse(data);
            });
        };
    });
    
};