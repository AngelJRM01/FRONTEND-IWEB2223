import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const removeReservation = (id) => {
    fetch(`${ baseUrl }reservas/${ id }`, {method: 'DELETE'});
};