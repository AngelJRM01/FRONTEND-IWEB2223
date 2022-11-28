import React from 'react';
import logo from '../static/swishHouseLogo.png';

export const Header = () => {

  return (

    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-3 border-bottom">
      <a href="/home" className="d-flex align-items-center ms-4 col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src={logo}
          width="50px"
          height="50px"
          alt="Logo de SwishGames" >
        </img>
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/home" className="nav-link px-2 link-secondary">Inicio</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">Mis Viviendas</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">Mis Reservas</a></li>
      </ul>

      <div className="me-4 col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2">Login</button>
        <button type="button" className="btn btn-primary">Sign-up</button>
      </div>
    </header>

  );

};
