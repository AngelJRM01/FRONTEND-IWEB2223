import React, { useState } from 'react';

export const Filter = ({ setFilter }) => {

    const [value, setValue] = useState('');
    const [type, setType] = useState('');

    const handleChangeText = (e) => {
        setValue(e.target.value);
    }

    const handleChangeSelect = (e) => {
        setType(e.target.value);
    }

    return (

        <div className='d-flex mt-2 justify-content-center col-12'>
            <div className='d-flex justify-content-center col-xxl-3 col-lg-5 col-md-7 col-sm-9 col-10'>

                <input className="form-control mx-1" placeholder="Filtro" aria-label="default input example"
                    value={value} onChange={handleChangeText} disabled={type === ""}
                    type={type === "" || type === "address" ? "text" : "number"} min="0" max={type === "rating" ? "5" : null} />

                <select className="form-select mx-1" aria-label="Default select example"
                    value={type} onChange={handleChangeSelect}>
                    <option defaultValue value="">Sin filtro</option>
                    <option value="rating">Mayor valoración</option>
                    <option value="price">Menor precio (€/noche)</option>
                    <option value="address">Dirección</option>
                </select>

                <button className="btn btn-primary mx-1" type="submit" onClick={() => {
                    setFilter({ value: value, type: type })
                }}>Buscar</button>

            </div>
        </div>

    )
}
