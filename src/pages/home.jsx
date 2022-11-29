import React from 'react';
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { HouseList } from '../components/home/houseList';

import casa from '../static/casa.png';
import casa2 from '../static/casa2.png';

const Home = () => {

    const margin = {
        'margin-top': '7em',
        'margin-bottom': '45em'
    }

    const house = {
        title: "Titulo de la vivienda",
        img: casa,
        rating: 5,
        address: "Calle Nº, Ciudad",
        capacity: 12,
        price: 100,
        link: 'http://localhost:3000/home'
    }

    const house2 = {
        title: "Titulo de la vivienda",
        img: casa2,
        rating: 5,
        address: "Calle Nº, Ciudad",
        capacity: 12,
        price: 100,
        link: 'http://localhost:3000/home'
    }

    return (

        <div>
            <Header />

            <main className='container-fluid mx-0' style={margin}>
                <HouseList houses={[house, house, house2, house, house, house2, house, house2, house, house2, house, house, house2, house2, house]} />
            </main>

            <Footer />
        </div>

    );
}

export default Home;
