import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { ReservationCard } from '../reservations/reservationCard.jsx';

const ModalPanelConfiguracion = ({house, setShowModal, showModal, reservations}) => {

    const navigate = useNavigate();

    const modalClose = () => setShowModal(false);

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
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" 
                        className="btn btn-outline-primary" 
                        onClick={() => {
                            modalClose();
                            navigate(`/viviendas/propietario/${house.propietario._id}/vivienda/${house._id}/edit`)
                        }}>
                            Editar Vivienda
                </button>
                <button variant="primary" className="btn btn-outline-primary" onClick={modalClose}>Hacer Reserva</button>
                <button variant="primary" className="btn btn-outline-secondary" onClick={modalClose}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalPanelConfiguracion