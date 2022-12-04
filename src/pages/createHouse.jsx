import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global';
import { DraggableMarker } from '../helper/draggableMarker';
// import { Map } from '../helper/map';
import '../styles/map.css';

const CreateHouse = () => {

  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState('0');
  const [direction, setDirection] = useState('');
  const [price, setPrice] = useState('0');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('Libre');
  const [dates, setDates] = useState([
    {fechaInicio: "2022-04-23T18:25:43.511+00:00"}, 
  {fechaInicio: "2010-04-23T18:25:43.511+00:00"}
  ]);
  const [images, setImages] = useState(["terrazaDeJuan.jpg"]);
  const [coordenates, setCoordenates] = useState({
    latitud: 40.41831,
    longitud: -3.70275,
  });
  const [owner, setOwner] = useState({_id: id, nombre:"Pepe", foto:"perfil.png"});

  document.title = 'Crear vivienda';

  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/`;
  //const URI = `${baseUrl}viviendas/propietario/${id}/nuevaVivienda`;
  //636a2eba353e6b6d0e281d7a = idPropietario
  const misViviendas = `http://localhost:3000/viviendas/propietario/${id}`;

  const apiKey = "0ab94b07fa6043a491f0050f801c58c2";

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
      coordenadas: coordenates,
      valoracion: 0,
      propietario: owner
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
      }).catch(err => console.log(err));

    window.location.href = misViviendas;
  }

  const center = {
    lat: coordenates.latitud,
    lon: coordenates.longitud,
  }

  const getDirection = async (e) => {
    e.preventDefault();

    const textDir = encodeURIComponent(direction);
    const geocodingURL = `https://api.geoapify.com/v1/geocode/search?text=${textDir}&format=json&apiKey=${apiKey}`

    const response = await fetch(geocodingURL);
    const data = await response.json();
    const dataJSON = data.results;
    
    console.log(dataJSON);

    center.lat = 0;
    center.lon = 0;
    

    for(let i = 0; i < dataJSON.length; i++){
        center.lat += dataJSON[i].lat;
        center.lon += dataJSON[i].lon;
    }
      
    center.lat /= dataJSON.length;
    center.lon /= dataJSON.length;
    console.log(center);

    // const map = document.getElementById('map');

    // Map(dataJSON, center);

  }
  
  return (
    <html>
      <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
            integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
            crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
            integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
            crossorigin=""></script>
      </head>
    <div>
        <Header/>
        <main className="row justify-content-center main"
          id="main-content">
            <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
                <h1 align="center">Añadir vivienda</h1>
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
                        <input type="button" value="Buscar" onClick={getDirection}></input>
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
                    <div className="form-group">
                        <label for="state">Estado</label>
                        <select className="form-control" id="state" defaultValue={state}
                        value={state}
                        onChange={ (e)=> setState(e.target.value)}>
                            <option>Libre</option>
                            <option>Ocupado</option>
                            <option>No disponible</option>
                        </select>
                    </div>
                    <div>
                        <MapContainer id='map' center={center} zoom={13} >
                          <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          {DraggableMarker(center)}
                        </MapContainer>
                        {/* {Map(center)} */}
                        {/* <div id="map"></div>
                        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                        <script src="https://unpkg.com/@geoapify/leaflet-address-search-plugin@^1/dist/L.Control.GeoapifyAddressSearch.min.js"></script>
                        <script src="map.js"></script> */}
                        {/* {getDirection} */}

                    </div>
                    <button type="submit" className="btn btn-primary">Crear</button>
                </form>
            </div>      
        </main>
        <Footer/>
    </div>
    </html>
  );

};

export default CreateHouse;