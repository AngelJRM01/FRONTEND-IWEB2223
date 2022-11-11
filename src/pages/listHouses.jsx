import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpHouses } from '../helper/SetUpHouses.js';
import Swal from 'sweetalert2';


import { Global } from '../helper/Global.js';

const List = () => {

  const [houses, setHouses] = useState([]);
  //const { id } = useParams();

  const baseUrl = Global.baseUrl;

  // const URI = `${baseUrl}contentsLists/`;

  useEffect( () => {

    setUpHouses( setHouses );

    document.title = 'Mis viviendas';


  }, []);


  return (
    houses.length === 0
      ? <div>{Swal.showLoading()}</div>
      : <div>
        <Header
          
        />
        <main className="row justify-content-center main"
          id="main-content">
          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
            { houses }
          </div>
        </main>
        <Footer/>
      </div>
  );

};

export default List;
