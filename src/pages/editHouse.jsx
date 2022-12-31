import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const { idVivienda } = useParams();
  const [house, setHouse] = useState();
  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState('0');
  const [direction, setDirection] = useState('');
  const [price, setPrice] = useState('0');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('Libre');
  const [dates, setDates] = useState([]);
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [src, setSrc] = useState([]);
  let aux = [];
  const [done, setDone] = useState(true);
  const [cargando, setCargando] = useState(false);

  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}viviendas/` + idVivienda;

  useEffect(() => {

    setUpHouse(idVivienda, setHouse);

    document.title = 'Editar vivienda';

  }, [idVivienda]);

  useEffect(() => {

    if (house !== undefined) {
      setTitle(house.titulo);
      setCapacity(house.capacidad);
      setDirection(house.direccion);
      setPrice(house.precioNoche);
      setDescription(house.descripcion);
      setState(house.estado);
      setImages(house.imagenes);
      setDates(house.fechasNoDisponibles);
    }

  }, [house])

  async function addFiles(files) {
    aux = [];
    setSrc([]);
    setDone(false);
    setCargando(true);
    let cnt = 0;

    const accessToken = await getAccessTokenSilently();
    for (let i = 0; i < files.length; i++) {
      console.log(files[i])
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
        });
    }
    setSrc(aux);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let puedeReservar = comprobarReserva();
    let fechas = dates;

    if (puedeReservar || !startDate) {
      const fI = new Date(startDate);
      const fechaInicio = fI.toISOString();
      const fF = new Date(endDate);
      const fechaFin = fF.toISOString();
      const estancia = { fechaInicio: fechaInicio, fechaFinal: fechaFin };

      fechas.push(estancia);

      const vivienda = {
        titulo: title,
        capacidad: capacity,
        precioNoche: price,
        descripcion: description,
        estado: state,
        fechasNoDisponibles: fechas,
        imagenes: images,
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
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(vivienda),
      }).then(res => res.json())
        .then(data => {
          console.log(data)
        }).catch(err => console.log(err));

      navigate(`/vivienda/${idVivienda}`)
    }
  }

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
    };

    let imagenes = vivienda.imagenes;
    imagenes = imagenes.filter((imagen) => imagen !== image);
    vivienda.imagenes = imagenes;

    const accessToken = await getAccessTokenSilently();
    fetch(URI, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(vivienda),
    }).then(res => res.json())
      .then(data => {
        console.log(data)
      }).catch(err => console.log(err));

    window.location.reload();
  }

  const now = Date.now();
  const today = new Date(now);
  const [error, setError] = useState("")

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  function daysDisable() {
    const days = [];

    if (dates !== undefined) {
      if (dates.length > 0) {
        dates.forEach(fecha => {
          const fechaInicio = new Date(fecha.fechaInicio)
          const fechaFin = new Date(fecha.fechaFinal)

          days.push(fechaInicio)
          days.push(fechaFin)

          let resta = fechaFin.getTime() - fechaInicio.getTime()

          for (let i = 1; i <= Math.round(resta / (1000 * 60 * 60 * 24)); i++) {
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

    for (let i = 1; i <= Math.round(resta / (1000 * 60 * 60 * 24)); i++) {
      days.push(new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() + i))
    }

    let puedeReservar = true

    const days2 = daysDisable()
    days2.forEach(day2 => {

      let Day2 = new Date(day2)
      days.forEach(day => {

        let Day = new Date(day)
        if (Day.getDate() === Day2.getDate() && Day.getMonth() === Day2.getMonth() && Day.getFullYear() === Day2.getFullYear() && startDate) {
          setError("Hay un día que no está disponible entre los que ha elegido");
          puedeReservar = false;
        }

      })

    })

    return puedeReservar
  }

  return (
    <div>
      <Header />
      <main className="row justify-content-center main"
        id="main-content">
        <div className="col-10 col-lg-8 list-group"
          data-bs-spy="scroll">
          <h1 align="center">Editar vivienda</h1>
          <form className="form" id="form" onSubmit={handleSubmit} method="post">
            <div className="form-group my-3">
              <label htmlFor="title">T&iacute;tulo</label>
              <input name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" className="form-control" id="title"></input>
            </div>
            <div className="form-group my-3">
              <label htmlFor="capacity">Capacidad</label>
              <input name="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                type="number" className="form-control" id="capacity"></input>
            </div>
            <div className="form-group my-3">
              <label htmlFor="price">Precio por noche (€)</label>
              <input name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number" className="form-control" id="price"></input>
            </div>
            <div className="form-group my-3">
              <label htmlFor="description">Descripción</label>
              <textarea name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text" className="form-control" id="description" rows="4"></textarea>
            </div>
            <div className="form-group my-3">
              <label htmlFor="state">Estado</label>
              <select className="form-select" id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}>
                <option defaultValue>Libre</option>
                <option>Ocupado</option>
                <option>No disponible</option>
              </select>
            </div>
            <p>Fechas en las que tus clientes no podrán reservar</p>
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
              <label htmlFor="image" className='mb-2'>Añadir imagen</label><br />
              <input accept="image/*" className="form-control" type="file" id="imagen-edit" multiple onChange={
                (e) => {
                  addFiles(e.target.files);
                }
              } />
              <img name="img-photo-edit" id="img-photo-edit" className="align-self-center m-3" alt="" src={src} />
            </div>
            <div>
              <Carousel className="croppedpx hijoInlineBlock marginRight100px marginBottom30px">
                {
                  images.map((imagen, index) => {
                    return <Carousel.Item key={index}>
                      <div className="croppedpx padreCentrar">
                        <img
                          className="card-img-top rounded-2 hijoCentrar"
                          src={imagen}
                          alt="Imagen de la casa"
                          id='img' />
                      </div>
                      <button className='btn btn-danger' onClick={(e) => deleteImage(e, imagen)}>Borrar Imagen</button>
                    </Carousel.Item>
                  })
                }
              </Carousel>
            </div>
            <div className='d-flex justify-content-end'>
              {cargando ? <p className='my-1 me-3'>Cargando...</p> : <p></p>}
              <button type="submit" disabled={!done} className="btn btn-primary">Actualizar</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );

};

export default EditHouse;