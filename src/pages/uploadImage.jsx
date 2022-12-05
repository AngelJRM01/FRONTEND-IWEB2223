import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { setUpHouse } from "../helper/SetUpHouse"
import { uploadImage } from "../helper/uploadImage.js"
import { Global } from '../helper/Global';


const Images = () => {

    let src = ""
    const { id } = useParams();
    const [house, setHouse] = useState();
    const baseUrl = Global.baseUrl;
    const URI = `${baseUrl}viviendas/` + id;

    useEffect(() => {

        setUpHouse(id, setHouse)

    }, [id])

    const uploadImageInHouse = () => {

        let imagenes = house.imagenes
        imagenes.push(src)
        house.imagenes = imagenes

        fetch(URI, {
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

    }

    return (
        <div>
            <Header/>
            <h1>Enviar una imagen</h1>
            <br/>
            <br/>
            <input accept="image/*" type="file" id="imagen-edit" onChange={
                (e) => {
                    uploadImage(e.target.files)
                        .then((result) => {
                            src = result
                        })
                }
            }/>
            <img name="img-photo-edit" id="img-photo-edit" className="align-self-center m-3" alt="" src={src}/>
            <br/>
            <br/>
            <button className="btn btn-primary" name="editImagen" onClick={uploadImageInHouse}>Siguiente</button>
            <Footer/>
        </div>
    )
}

export default Images