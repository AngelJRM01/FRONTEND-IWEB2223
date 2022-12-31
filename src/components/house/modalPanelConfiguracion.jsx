import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ReservationCard } from '../reservations/reservationCard.jsx';
import { Global } from '../../helper/Global';
import { useAuth0 } from "@auth0/auth0-react";
import { getId } from '../../helper/userId.js';

const ModalPanelConfiguracion = ({ house, setShowModal, showModal, reservations, modalShowNewReservation }) => {

    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();

    const modalClose = () => setShowModal(false);

    const baseUrl = Global.baseUrl;
    const URI = `${baseUrl}viviendas/${house._id}`;

    async function handleDelete() {
        const id = house.propietario._id;

        const accessToken = await getAccessTokenSilently();
        fetch(URI, { method: 'DELETE', headers: { 'Authorization': `Bearer ${accessToken}` } });
        navigate(`/viviendas/propietario/${id}`);
        window.location.reload();
    }

    const handleLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: window.location.pathname,
          },
        });
      };

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
                <Modal.Title id="contained-modal-title-vcenter">Panel de Acciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(isAuthenticated && house.propietario._id === getId(user.sub)) ?
                    <div>
                        <div className="d-flex justify-content-center"><p className="fs-5">Lista de Reservas hechas por mis clientes</p></div>
                        {reservations.map((reservation, index) => (
                        <ReservationCard key={index}
                            reservation={reservation}
                        />
                        ))}
                    </div> :
                    <div className="d-flex justify-content-center"><p className="fs-5">Haz tu reserva en esta vivienda</p></div>}
                <br />
                <h6 className="textRed">{error}</h6>
            </Modal.Body>
            <Modal.Footer>

                {(isAuthenticated && house.propietario._id === getId(user.sub)) ?
                    <button variant="primary"
                        className="btn btn-outline-primary"
                        onClick={() => {
                            console.log(user)
                            if (isAuthenticated && house.propietario._id === getId(user.sub)) {
                                modalClose();
                                navigate(`/viviendas/propietario/${house.propietario._id}/vivienda/${house._id}/edit`)
                            } else {
                                setError("No eres el propietario de esta vivienda, por lo que no puedes editarla.")
                            }
                        }}>
                        Editar Vivienda
                    </button> : null}

                {((isAuthenticated && house.propietario._id !== getId(user.sub)) || !isAuthenticated) ?
                    <button variant="primary" className="btn btn-outline-primary"
                        onClick={() => {
                            modalClose();
                            if (isAuthenticated) {
                                modalShowNewReservation();
                            } else {
                                handleLogin();
                            }
                        }}>Hacer Reserva
                    </button>
                : null}
                {(isAuthenticated && house.propietario._id === getId(user.sub)) ?
                    <button variant="primary" className="btn btn-outline-danger"
                        onClick={() => {
                            if (isAuthenticated && house.propietario._id === getId(user.sub)) {
                                modalClose();
                                handleDelete();
                            } else {
                                setError("No eres el propietario de esta vivienda, por lo que no puedes borrarla.")
                            }
                        }}>
                        Borrar Vivienda
                    </button>
                    : null}

                <button variant="primary" className="btn btn-outline-secondary" onClick={modalClose}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalPanelConfiguracion