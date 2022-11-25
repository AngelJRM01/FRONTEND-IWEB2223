import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global';

//Error 500
//Por ahora solo quiero que se metan datos en la base de datos, ya iré especificando (por ejemplo, añadir el propietario)

const CreateHouse = () => {

  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState('');
  const [direction, setDirection] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [vivienda, setVivienda] = useState({
    title: title,
    capacity: capacity,
    direction: direction,
    price: price,
    state: "Libre",
    // dates: dates,
    description: description,
  });

  const [msg, setMsg] = useState({
    message: "",
    color: "",
    visible: "no",
  });

  const { id } = useParams();
 
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/`;
//   const URI = `${baseUrl}viviendas/propietario/${id}/nuevaVivienda`;

  document.title = 'Crear vivienda';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch( URI, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(vivienda),
    });
    const content = await response.json();
    setMsg(
        content.msg === 1
          ? {
              message: "Se ha creado el producto correctamente",
              color: "success",
              visible: "si",
            }
          : {
              message: "No se ha podido crear el producto",
              color: "danger",
              visible: "si",
            }
      );
      setVivienda(vivienda);
    /*
    setVivienda({     
        title: title,
        capacity: capacity,
        direction: direction,
        price: price,
        state: "Libre",
        //dates: dates,
        description: description,
    });
    */
  };

/*
  const handleSubmit = () => {
    const vivienda = {
        title: title,
        capacity: capacity,
        direction: direction,
        price: price,
        // state: state,
        // dates: dates,
        description: description,
        //photo: photo,
    }

    const baseUrl = Global.baseUrl;
    const URI = `${baseUrl}viviendas/propietario/${id}/nuevaVivienda`;
    fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(vivienda),
    })
    .then( response => {
        console.log("response", response)
        if(response.state == 200){
            alert("success")
        }
    }).catch(e => {
        console.log("e", e)
    })
  }
*/

/*
  const [vivienda, setVivienda] = useState([]);
  async function handleSubmit() {
    const vivienda = {
        title: title,
        capacity: capacity,
        direction: direction,
        price: price,
        // state: state,
        // dates: dates,
        description: description,
        //photo: photo,
    }

    try{
        
        const res = await fetch(URI, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(vivienda),
          });
        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }
    
    const data = await res.json();
    
    const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };

      setVivienda(vivienda);
    } catch (err) {
      setVivienda(err.message);
    }
  }
*/

  return (
    <div>
        <Header/>
        <main className="row justify-content-center main"
          id="main-content">
            <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
                <h1 align="center">Añadir vivienda</h1>
                {msg.visible === "si" ? (
                    <div className={"alert alert-" + msg.color} role="alert">
                        {msg.message}
                    </div>
                    ) : (
                    ``
                )}
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="title">T&iacute;tulo</label>
                        <input 
                            value={title}
                            onChange={ (e)=> setTitle(e.target.value)}
                        type="text" className="form-control" id="title"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Capacidad</label>
                        <input 
                            value={capacity}
                            onChange={ (e)=> setCapacity(e.target.value)}
                        type="number" className="form-control" id="capacidad"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="direction">Direcci&oacute;n</label>
                        <input 
                            value={direction}
                            onChange={ (e)=> setDirection(e.target.value)}
                        type="text" className="form-control" id="direction"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio por noche (€)</label>
                        <input
                            value={price}
                            onChange={ (e)=> setPrice(e.target.value)}
                        type="number" className="form-control" id="price"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea 
                            value={description}
                            onChange={ (e)=> setDescription(e.target.value)}
                        type="text" className="form-control" id="description" rows="4"></textarea>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Crear</button>
                </form>
            </div>      
        </main>
        {/* <Footer/> */}
    </div>
  );

};

export default CreateHouse;
