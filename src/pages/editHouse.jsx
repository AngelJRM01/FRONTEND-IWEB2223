import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global';

const EditHouse = (house) => {

  const { id, idVivienda } = useParams();

  const [title, setTitle] = useState(house.titulo);
  const [capacity, setCapacity] = useState(house.capacidad);
  const [direction, setDirection] = useState(house.direccion);
  const [price, setPrice] = useState(house.precioNoche);
  const [description, setDescription] = useState(house.descripcion);
  const [state, setState] = useState(house.estado);
  const [dates, setDates] = useState(house.fechasDisponibles);
  const [images, setImages] = useState(house.imagenes);
  // const [coordenates, setCoordenates] = useState(house.coordenates);
  // const [owner, setOwner] = useState(house.propietario);

  document.title = 'Editar vivienda';

  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/` + idVivienda;
  //6383fd185c003d453b597f3f = idVivienda
  //636a2eba353e6b6d0e281d7a = idPropietario
  const misViviendas = `http://localhost:3000/viviendas/propietario/${id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vivienda = {
      titulo: title,
      capacidad: capacity,
      direccion: direction,
      precioNoche: price,
      descripcion: description,
      estado: state,
      fechasDisponibles: dates,
      imagenes: images,
      // coordenadas: coordenates,
      // valoracion: 0,
      // propietario: owner
    };

    const response = await fetch( URI, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(vivienda),
    }).then( res => res.json())
      .then( data => {
        console.log(data)
      }).catch(err => console.log(err));

    window.location.href = misViviendas;
  }
  
  return (
    <div>
        <Header/>
        <main className="row justify-content-center main"
          id="main-content">
            <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
                <h1 align="center">Editar vivienda</h1>
                <form className="form" id ="form" onSubmit={handleSubmit} method="post">
                    <div className="form-group">
                        <label htmlFor="title">T&iacute;tulo</label>
                        <input name="title"
                            value={title}
                            onChange={ (e)=> setTitle(e.target.value)}
                        type="text" className="form-control" id="title"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Capacidad</label>
                        <input name="capacity"
                            value={capacity}
                            onChange={ (e)=> setCapacity(e.target.value)}
                        type="number" className="form-control" id="capacity"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="direction">Direcci&oacute;n</label>
                        <input name="direction"
                            value={direction}
                            onChange={ (e)=> setDirection(e.target.value)}
                        type="text" className="form-control" id="direction"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio por noche (€)</label>
                        <input name="price"
                            value={price}
                            onChange={ (e)=> setPrice(e.target.value)}
                        type="number" className="form-control" id="price"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea name="description"
                            value={description}
                            onChange={ (e)=> setDescription(e.target.value)}
                        type="text" className="form-control" id="description" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="state">Estado</label>
                        <select class="form-control" id="state" defaultValue={state}
                        value={state}
                        onChange={ (e)=> setState(e.target.value)}>
                            <option>Libre</option>
                            <option>Ocupado</option>
                            <option>No disponible</option>
                        </select>
                    </div>
                    {/* <Link to={"/viviendas/propietario/636a2eba353e6b6d0e281d7a"} > */}
                      <button type="submit" className="btn btn-primary">Crear</button>
                    {/* </Link> */}
                </form>
            </div>      
        </main>
        <Footer/>
    </div>
  );

};

export default EditHouse;