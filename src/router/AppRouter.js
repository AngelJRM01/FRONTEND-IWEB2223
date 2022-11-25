import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Houses from '../pages/listHouses';
import CreateHouse from '../pages/createHouse';
// import EditHouse from '../pages/editHouse';

function AppRouter() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="viviendas/propietario/:id"
              element={<Houses/>}/>
            <Route path="viviendas/propietario/:id/nuevaVivienda"
              element={<CreateHouse/>}/>
            {/* <Route path="viviendas/propietario/:id/vivienda/:idVivienda/edit"
              element={<EditHouse/>}/> */}
          </Routes>
        </BrowserRouter>
      
    );
  }

  export default AppRouter;