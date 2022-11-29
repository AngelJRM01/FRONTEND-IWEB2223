import { useEffect } from 'react';
import { setUpHouses } from '../../helper/SetUpHouses';
import casaImg from '../../static/casa.png';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const HouseCards = ({ houses, setHouses, id }) => {

  useEffect( () => {

    setUpHouses( id, setHouses );

    document.title = 'Mis viviendas';

  }, [id,setHouses]);


  return (
    <div className="container">
      <div className="row gy-1 my-3">
        {houses.map(house => (
          <div key={house._id} className='px-2 col-sm-6 col-md-4'>
            <Card className="p-0" >
              <Card.Img  variant="top" src={casaImg} />
              <Card.Body>
                <Card.Title>{house.titulo}</Card.Title>
                <Card.Subtitle>{house.direccion}</Card.Subtitle>
                <Card.Text>
                  
                </Card.Text>
                <b>{house.precioNoche}€</b> noche
                <a href={"/vivienda/" + house._id} className="stretched-link"> </a> 
              </Card.Body>
            </Card>
          </div>
        ))}
        
      </div>
    </div>
  );


}