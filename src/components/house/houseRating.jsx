import { useAuth0 } from '@auth0/auth0-react';
import { getId } from '../../helper/userId.js';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addHouseRate, getHouseRate, updateRating } from '../../helper/RateHouse';
import '../../styles/stars.css'

export const HouseRating = ({ house }) => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    const [rate, setRate] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        getHouseRate(house, getId(user.sub), setRate);
    }, [])

    const rateHouse = () => {
        addHouseRate(house, getId(user.sub), rate);
    }

    function Confirmation({ show, onHide }) {
        return (
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
                size="md"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Valorar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center'>
                    <p>
                        ¿Desea valorar esta vivivienda con {rate} estrellas?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-danger" onClick={() => {onHide(); setRate(0)}}>Cancelar</button>
                    <Button onClick={() => {onHide(); rateHouse()}}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div>
            <div id="rate" className='px-0'>

                <input type="radio"
                    id="star5"
                    name="rate"
                    value="5"
                    onClick={() => setModalShow(true)}
                    onChange={(e) => setRate(parseInt(e.target.value))}
                    checked={rate === 5} />
                <label htmlFor="star5"
                    id="start"
                    title="5 estrellas">5 estrellas</label>
                <input type="radio"
                    id="star4"
                    name="rate"
                    value="4"
                    onClick={() => setModalShow(true)}
                    onChange={(e) => setRate(parseInt(e.target.value))}
                    checked={rate === 4} />
                <label htmlFor="star4"
                    id="start"
                    title="4 estrellas">4 estrellas</label>
                <input type="radio"
                    id="star3"
                    name="rate"
                    value="3"
                    onClick={() => setModalShow(true)}
                    onChange={(e) => setRate(parseInt(e.target.value))}
                    checked={rate === 3} />
                <label htmlFor="star3"
                    id="start"
                    title="3 estrellas">3 estrellas</label>
                <input type="radio"
                    id="star2"
                    name="rate"
                    value="2"
                    onClick={() => setModalShow(true)}
                    onChange={(e) => setRate(parseInt(e.target.value))}
                    checked={rate === 2} />
                <label htmlFor="star2"
                    id="start"
                    title="2 estrellas">2 estrellas</label>
                <input type="radio"
                    id="star1"
                    name="rate"
                    value="1"
                    onClick={() => setModalShow(true)}
                    onChange={(e) => setRate(parseInt(e.target.value))}
                    checked={rate === 1} />
                <label htmlFor="star1"
                    id="start"
                    title="1 estrella">1 estrella</label>

            </div>

            <Confirmation
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>

    )
}