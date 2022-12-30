import React, { useState, useEffect } from 'react';
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { HouseList } from '../components/home/houseList';
import { HouseMap } from '../components/home/houseMap';
import { setUpHome } from '../helper/setUpHome';
import '../styles/button.css'
import '../styles/map.css'

const Home = () => {

    document.title = 'Inicio'

    const [filter, setFilter] = useState({});

    const [houses, setHouses] = useState([]);
    const [map, setMap] = useState(false);

    useEffect(() => {

        setUpHome(filter, setHouses);

    }, [filter]);

    const margin = {
        'marginTop': '8em',
        'marginBottom': (map ? '0em' : '7em')
    }

    return (

        <div>
            <Header setFilter={setFilter} />

            <main className='container-fluid px-0' style={margin}>

                {map ? <HouseMap houses={houses} /> : <HouseList houses={houses} />}

                <button type="button" className="btn btn-primary float" onClick={() => { setMap(!map) }}>
                    {map ? <i className="fas fa-list"></i> : <i className="fas fa-map"></i>}
                </button>

            </main>

            <Footer />
        </div>

    );
}

export default Home;
