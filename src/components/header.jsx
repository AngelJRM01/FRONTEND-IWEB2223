import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Filter } from './home/houseFilter';

import logo from '../static/swishHouseLogo.png';

export const Header = ({ setFilter = 0 }) => {

  const backgroud = {
    background: '#f5f5f5'
  }

  return (

    <header className="fixed-top col-12 d-flex flex-wrap align-items-center justify-content-between py-3 border-bottom"
      style={backgroud}>

      <a href="/home" className="col-4 col-sm-3 d-flex align-items-center ps-4 mb-0 text-dark text-decoration-none">
        <img src={logo}
          width="50px"
          height="50px"
          alt="Logo de SwishHouse" >
        </img>
      </a>

      <ul className="nav d-none d-sm-flex col-6 mb-0 justify-content-center">
        <li><a href="/home" className="nav-link px-2 link-secondary">Inicio</a></li>
        <li><a href="/viviendas/propietario/636a2eba353e6b6d0e281d7a" className="nav-link px-2 link-dark">Mis Viviendas</a></li>
        <li><a href="/reservas/usuario/636a2ebb353e6b6d0e281d9c" className="nav-link px-2 link-dark">Mis Reservas</a></li>
      </ul>

      <Dropdown className='d-sm-none col-4 d-flex justify-content-center'>
        <Dropdown.Toggle variant="" id="dropdown-basic">
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/home">Inicio</Dropdown.Item>
          <Dropdown.Item href="/viviendas/propietario/636a2eba353e6b6d0e281d7a">Mis Viviendas</Dropdown.Item>
          <Dropdown.Item href="/reservas/usuario/636a2ebb353e6b6d0e281d9c">Mis Reservas</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="col-4 col-sm-3 pe-4 text-end">
        <button type="button" className="btn btn-outline-primary">Acceder</button>
      </div>

      {setFilter ? <Filter setFilter={setFilter} /> : <div className='col-12'></div>}

    </header>

  );

};
