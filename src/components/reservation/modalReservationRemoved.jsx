import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../../styles/reservation.module.css';

const ModalReservationRemoved = ({setShowModal, showModal}) => {
  const handleClose = () => setShowModal(false);

  return (
      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header className={styles.modalCentered}>
          <Modal.Title>¡La reserva se ha cancelado con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Footer className={styles.modalCentered}>
            <a href='http://localhost:3000/'>
                <Button variant="primary" onClick={handleClose}>
                    Ir a la página de inicio
                </Button>
            </a>
        </Modal.Footer>
      </Modal>
  );
};

export default ModalReservationRemoved;