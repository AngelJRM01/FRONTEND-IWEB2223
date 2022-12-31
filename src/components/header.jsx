import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth0 } from "@auth0/auth0-react";
import { getId } from '../helper/userId.js';
import logo from '../static/swishHouseLogo.png';
import { ModalFilter } from './home/houseModalFilter';

export const Header = ({ setFilter = 0 }) => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const backgroud = {
    background: '#f5f5f5'
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };
  const urlViviendas = '/viviendas/propietario/' + ((user === undefined) ? '636a2ebb353e6b6d0e281d9c' : getId(user.sub));
  const urlReservas = '/reservas/usuario/' + ((user === undefined) ? '636a2ebb353e6b6d0e281d9c' : getId(user.sub));
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
        <li><a href="/home" className="nav-link px-2 link-dark">Inicio</a></li>
        <li><a href={urlViviendas} className="nav-link px-2 link-dark">Mis Viviendas</a></li>
        <li><a href={urlReservas} className="nav-link px-2 link-dark">Mis Reservas</a></li>
      </ul>

      <Dropdown className='d-sm-none col-4 d-flex justify-content-center'>
        <Dropdown.Toggle variant="" id="dropdown-basic">
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/home">Inicio</Dropdown.Item>
          <Dropdown.Item href={urlViviendas}>Mis Viviendas</Dropdown.Item>
          <Dropdown.Item href={urlReservas}>Mis Reservas</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="col-4 col-sm-3 pe-4 text-end">

        {!isAuthenticated ? 
          <button type="button" className="btn btn-outline-primary" onClick={handleLogin}><i className="fa-solid fa-right-to-bracket"></i> Acceder</button> :
          <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión</button>
        }
      </div>

      {setFilter ? <ModalFilter setFilter={setFilter}></ModalFilter> : <div className='col-12'></div>}

    </header>

  );

};
