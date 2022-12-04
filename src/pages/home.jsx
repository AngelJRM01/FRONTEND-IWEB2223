import React, { useState, useEffect } from 'react';
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { HouseList } from '../components/home/houseList';
import { HouseMap } from '../components/home/houseMap';
import { setUpHome } from '../helper/setUpHome';
import '../styles/button.css'

const Home = () => {

    const [filter, setFilter] = useState({
        value: 0,
        type: ""
    });

    const [houses, setHouses] = useState([]);
    const [map, setMap] = useState(false);

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

                <button type="button" class="btn btn-primary float" onClick={() => { setMap(!map) }}>
                    {map ? <i class="fas fa-list"></i> : <i class="fas fa-map"></i>}
                </button>

                {map ? <HouseMap houses={houses} /> : <HouseList houses={houses} />}

            </main>

            <Footer />
        </div>

    );
}

export default Home;
