import React from 'react';
import '../../styles/image.css';

export const House = ({ house }) => {

    return (

        <a href={house.link} className="card col-2 mx-2 px-0 mb-4 bg-transparent border-0 text-decoration-none text-bg-info">

            <img src={house.img} className="card-img-top rounded-4 cropped" alt={house.title} />
            <div className="card-body pt-2 px-1">

                <div className='d-flex flex-row'>
                    <p className="card-text col-10 mb-0 fw-bold">{house.title}</p>
                    <div className='d-flex justify-content-end col-2'>
                        <p className="mb-0 fw-bold">{house.rating}</p>
                        <i className="fas fa-star py-1 ms-1"></i>
                    </div>
                </div>

                <p className="card-text mb-1 fw-light">{house.address}</p>

                <p className="card-text">Hasta {house.capacity} personas, <strong>{house.price} € noche</strong></p>
            </div>

        </a>

    )
}
