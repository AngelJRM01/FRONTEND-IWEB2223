import React, { useState, useEffect } from 'react';
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { HouseList } from '../components/home/houseList';
import { setUpHome } from '../helper/setUpHome';

const Home = () => {

    const [filter, setFilter] = useState({
        value: 0,
        type: ""
    });

    const [houses, setHouses] = useState([]);

    useEffect(() => {

        setUpHome(filter, setHouses);

    }, [filter]);

    const margin = {
        'marginTop': '10em',
        'marginBottom': '7em'
    }

    return (

        <div>
            <Header setFilter={setFilter} />

            <main className='container-fluid mx-0' style={margin}>
                <HouseList houses={houses} />
            </main>

            <Footer />
        </div>

    );
}

export default Home;
