import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpHouses } from '../helper/SetUpHouses.js';

 


const List = () => {

  const [houses, setHouses] = useState([]);
  const { id } = useParams();
 
  // const URI = `${baseUrl}contentsLists/`;

  useEffect( () => {

    setUpHouses( id, setHouses );

    document.title = 'Mis viviendas';

  }, [id]);


  return (
    houses.length === 0
      ? <div>{  }</div>
      : <div>
        <Header
        />
        <main className="row justify-content-center main"
          id="main-content">
          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
            {
              houses.map( house => (
                JSON.stringify(house)
              ))
            }
          </div>
        </main>
        <Footer/>
      </div>
  );

};

export default List;
