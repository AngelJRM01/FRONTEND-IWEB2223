import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const removeReservation = (id, accessToken) => {
    fetch(`${ baseUrl }reservas/${ id }`, {method: 'DELETE', headers: { 'Authorization': `Bearer ${accessToken}` }});
};