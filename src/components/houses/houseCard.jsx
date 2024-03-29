import Card from 'react-bootstrap/Card';

export const HouseCard = ({ house }) => {


  return (
    
    <div className='px-2 col-lg-3'>
      <Card className="p-0" >
        <Card.Img  variant="top" src={house.imagenes[0]} />
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
  );


}