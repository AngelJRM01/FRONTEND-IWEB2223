import React from 'react';
import { House } from './houseCard';

export const HouseList = ({ houses }) => {

    return (

        <div className='row d-flex justify-content-center'>
            {houses.length === 0 ?
                <div className='col-4 text-center'>
                    <h2>No se han encontrado resultados para su búsqueda</h2>
                    <p>Por favor, pruebe a introducir otros parámetros</p>
                </div> :
                houses.map((house) => (<House key={house.id} house={house} />))}
        </div>

    );
} 