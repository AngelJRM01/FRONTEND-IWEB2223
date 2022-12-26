import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import '../../styles/texto.css';


const ModalNewReservation = ({house, setShowNewReservationModal, showNewReservationModal, modalConfirmationReservationModal, startDate, setStartDate, endDate, setEndDate, valueCapacity, setValueCapacity}) => {
   

    const modalClose = () => setShowNewReservationModal(false);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
    const today = new Date()

    const [error, setError] = useState("")
    const capacity = () => {
        const capacities = []

        if(house !== undefined){
            for(let i = 1; i <= house.capacidad; i++){
                capacities.push({"value": i, "label": i})
            }
        }

        return capacities
    }

    const options = capacity()

    function daysDisable() {
        const days = []

        if(house.fechasNoDisponibles !== undefined){

            if(house.fechasNoDisponibles.length > 0){

                house.fechasNoDisponibles.forEach(fecha => {

                    const fechaInicio = new Date(fecha.fechaInicio)
                    const fechaFin = new Date(fecha.fechaFinal)

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

    function comprobarReserva() {

        const days = []

        const fechaInicio = new Date(startDate)
        const fechaFin = new Date(endDate)

        days.push(fechaInicio)
        days.push(fechaFin)
        
        let resta = fechaFin.getTime() - fechaInicio.getTime()
        
        for(let i = 1; i <= Math.round(resta/ (1000*60*60*24)); i++){
            days.push(new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() + i))
        }

        let puedeReservar = true

        const days2 = daysDisable()
        days2.forEach(day2 => {

            let Day2 = new Date(day2)
            days.forEach(day => {

                let Day = new Date(day)
                if(Day.getDate() === Day2.getDate() && Day.getMonth() === Day2.getMonth() && Day.getFullYear() === Day2.getFullYear()){
                    setError("Hay un día que no está disponible entre los que ha elegido")
                    puedeReservar = false
                }

            })

        })

        if(puedeReservar){
            modalClose()
            modalConfirmationReservationModal()
        }

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
                <h5 className="mb-4">Haz tu reserva:</h5>
                <h6>Selecciona la fecha de inicio y de fin</h6>
                <DatePicker
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
                <br/>
                <h6>Número de huéspedes: </h6>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={options[0]}
                    name="color"
                    options={options}
                    value={valueCapacity}
                    onChange={e => setValueCapacity(e)}
                />
                <br/>
                <h6>Cantidad a pagar: <strong>{Number(valueCapacity.value) * Number(house.precioNoche) * Math.max(Math.round((new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000*60*60*24)) + 1,1)}€</strong></h6>
                <br/>
                <h6 className="textRed">{error}</h6>
                
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" className="btn btn-outline-primary" onClick={comprobarReserva}>Confirmar Reserva</button>
                <button variant="primary" className="btn btn-outline-secondary" onClick={modalClose}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalNewReservation