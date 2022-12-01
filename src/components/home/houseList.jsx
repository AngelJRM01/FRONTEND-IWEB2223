import React from 'react';
import { House } from './houseCard';

export const HouseList = ({ houses }) => {

    return (

        <div className='row d-flex justify-content-center'>
            {houses.map((house) => (<House house={house} />))}
        </div>

    );
} 