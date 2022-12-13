import Card from 'react-bootstrap/Card';
import '../../styles/main.css'; 

export const ReservationCard = ({ reservation }) => {

  
  function dateParts(date) {
    date = new Date(date);
   
    return date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  }

  return (
            
                <div className='px-2 col-lg-12'>
                    
                    <Card>
                        <div className='row pl-2' style={{minHeight: '220px'}}>

                            <div className='col-sm-7'>
                                <Card.Body className='mx-2'>
                                    <Card.Title><h2>{reservation.vivienda.titulo}</h2></Card.Title>
                                    <Card.Subtitle>{reservation.vivienda.direccion}</Card.Subtitle>
                                    <br/>
                                    <Card.Text>
                                        <span style={{fontSize: '20px'}}>Fecha: {reservation.estancia.fechaInicio !== undefined ? dateParts(reservation.estancia.fechaInicio) : ""} - {reservation.estancia.fechaFinal !== undefined ? dateParts(reservation.estancia.fechaFinal) : ""}</span>
                                    </Card.Text>
                                    <br/>
                                    <a href={"/reservas/" + reservation._id} className="stretched-link"> </a> 
                                </Card.Body>
                            </div>
                            <div className='col-sm-5'  style={{backgroundImage: "url(" +reservation.vivienda.imagenes[0] +")", backgroundRepeat: "no-repeat" , backgroundSize: "cover",  borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}>
                                {/* <Card.Img className='left-card-img' src={casaImg} /> */}
                            </div>

                        </div>
                        
                    </Card>
                </div>
               
  );
}




