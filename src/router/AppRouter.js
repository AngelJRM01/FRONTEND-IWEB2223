import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Houses from '../pages/listHouses';
import CreateHouse from '../pages/createHouse';
import Home from '../pages/home';
import EditHouse from '../pages/editHouse';
import House from '../pages/house';
import Reservation from '../pages/reservation';
import Reservations from '../pages/listReservations';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="viviendas/propietario/:id"
          element={<Houses />} />
        <Route path="viviendas/propietario/:id/nuevaVivienda"
          element={<CreateHouse />} />
        <Route path='/home'
          element={<Home />} />
        <Route path="viviendas/propietario/:id/vivienda/:idVivienda/edit"
              element={<EditHouse/>}/>
        <Route  path='vivienda/:id'
                element={<House/>} />
        <Route  path='reservas/:id' element={<Reservation/>} />
        <Route  path='reservas/usuario/:userId' element={<Reservations/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default AppRouter;