import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import '../styles/main.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global';

const CreateHouse = () => {
  const { getAccessTokenSilently } = useAuth0();

  const { id } = useParams();
  const { user } = useAuth0();

  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState('0');
  const [direction, setDirection] = useState('');
  const [price, setPrice] = useState('0');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('Libre');
  const [dates, setDates] = useState([]);
  const [images, setImages] = useState([]);
  const [coordenates, setCoordenates] = useState({
    latitud: 36.7201600,
    longitud: -4.4203400,
  });
  const [owner, setOwner] = useState({ _id: id, nombre: user.name, foto: user.picture });
  const [src, setSrc] = useState([]);
  let aux = [];
  const [done, setDone] = useState(false);
  const [cargando, setCargando] = useState(false);

  document.title = 'Crear vivienda';

  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/`;
  let misViviendas = "";

  async function addFiles(files) {
    aux = [];
    setSrc([]);
    setDone(false);
    setCargando(true);
    let cnt = 0;

    const accessToken = await getAccessTokenSilently();
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('image', files[i]);
      fetch(`${baseUrl}images/uploadImage`, {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
        .then(res => res.json())
        .then(data => {
          aux.push(data.url);
          cnt++;
          if (cnt === files.length) {
            setDone(true);
            setCargando(false);
          }
        })
        .catch(err => console.log(err));
    }
    setSrc(aux);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vivienda = {
      titulo: title,
      capacidad: capacity,
      direccion: direction,
      precioNoche: price,
      descripcion: description,
      estado: state,
      fechasNoDisponibles: dates,
      imagenes: images,
      coordenadas: coordenates,
      valoracion: 0,
      propietario: owner
    };

    if (src !== []) {
      let imagenes = vivienda.imagenes;
      src.map((s) => {
        return imagenes.push(s);
      });
      vivienda.imagenes = imagenes;
    }

    const accessToken = await getAccessTokenSilently();
    await fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(vivienda),
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        misViviendas = `${process.env.REACT_APP_API_FRONTEND_URL}vivienda/${data._id}`;
      }).catch(err => console.log(err));

    window.location.href = misViviendas;
  }

  const center = {
    lat: coordenates.latitud,
    lon: coordenates.longitud,
  }
  const zoom = 13;

  const getDirCoordenates = async (e) => {
    const geocodingURL = `https://nominatim.openstreetmap.org/search.php?q=${direction}&accept-language=Spanish&format=jsonv2`

    const response = await fetch(geocodingURL);
    const data = await response.json();

    if (data.length >= 1) {

      center.lat = data[0].lat;
      center.lon = data[0].lon;

      setDirection(data[0].display_name);
    }

    coordenates.latitud = center.lat;
    coordenates.longitud = center.lon;
  }

  const iconMarker = L.icon({
    iconUrl: require('../static/marker.png'),
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  });

  function LocationMarker() {
    const map = useMapEvents({
      mouseover() {
        getDirCoordenates();
        map.flyTo([coordenates.latitud, coordenates.longitud], zoom);
      },
      locationfound(e) {
        coordenates.latitud = e.latitude;
        coordenates.longitud = e.longitude;
      },
    })

    return direction === null ? null : (
      <Marker position={[coordenates.latitud, coordenates.longitud]} icon={iconMarker} >
        <Popup>
          <span>{direction}</span>
        </Popup>
      </Marker>
    )
  }

  return (
    <div>
      <Header />
      <main className="row justify-content-center main"
        id="main-content">
        <div className="col-10 col-lg-8 list-group"
          data-bs-spy="scroll">
          <h1 align="center">Añadir vivienda</h1>
          <form className="form" id="form" onSubmit={handleSubmit} method="post">
            <div className="form-group my-3">
              <label htmlFor="title">T&iacute;tulo</label>
              <input name="titleInput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" className="form-control" id="titleInput"></input>
            </div>
            <div className="form-group my-3">
              <label htmlFor="capacity">Capacidad</label>
              <input name="capacityInput"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                type="number" className="form-control" id="capacityInput"></input>
            </div>
            <div className="form-group my-3">
              <label htmlFor="price">Precio por noche (€)</label>
              <input name="priceInput"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number" className="form-control" id="price"></input>
            </div>
            <div className="form-group my-3">
              <label htmlFor="description">Descripción</label>
              <textarea name="descriptionInput"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text" className="form-control" id="descriptionInput" rows="4"></textarea>
            </div>
            <div className="form-group my-3">
              <label htmlFor="state">Estado</label>
              <select className="form-control" name="stateInput" id="stateInput" defaultValue={state}
                value={state}
                onChange={(e) => setState(e.target.value)}>
                <option>Libre</option>
                <option>No disponible</option>
              </select>
            </div>
            <div className="form-group my-3">
              <label htmlFor="direction">Direcci&oacute;n</label>
              <div className="input-group">
                <input name="directionInput"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  type="text" className="form-control" id="directionInput"></input>
                <a className="btn btn-primary" onClick={getDirCoordenates}>Buscar</a>
              </div>
            </div>
            <div>
              <MapContainer id='map' center={center} zoom={13} >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
              </MapContainer>
            </div>
            <div className="form-group my-3">
              <label htmlFor="image" className='mb-2'>Añadir imágenes</label><br />
              <input accept="image/*" class="form-control" type="file" id="imagen-edit" multiple onChange={
                (e) => {
                  addFiles(e.target.files);
                }
              } />
              <img name="img-photo-edit" id="img-photo-edit" className="align-self-center m-3" alt="" src={src} />
              <br />
            </div>
            <div className='d-flex justify-content-end'>
              {cargando ? <p>Cargando...</p> : <p> </p>}
              <button type="submit" disabled={!done} className="btn btn-primary">Crear vivienda</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );

};

export default CreateHouse;