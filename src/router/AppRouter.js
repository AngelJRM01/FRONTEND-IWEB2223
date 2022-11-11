import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Houses from '../pages/listHouses';

function AppRouter() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/viviendas/:id"
              element={<Houses/>}/>
          </Routes>
        </BrowserRouter>
      
    );
  }

  export default AppRouter;