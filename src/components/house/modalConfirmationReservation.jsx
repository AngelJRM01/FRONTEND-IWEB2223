import { Modal } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import { Global } from '../../helper/Global';
import { useState } from "react";
import { setUpHouse } from "../../helper/SetUpHouse";


const ModalConfirmationReservation = ({house, confirmationReservationModal, setConfirmationReservationModal, startDate, endDate, valueCapacity, setStartDate, setEndDate, setValueCapacity, setHouse}) => {


    const modalClose = () => setConfirmationReservationModal(false);
    const doReservationModalClose = () => setDoReservationModal(false);
    const fechaInicio = new Date(startDate)
    const fechaFin = new Date(endDate)
    const baseUrl = Global.baseUrl
    const URIReservas = `${baseUrl}reservas/`
    const URIVivienda = `${baseUrl}viviendas/`+house._id
    const [ doReservationModal, setDoReservationModal ] = useState(false);

    function hacerReserva() {

        const reserva = {
            estancia: {
                fechaInicio: fechaInicio,
                fechaFinal: fechaFin
            },
            huesped: '636a2ebb353e6b6d0e281d9c',
            ocupantes: Number(valueCapacity.value),
            vivienda: {
                titulo: house.titulo,
                direccion: house.direccion,
                imagenes: house.imagenes,
                propietario: house.propietario,
                coordenadas: house.coordenadas,
                _id: house._id
            },
            precio: Number(valueCapacity.value) * Number(house.precioNoche) * Math.max(Math.round((new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000*60*60*24)) + 1,1),
            fecha: new Date()
        }

        fetch(URIReservas, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(reserva)})
            .then( res => res.json())
            .then( data => {
                    console.log(data)
                })
            .catch(err => console.log(err));

        const fechaNoDisponible = {
            fechaInicio: fechaInicio,
            fechaFinal: fechaFin
        }
            
        const fechasNoDisponibles = house.fechasNoDisponibles
        fechasNoDisponibles.push(fechaNoDisponible)

        house.fechasNoDisponibles = fechasNoDisponibles

        fetch(URIVivienda, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(house)})
            .then( res => res.json())
            .then( data => {
                    console.log(data)
                })
            .catch(err => console.log(err));

        modalClose()
        setDoReservationModal(true)
        setStartDate(null)
        setEndDate(null)
        setValueCapacity({value: 1, label: 1})
        setUpHouse(house._id, setHouse);

    }

    return (
        <div>
            <Modal
                show={confirmationReservationModal}
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
                    <h5 className="mb-4">Haz tu reserva:</h5>
                    <h6>Fecha inicio: <strong>{fechaInicio.getDate()}/{fechaInicio.getMonth()}/{fechaInicio.getFullYear()}</strong></h6>
                    <h6>Fecha fin: <strong>{fechaFin.getDate()}/{fechaFin.getMonth()}/{fechaFin.getFullYear()}</strong></h6>
                    <br/>
                    <h6>Número de huéspedes: <strong>{Number(valueCapacity.value)}</strong></h6>
                    <br/>
                    <h6>Cantidad a pagar: <strong>{Number(valueCapacity.value) * Number(house.precioNoche) * Math.max(Math.round((new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000*60*60*24)) + 1,1)}€</strong></h6>
                </Modal.Body>
                <Modal.Footer>
                    
                    <button variant="primary" className="btn btn-outline-primary" onClick={() => hacerReserva()}>Hacer Reserva</button>
                    <button variant="primary" className="btn btn-outline-secondary" onClick={modalClose}>Cerrar</button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={doReservationModal}
                onHide={doReservationModalClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Reserva hecha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="mb-4">Se ha realizado la reserva correctamente</h3>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="primary" className="btn btn-outline-secondary" onClick={doReservationModalClose}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default ModalConfirmationReservation