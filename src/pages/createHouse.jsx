import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

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

  // const [vivienda, setVivienda] = useState({
  //   titulo: title,
  //   capacidad: capacity,
  //   direccion: direction,
  //   precioNoche: price,
  //   estado: "Libre",
  //   // dates: dates,
  //   descripcion: description,
  //   coordenadas: [0,0],
  //   fechasDisponibles: [[],[]],
  //   imagenes: [],
  //   valoracion: 0,
  //   propietario: {}
  // });

  const [msg, setMsg] = useState({
    message: "",
    color: "",
    visible: "no",
  });

  const { id } = useParams();
 
  document.title = 'Crear vivienda';

  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/`;
  //const URI = `${baseUrl}viviendas/propietario/${id}/nuevaVivienda`;
  //636a2eba353e6b6d0e281d7a = idPropietario

  // useEffect( () => {
  //   document.title = 'Crear vivienda';

  //   const form = document.getElementById("form");
  
  //   form.addEventListener('submit', async function(e) {
  //     e.preventDefault();
  
  //     const formData = new FormData(form)
      
  //     formData.append("coordenadas", [0,0]);
  //     formData.append("fechasDisponibles", [[],[]]);
  //     formData.append("imagenes", []);
  //     formData.append("valoracion", 0);
  //     formData.append("propietario", {});

  //     const load = new URLSearchParams(formData);
  //     // var jsonData = {};
  //     // for (var [k, v] of formData) {
  //     //   jsonData[k] = v;
  //     // }
  //     // console.log(jsonData);

  //     console.log([... formData]);
  //     //console.log([... load]);
  //     // const a = JSON.stringify([... formData]);
  //     // console.log(a);

  //     // 'http://httpbin.org/post'
  //     fetch(URI, {
  //       method: "POST",
  //       body: load
  //     }).then( res => res.json())
  //     .then( data => {
  //       console.log(data)
  //       setVivienda(data)
  //     }).catch(err => console.log(err))
  //   })
    
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vivienda = {
      titulo: title,
      capacidad: capacity,
      direccion: direction,
      precioNoche: price,
      estado: "Libre",
      // dates: dates,
      descripcion: description,
      coordenadas: [0,0],
      fechasDisponibles: [[],[]],
      imagenes: [],
      valoracion: 0,
      propietario: {id: id, nombre:"Pepe", foto:"perfil.png"}
    };
    const response = await fetch( URI, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(vivienda),
    }).then( res => res.json())
      .then( data => {
        console.log(data)
        // setVivienda(data)
      }).catch(err => console.log(err));
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
      // setVivienda(vivienda);
  }
  
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
                <form className="form" id ="form" onSubmit={handleSubmit} method="post">
                    <div className="form-group">
                        <label htmlFor="title">T&iacute;tulo</label>
                        <input name="title"

                        type="text" className="form-control" id="title"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Capacidad</label>
                        <input name="capacity"

                        type="number" className="form-control" id="capacity"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="direction">Direcci&oacute;n</label>
                        <input name="direction"

                        type="text" className="form-control" id="direction"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio por noche (€)</label>
                        <input name="price"

                        type="number" className="form-control" id="price"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea name="description"

                        type="text" className="form-control" id="description" rows="4"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Crear</button>
                </form>
            </div>      
        </main>
        {/* <Footer/> */}
    </div>
  );

};

export default CreateHouse;