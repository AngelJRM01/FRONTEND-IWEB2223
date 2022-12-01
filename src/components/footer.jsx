import React from 'react';

export const Footer = () => {

  const backgroud = {
    background: '#f5f5f5'
  }

  return (

    <footer className="fixed-bottom bg-light py-0 px-4 d-flex flex-wrap justify-content-between align-items-center border-top"
      style={backgroud}>
      <p className="col-md-4 ms-4 mb-0 text-muted">© 2022 SwishHouse, Inc</p>

      <ul className="nav col-md-4 me-4 justify-content-end">
        <li className="nav-item"><a href="/home" className="nav-link px-2 text-muted">Inicio</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Acerca de</a></li>
      </ul>
    </footer>

  );
};
