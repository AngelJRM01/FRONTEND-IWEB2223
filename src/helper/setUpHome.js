import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHome = async (filter, setHouses) => {

    let request = `${baseUrl}viviendas/filtro?`;

    if(filter.price){
        request += `precio=${filter.price}&`;
    }
    if(filter.capacity){
        request += `capacidad=${filter.capacity}&`;
    }
    if(filter.rating){
        request += `valoracion=${filter.rating}&`;
    }
    if(filter.address){
        request += `direccion=${filter.address}&`;
    }
    if(filter.state){
        request += `estado=${filter.state}&`;
    }
    if(filter.owner){
        request += `propietario=${filter.owner}&`;
    }
    if(filter.startDate && filter.endDate){
        request += `fechaInicio=${filter.startDate}&`;
        request += `fechaFinal=${filter.endDate}&`;
    }
    if ((filter.prox || filter.prox === 0) && filter.lat && filter.lon) {
        request += `prox=${filter.prox}&lat=${filter.lat}&lon=${filter.lon}`;
    }

    const response = await fetch(request);

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
            price: house.precioNoche,
            lat: house.coordenadas.latitud,
            lon: house.coordenadas.longitud
        };
    });

    setHouses(houses);
}

export const setUpOwners = async (setOwners) => {

    let response = await fetch(`${baseUrl}viviendas/propietarios`);
    const data = await response.json();

    setOwners(data);
}

export const getAddress = async (address, setAddress) => {

    let response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${address}&accept-language=Spanish&format=jsonv2`);
    const data = await response.json();

    if(data[0]){
        setAddress(data[0].display_name);
        return data[0];
    }

    return null;
}
