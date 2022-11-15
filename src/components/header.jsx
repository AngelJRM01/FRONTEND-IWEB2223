import React from 'react';
import logo from '../static/swishHouseLogo.png';
import { NavLink } from 'react-router-dom';


export const Header = ({ buscado, setBuscado }) => {


  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top mat-shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand"
          to="/">
          <img src={logo}
            width="50px"
            height="50px"
            alt="Logo de SwishGames" >
          </img>
        </NavLink>
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link"
                aria-current="page"
                to="/"><i className="fa-solid fa-gamepad"></i> Juegos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"
                to="/lists"><i className="fa-solid fa-rectangle-list"></i> Listas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"
                to="/users"><i className="fa-solid fa-users"></i> Usuarios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"
                to="/chat"><i className="fa-solid fa-comments"></i> Chats</NavLink>
            </li>
          </ul>
          <div
            className="d-flex m-2"
            id="div-buscar-juegos-header">
            <input className="form-control me-2"
              title="Buscar juego"
              id="input-buscar-juegos-header"
              type="search"
              name="titulo"
              placeholder="Buscar juego"
              aria-label="Search"
              value={buscado}
              onChange={ ( b ) => setBuscado( b.target.value ) }/>
          </div>

        </div>
      </div>
    </header>
  );

};

