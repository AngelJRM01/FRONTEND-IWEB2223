import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { MapContainer, TileLayer } from 'react-leaflet'
import { Carousel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";
import { useAuth0 } from '@auth0/auth0-react';

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global';
import { setUpHouse } from '../helper/SetUpHouse.js';

const EditHouse = () => {
  const { getAccessTokenSilently } = useAuth0();

  const { id, idVivienda } = useParams();
  const [ house, setHouse ] = useState();
  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState('0');
  const [direction, setDirection] = useState('');
  const [price, setPrice] = useState('0');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('Libre');
  const [dates, setDates] = useState([]);
  const [images, setImages] = useState([]);
  const [coordenates, setCoordenates] = useState({
    latitud: 40.41831,
    longitud: -3.70275,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [src, setSrc] = useState([]);
  let aux = [];
  const [done, setDone] = useState(false);
  const [cargando, setCargando] = useState(false);

  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/` + idVivienda;
  //6383fd185c003d453b597f3f = idVivienda
  //636a2eba353e6b6d0e281d7a = idPropietario
  // const misViviendas = `http://localhost:3000/viviendas/propietario/${id}`;
  let misViviendas = `http://localhost:3000/vivienda/${idVivienda}`;

  useEffect( () => {

    setUpHouse( idVivienda, setHouse );

    document.title = 'Editar vivienda';

  }, [idVivienda]);

  useEffect( () => {
        
    if(house !== undefined){
      setTitle(house.titulo);
      setCapacity(house.capacidad);
      setDirection(house.direccion);
      setPrice(house.precioNoche);
      setDescription(house.descripcion);
      setState(house.estado);
      setImages(house.imagenes);
      setCoordenates(house.coordenadas);
      setDates(house.fechasNoDisponibles);
    }

  }, [house])

  function addFiles(files) {
    aux = [];
    setSrc([]);
    setDone(false);
    setCargando(true);
    let cnt=0;
    
    for(let i = 0; i < files.length; i++) {
        console.log(files[i])
        const formData = new FormData();
        formData.append('image', files[i]);
        fetch(`${baseUrl}images/uploadImage`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            aux.push(data.url);
            cnt++;
            if(cnt === files.length) {
                setDone(true);
                setCargando(false);
            }
            console.log(aux);
        });
    }
    setSrc(aux);
    console.log(src);
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if(state === 'Ocupado'){
    //   const now = Date.now();
    //   const today = new Date (now);
    //   const fechaInicio = today.toISOString();
    //   dates = [
    //     {fechaInicio: fechaInicio}
    //   ]
    // }


    let puedeReservar = comprobarReserva();
    console.log(puedeReservar);
    
    let fechas = dates;
    console.log(fechas);
    
    if(puedeReservar){
      const fI = new Date(startDate);
      const fechaInicio = fI.toISOString();
      const fF = new Date(endDate);
      const fechaFin = fF.toISOString();
      const estancia = {fechaInicio: fechaInicio, fechaFinal: fechaFin};
        
      fechas.push(estancia);
      // console.log(fechas);

      const vivienda = {
        titulo: title,
        capacidad: capacity,
        // direccion: direction,
        precioNoche: price,
        descripcion: description,
        estado: state,
        fechasNoDisponibles: fechas,
        imagenes: images,
        // coordenadas: coordenates,
        // valoracion: 0,
        // propietario: owner
  
        // titulo: house.titulo,
        // capacidad: house.capacidad,
        // direccion: house.direccion,
        // precioNoche: house.precioNoche,
        // descripcion: house.descripcion,
        // estado: house.estado,
        // fechasDisponibles: house.fechasDisponibles,
        // imagenes: house.imagenes,
        // // coordenadas: coordenates,
        // // valoracion: 0,
        // // propietario: owner
      };
  
      if(src !== []) {
        let imagenes = vivienda.imagenes;
        src.map((s) => {
          return imagenes.push(s);
        });
        vivienda.imagenes = imagenes;
        console.log("a insertar: " + vivienda.imagenes)
      }
  
      const accessToken = await getAccessTokenSilently();
      await fetch( URI, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(vivienda),
      }).then( res => res.json())
        .then( data => {
          console.log(data)
        }).catch(err => console.log(err));
  
      window.location.href = misViviendas;
    }

    
  }

  const URL = `http://localhost:3000/viviendas/propietario/${id}/vivienda/${idVivienda}/edit`;
  // const URL = `http://localhost:3000/vivienda/${idVivienda}`;

  const deleteImage = async (e, image) => {
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

      // titulo: house.titulo,
      // capacidad: house.capacidad,
      // direccion: house.direccion,
      // precioNoche: house.precioNoche,
      // descripcion: house.descripcion,
      // estado: house.estado,
      // fechasDisponibles: house.fechasDisponibles,
      // imagenes: house.imagenes,
      // // coordenadas: coordenates,
      // // valoracion: 0,
      // // propietario: owner
    };

    console.log(image);
    // if(image !== "") {
    let imagenes = vivienda.imagenes;
    imagenes = imagenes.filter((imagen) => imagen !== image);
    vivienda.imagenes = imagenes;
    // }

    
    const response = fetch( URI, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(vivienda),
    }).then( res => res.json())
      .then( data => {
        console.log(data)
      }).catch(err => console.log(err));

    window.location.href = URL;
  }


  const now = Date.now();
  const today = new Date (now);
  //const fechaInicio = today.toISOString();
  const [error, setError] = useState("")

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  function daysDisable() {
    const days = [];

    if(dates !== undefined){
      if(dates.length > 0){
          dates.forEach(fecha => {
              const fechaInicio = new Date(fecha.fechaInicio)
              const fechaFin = new Date(fecha.fechaFinal)

              days.push(fechaInicio)
              days.push(fechaFin)
  
              let resta = fechaFin.getTime() - fechaInicio.getTime()
  
              for(let i = 1; i <= Math.round(resta/ (1000*60*60*24)); i++){
                  days.push(new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() + i))
              }
          })
      }
    }
    return days;
  }

  function comprobarReserva() {

    const days = []

    const fechaInicio = new Date(startDate)
    const fechaFin = new Date(endDate)

    days.push(fechaInicio)
    days.push(fechaFin)
    
    let resta = fechaFin.getTime() - fechaInicio.getTime()
    
    for(let i = 1; i <= Math.round(resta/ (1000*60*60*24)); i++){
        days.push(new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() + i))
    }

    let puedeReservar = true

    const days2 = daysDisable()
    days2.forEach(day2 => {

        let Day2 = new Date(day2)
        days.forEach(day => {

            let Day = new Date(day)
            if(Day.getDate() === Day2.getDate() && Day.getMonth() === Day2.getMonth() && Day.getFullYear() === Day2.getFullYear()){
                setError("Hay un día que no está disponible entre los que ha elegido");
                puedeReservar = false;
            }

        })

    })

    return puedeReservar
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
                    <p className="form-group">
                        <label htmlFor="title">T&iacute;tulo</label>
                        <input name="title"
                            value={title}
                            onChange={ (e)=> setTitle(e.target.value)}
                        type="text" className="form-control" id="title"></input>
                    </p>
                    <p className="form-group">
                        <label htmlFor="capacity">Capacidad</label>
                        <input name="capacity"
                            value={capacity}
                            onChange={ (e)=> setCapacity(e.target.value)}
                        type="number" className="form-control" id="capacity"></input>
                    </p>
                    <p className="form-group">
                        <label htmlFor="price">Precio por noche (€)</label>
                        <input name="price"
                            value={price}
                            onChange={ (e)=> setPrice(e.target.value)}
                        type="number" className="form-control" id="price"></input>
                    </p>
                    <p className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea name="description"
                            value={description}
                            onChange={ (e)=> setDescription(e.target.value)}
                        type="text" className="form-control" id="description" rows="4"></textarea>
                    </p>
                    <p className="form-group">
                        <label for="state">Estado</label>
                        <select className="form-control" id="state" defaultValue={state}
                        value={state}
                        onChange={ (e)=> setState(e.target.value)}>
                            <option>Libre</option>
                            <option>Ocupado</option>
                            <option>No disponible</option>
                        </select>
                    </p>
                    {/* <div className="form-group">
                        <label htmlFor="direction">Direcci&oacute;n</label>
                        <input name="direction"
                            value={direction}
                            onChange={ (e)=> setDirection(e.target.value)}
                        type="text" className="form-control" id="direction"></input>
                    </div>
                    <div>
                        <MapContainer center={[40, -3]} zoom={13} >
                          <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                        </MapContainer>
                    </div> */}
                    <DatePicker
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      minDate={today}
                      maxDate={new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())}
                      excludeDates={daysDisable()}
                      selectsRange
                      selectsDisabledDaysInRange
                      inline
                    />
                    <h6 className="textRed">{error}</h6>
                    <div>
                      <label htmlFor="image">Añadir imagen</label><br/>
                          <input accept="image/*" type="file" id="imagen-edit" multiple onChange={
                              (e) => {
                                addFiles(e.target.files);
                              }
                          }/>
                          <img name="img-photo-edit" id="img-photo-edit" className="align-self-center m-3" alt="" src={src}/>
                    </div>
                    <div>
                        {/* habria que comprobar si tiene alguna imagen */}
                        <Carousel className="croppedpx hijoInlineBlock marginRight100px marginBottom30px">
                                {
                                    images.map( (imagen, index ) => {
                                      return  <Carousel.Item key={index}>
                                      <div className="croppedpx padreCentrar">
                                          <img
                                              className="card-img-top rounded-2 hijoCentrar"
                                              src={imagen}
                                              alt="Imagen de la casa"
                                              id='img'/>
                                      </div>
                                      <button onClick={(e)=>deleteImage(e,imagen)}>Borrar Imagen</button>
                                  </Carousel.Item>
                                    } )
                                }
                        </Carousel>
                    </div>
                      {cargando ? <p>Cargando...</p> : <p></p>}
                      <button type="submit" disabled={!done} className="btn btn-primary">Actualizar</button>
                </form>
            </div>      
        </main>
        <Footer/>
    </div>
  );

};

export default EditHouse;