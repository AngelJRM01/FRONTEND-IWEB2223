import { Global } from './Global';

const datosAbiertosUrl = Global.datosAbiertosUrl;

export const setUpGasStation = ( latitud, longitud, numeroGasolineras, setGasStation ) => {
  
  fetch( `${datosAbiertosUrl}gas/${latitud}/${longitud}/${numeroGasolineras}` )
    .then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                setGasStation(data);
            });
        };
    });
    
};