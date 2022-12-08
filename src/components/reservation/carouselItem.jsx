import styles from '../../styles/reservation.module.css';

import { Carousel } from "react-bootstrap";

const CarouselItem = (link, index) => {
    return(
        <Carousel.Item key={index}>
            <div>
                <img
                    className={styles.imgSize}
                    src={link}
                    alt="Imagen vivienda"/>
            </div>
        </Carousel.Item>
    );
};

export default CarouselItem;