import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Houses from '../pages/listHouses';
import CreateHouse from '../pages/createHouse';
import Home from '../pages/home';
import EditHouse from '../pages/editHouse';
import House from '../pages/house';
import Reservation from '../pages/reservation';
import Reservations from '../pages/listReservations';
import CallbackPage from "../pages/callback.jsx";
import Profile from '../pages/profile';

import { Oval } from 'react-loader-spinner'
import { Auth0ProviderWithHistory } from "../helper/auth0-provider-with-history";
import { useAuth0 } from "@auth0/auth0-react";

function AppRouter() {
  const MainApp = () => {
    const { isLoading } = useAuth0();

    return (
      <div className='mainApp'>
        {isLoading ?
          <div className="d-flex justify-content-center mt-5 pt-5">
            <Oval
              height={100}
              width={100}
              color="#0275d8"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#0275d8"
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          </div> :

          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="viviendas/propietario/:id"
              element={<Houses />} />
            <Route path="viviendas/propietario/:id/nuevaVivienda"
              element={<CreateHouse />} />
            <Route path='/home'
              element={<Home />} />
            <Route path="viviendas/propietario/:id/vivienda/:idVivienda/edit"
              element={<EditHouse />} />
            <Route path='vivienda/:id'
              element={<House />} />
            <Route path='reservas/:id' element={<Reservation />} />
            <Route path='reservas/usuario/:userId' element={<Reservations />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path='profile' element={<Profile />} />
          </Routes>

        }
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <MainApp />
      </Auth0ProviderWithHistory>
    </BrowserRouter>

  );
}

export default AppRouter;