import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from "react";

const ModalNewReservation = ({house, setShowNewReservationModal, showNewReservationModal}) => {

    const modalClose = () => setShowNewReservationModal(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
    const today = new Date()

    function daysDisable() {
        const days = []

        if(house.fechasNoDisponibles !== undefined){

            if(house.fechasNoDisponibles.length > 0){

                house.fechasNoDisponibles.forEach(fecha => {

                    const fechaInicio = new Date(fecha.fechaInicio)
                    const fechaFin = new Date(fecha.fechaFin)

                    days.push(fechaInicio)
                    days.push(fechaFin)
        
                    let resta = fechaFin.getTime() - fechaInicio.getTime()
        
                    for(let i = 1; i <= Math.round(resta/ (1000*60*60*24)); i++){
                        days.push(new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() + i))
                    }
        
                })

            }

        }        

        return days
    }

    return (
        <Modal
            show={showNewReservationModal}
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
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={today}
                    maxDate={new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())}
                    excludeDates={daysDisable()}
                    selectsRange
                    selectsDisabledDaysInRange
                    inline
                />
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" className="btn btn-outline-primary" onClick={modalClose}>Confirmar Reserva</button>
                <button variant="primary" className="btn btn-outline-secondary" onClick={modalClose}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalNewReservation