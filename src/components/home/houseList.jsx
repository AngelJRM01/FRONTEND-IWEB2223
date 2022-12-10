import React from 'react';
import { House } from './houseCard';

export const HouseList = ({ houses }) => {

    return (

        <div className='row d-flex justify-content-center pt-3'>
            {houses.length === 0 ?
                <div className='col-8 text-center'>
                    <h2>No se han encontrado resultados para su búsqueda</h2>
                    <p>Por favor, pruebe a introducir otros parámetros</p>
                </div> :
                houses.map((house) => (<House key={house.id} house={house} />))}
        </div>

    );
} 