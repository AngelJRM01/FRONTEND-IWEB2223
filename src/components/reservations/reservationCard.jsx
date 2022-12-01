import { useEffect } from 'react';
import { setUpReservations } from '../../helper/SetUpReservations';
import casaImg from '../../static/casa.png';
import Card from 'react-bootstrap/Card';
import '../../styles/main.css'; 

export const ReservationCard = ({ reservation }) => {

  
  function dateParts(date) {
    var part = date.split('T');
    var parts =part[0].split('-');
    
    return parts[2]+"/"+parts[1]+"/"+parts[0];
  }

  return (
            
                <div key={reservation._id} className='px-2 col-lg-12'>
                    
                    <Card>
                        <div className='row pl-2' style={{minHeight: '220px'}}>

                            <div className='col-sm-7'>
                                <Card.Body className='mx-2'>
                                    <Card.Title><h2>{reservation.vivienda.titulo}</h2></Card.Title>
                                    <Card.Subtitle>{reservation.vivienda.direccion}</Card.Subtitle>
                                    <br/>
                                    <Card.Text>
                                        <span style={{fontSize: '20px'}}>Fecha: {reservation.estancia.fechaInicio !== undefined ? dateParts(reservation.estancia.fechaInicio) : ""} - {reservation.estancia.fechaFin !== undefined ? dateParts(reservation.estancia.fechaFin) : ""}</span>
                                    </Card.Text>
                                    <br/>
                                </Card.Body>
                            </div>
                            <div className='col-sm-5'  style={{backgroundImage: "url(" +casaImg +")", backgroundRepeat: "no-repeat" , backgroundSize: "cover"}}>
                                {/* <Card.Img className='left-card-img' src={casaImg} /> */}
                            </div>

                        </div>
                        
                    </Card>
                </div>
               
  );
}




