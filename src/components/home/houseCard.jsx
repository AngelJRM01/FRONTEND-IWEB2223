import React from 'react';
import '../../styles/image.css';

export const House = ({ house }) => {

    return (

        <a href={house.link} className="card col-2 mx-2 px-0 mb-4 bg-transparent border-0 text-decoration-none text-bg-info">

            <img src={house.img} className="card-img-top rounded-4 cropped" alt="..." />
            <div className="card-body pt-2 px-1">

                <div className='d-flex flex-row'>
                    <p className="card-text col-10 mb-0 fw-bold">{house.title}</p>
                    <div className='d-flex justify-content-end col-2'>
                        <p className="mb-0 fw-bold">{house.rating}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-1 bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </div>
                </div>

                <p className="card-text mb-1 fw-light">{house.address}</p>

                <p className="card-text">Hasta {house.capacity} personas, <strong>{house.price} € noche</strong></p>
            </div>

        </a>

    )
}
