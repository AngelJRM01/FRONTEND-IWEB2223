import React from 'react';

export const Footer = () => {

  return (
    <div className="container-fluid bg-light fixed-bottom mat-shadow tamañoFooter">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-1">
        <div className="col-md-4 d-flex align-items-center px-3">
          <span className="greytext"
            lang="en">© 2022 SwishHouses, Inc</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-3">
          <li className="nav-item"><a href="/"
            className="nav-link px-2 greytext"><span lang="es">Inicio</span></a></li>
          <li className="nav-item"><a href="#Contact"
            className="nav-link px-2 greytext"><span lang="es">Contacto</span></a></li>
          <li className="nav-item"><a href="#FAQs"
            className="nav-link px-2 greytext"><span lang="en">FAQs</span></a></li>
          <li className="nav-item"><a href="#About"
            className="nav-link px-2 greytext"><span lang="es">Acerca de</span></a></li>
        </ul>
      </footer>
    </div>
  );
};
