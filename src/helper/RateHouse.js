import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const getHouseRate = async (house, user, setRate, accessToken) => {

    let response = await fetch(`${baseUrl}viviendas/valoracion/${house}?usuario=${user}`, {headers: { 'Authorization': `Bearer ${accessToken}` }});
    const data = await response.json();

    setRate(data.rating);
}

export const addHouseRate = async (house, user, rating, accessToken) => {

    await fetch(`${baseUrl}viviendas/valoracion/${house}?usuario=${user}&valoracion=${rating}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${accessToken}` } });
    await fetch(`${baseUrl}viviendas/actualizar/${house}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${accessToken}` } });
}
