import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpReservation = (id, setReservation, accessToken) => {

    fetch(`${ baseUrl }reservas/${ id }`, {headers: { 'Authorization': `Bearer ${accessToken}` }})
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setReservation(data);
                });
            };
        });
    
};