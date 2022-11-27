import React from 'react';

export const Footer = () => {

  return (

    <footer className="fixed-bottom py-1 d-flex flex-wrap justify-content-between align-items-center border-top">
      <p className="col-md-4 ms-4 mb-0 text-muted">© 2022 SwishHouse, Inc</p>

      <ul className="nav col-md-4 me-4 justify-content-end">
        <li className="nav-item"><a href="/home" className="nav-link px-2 text-muted">Inicio</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Acerca de</a></li>
      </ul>
    </footer>

  );

};
