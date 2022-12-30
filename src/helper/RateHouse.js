import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const getHouseRate = async (house, user, setRate) => {

    let response = await fetch(`${baseUrl}viviendas/valoracion/${house}?usuario=${user}`);
    const data = await response.json();

    setRate(data.rating);
}

export const addHouseRate = async (house, user, rating) => {

    await fetch(`${baseUrl}viviendas/valoracion/${house}?usuario=${user}&valoracion=${rating}`, { method: 'PUT' });
    await fetch(`${baseUrl}viviendas/actualizar/${house}`, { method: 'PUT' });
}
