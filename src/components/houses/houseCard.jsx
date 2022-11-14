import { useEffect } from 'react';
import { setUpHouses } from '../../helper/SetUpHouses';
import casaImg from '../../static/casa.png';
import Card from 'react-bootstrap/Card';

export const HouseCards = ({ houses, setHouses, id }) => {

  useEffect( () => {

    setUpHouses( id, setHouses );

    document.title = 'Mis viviendas';

  }, [id,setHouses]);


  return (
    <div className="row">
      {houses.map(house => (
        <Card class="px-4" key={house._id} style={{ width: '18rem' }}>
          <Card.Img class="img-casa pt-2" variant="top" src={casaImg} />
          <Card.Body>
            <Card.Title>{house.titulo}</Card.Title>
            <Card.Text>
              {house.descripcion}
            </Card.Text>
            <a href="/viviendas/" class="stretched-link"> </a>
          </Card.Body>
        </Card>
      ))}
      
    </div>
  );


}