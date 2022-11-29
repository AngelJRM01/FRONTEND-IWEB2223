import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global';

const EditHouse = () => {

  const { id, idVivienda } = useParams();

  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState('');
  const [direction, setDirection] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [coordenates, setCoordenates] = useState({latitud: 0,longitud: 0});
  const [dates, setDates] = useState([{fechaInicio: "2022-04-23T18:25:43.511+00:00"}, 
  {fechaInicio: "2010-04-23T18:25:43.511+00:00"}]);
  const [images, setImages] = useState(["image.jpg"]);
  const [owner, setOwner] = useState({_id: id, nombre:"Pepe", foto:"perfil.png"});

  document.title = 'Editar vivienda';

  // const [vivienda, setVivienda] = useState({
  //   titulo: title,
  //   capacidad: capacity,
  //   direccion: direction,
  //   precioNoche: price,
  //   descripcion: description,
  //   estado: state,
  //   coordenadas: coordenates,
  //   fechasDisponibles: dates,
  //   imagenes: images,
  //   valoracion: 0,
  //   propietario: owner
  // });

  // const [msg, setMsg] = useState({
  //   message: "",
  //   color: "",
  //   visible: "no",
  // });
 
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/` + idVivienda;
  // 6383fd185c003d453b597f3f
  const handleSubmit = async (e) => {
    e.preventDefault();

    const vivienda = {
      titulo: title,
      capacidad: capacity,
      direccion: direction,
      precioNoche: price,
      descripcion: description,
      estado: state,
      coordenadas: coordenates,
      fechasDisponibles: dates,
      imagenes: images,
      valoracion: 0,
      propietario: owner
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
    // const content = await response.json();
    // setMsg(
    //     content.msg === 1
    //       ? {
    //           message: "Se ha creado el producto correctamente",
    //           color: "success",
    //           visible: "si",
    //         }
    //       : {
    //           message: "No se ha podido crear el producto",
    //           color: "danger",
    //           visible: "si",
    //         }
    //   );
  }
  
  return (
    <div>
        <Header/>
        <main className="row justify-content-center main"
          id="main-content">
            <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
                <h1 align="center">Editar vivienda</h1>
                {/* {msg.visible === "si" ? (
                    <div className={"alert alert-" + msg.color} role="alert">
                        {msg.message}
                    </div>
                    ) : (
                    ``
                )} */}
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
                        <label for="exampleFormControlSelect1">Estado</label>
                        <select class="form-control" id="exampleFormControlSelect1" defaultValue={state}
                        value={state}
                        onChange={ (e)=> setState(e.target.value)}>
                            <option>Libre</option>
                            <option>Ocupado</option>
                            <option>No disponible</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Crear</button>
                </form>
            </div>      
        </main>
        {/* <Footer/> */}
    </div>
  );

};

export default EditHouse;