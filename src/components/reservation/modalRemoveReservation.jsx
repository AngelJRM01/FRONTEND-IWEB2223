import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../../styles/reservation.module.css';

const ModalRemoveReservation = ({id, setShowModal, showModal, modalShow2}) => {
  const handleClose = () => setShowModal(false);

  const cancelReservation = () => {
    handleClose();
    modalShow2();
  };

  return (
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header className={styles.modalCentered}>
          <Modal.Title>¿Estás seguro de que quieres cancelar tu reserva?</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalTextCentered}>Al hacerlo, no podrás revertir los cambios y el pago ya realizado no será reembolsado.</Modal.Body>
        <Modal.Footer className={styles.modalCentered}>
          <Button variant="secondary" onClick={handleClose}>
            Volver atrás
          </Button>
          <Button variant="primary" className='btn btn-danger' onClick={cancelReservation}>
            Cancelar reserva
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default ModalRemoveReservation;