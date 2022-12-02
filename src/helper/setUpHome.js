import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHome = async (filter, setHouses) => {

    let response;

    if (filter.type === 'rating' && filter.value !== '') {
        response = await fetch(`${baseUrl}viviendas/valoracion/${filter.value}`);
    } else if (filter.type === 'price' && filter.value !== '') {
        response = await fetch(`${baseUrl}viviendas/precio/${filter.value}`);
    } else if (filter.type === 'address' && filter.value !== '') {
        response = await fetch(`${baseUrl}viviendas?direccion=${filter.value}`);
    } else {
        response = await fetch(`${baseUrl}viviendas`);
    }

    const data = await response.json();

    let houses = data.map((house) => {
        return {
            id: house._id,
            link: `vivienda/${house._id}`,
            img: house.imagenes[0],
            title: house.titulo,
            rating: house.valoracion,
            address: house.direccion,
            capacity: house.capacidad,
            price: house.precioNoche
        };
    });

    setHouses(houses);
}
