import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ReservationCard } from '../reservations/reservationCard.jsx';
import { Global } from '../../helper/Global';
import { useAuth0 } from "@auth0/auth0-react";
import { getId } from '../../helper/userId.js';

const ModalPanelConfiguracion = ({house, setShowModal, showModal, reservations, modalShowNewReservation}) => {

    const navigate = useNavigate();
    const [error, setError] = useState("")
    const { user, isAuthenticated, isLoading } = useAuth0();

    const modalClose = () => setShowModal(false);

    const baseUrl = Global.baseUrl;
    const URI = `${baseUrl}viviendas/${house._id}`;

    function handleDelete() {
        const id = house.propietario._id;
        
        // fetch( URI, {
        //   method: "DELETE",
        //   headers: {
        //     "Content-Type": "Application/json",
        //   },
        //   body: JSON.stringify(house),
        // }).then( res => res.json())
        //   .then( data => {
        //     console.log(data);
        //   }).catch(err => console.log(err));
    
        fetch(URI, {method: 'DELETE'});

        // navigate(`/viviendas/propietario/${owner._id}`);
        navigate(`/viviendas/propietario/${id}`);
        window.location.reload();
    }

    return (
        <Modal
            show={showModal}
            onHide={modalClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Panel de Configuración</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="mb-4">Lista de Reservas hechas por mis clientes:</h5>
                {reservations.map((reservation, index) => (
                <ReservationCard key={index}
                    reservation={ reservation }
                />
                ))}
                <br/>
                <h6 className="textRed">{error}</h6>
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" 
                        className="btn btn-outline-primary" 
                        onClick={() => {
                            console.log(user)
                            // user.given_name devuelve el nombre del usuario, mientras que user.name devuelve el nombre completo (nombre y apellidos)
                            if(isAuthenticated && house.propietario._id === getId(user.sub)){
                                modalClose();
                                navigate(`/viviendas/propietario/${house.propietario._id}/vivienda/${house._id}/edit`)
                            }else{
                                setError("No eres el propietario de esta vivienda, por lo que no puedes editarla.")
                            }
                            // modalClose();
                            // navigate(`/viviendas/propietario/${house.propietario._id}/vivienda/${house._id}/edit`)
                        }}>
                            Editar Vivienda
                </button>
                <button variant="primary" className="btn btn-outline-primary" 
                        onClick={() => {
                                            modalClose(); 
                                            modalShowNewReservation()
                                        }}>Hacer Reserva</button>
                <button variant="primary" className="btn btn-outline-danger" 
                        onClick={() => {
                            if(isAuthenticated && house.propietario._id === getId(user.sub)){
                                modalClose();
                                handleDelete();
                            }else{
                                setError("No eres el propietario de esta vivienda, por lo que no puedes borrarla.")
                            }
                            // modalClose();
                            // handleDelete();
                        }}>
                            Borrar Vivienda
                </button>
                <button variant="primary" className="btn btn-outline-secondary" onClick={modalClose}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalPanelConfiguracion