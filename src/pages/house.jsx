import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setUpHouse } from "../helper/SetUpHouse";

const House = () => {

    const { id } = useParams();
    const [ house, setHouse ] = useState();

    useEffect( () => {

        setUpHouse(id, setHouse);

    }, [id])

    useEffect( () => {
        
        if(house !== undefined){
            document.title = house.titulo
        }

    }, [house])

    return(
        <div>
            <Header/>
            <Footer/>
        </div>
    )

}

export default House