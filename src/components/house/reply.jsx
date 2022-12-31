import '../../styles/house.css'
import '../../styles/texto.css'
import { Global } from '../../helper/Global';
import { useAuth0 } from "@auth0/auth0-react";

const Reply = ({respuesta, user, house, comentario}) => {

    const { getAccessTokenSilently } = useAuth0();
    const baseUrl = Global.baseUrl
    const URIVivienda = `${baseUrl}viviendas/` + house._id

    function fechaComentario(){
        const fecha = new Date(respuesta.fecha)
        return (fecha.getDate() +"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear())
    }

    async function votarLike(){
        let respuestasAux = []

        comentario.respuestas.forEach((r) => {
            if(r === respuesta){
                respuesta.likes.push(user.name)
                if(respuesta.dislikes.includes(user.name)){
                    let dislikesAux = []
                    respuesta.dislikes.forEach((d) => {
                        if(d !== user.name){
                            dislikesAux.push(d)
                        }
                    })
                    respuesta.dislikes = dislikesAux
                }
                respuestasAux.push(respuesta)
            } else {
                respuestasAux.push(r)
            }
        })

        comentario.respuestas = respuestasAux

        let comentariosAux = []

        house.comentarios.forEach((c) => {
            if(c._id === comentario._id){
                comentariosAux.push(comentario)
            } else {
                comentariosAux.push(c)
            }
        })     

        house.comentarios = comentariosAux

        const accessToken = await getAccessTokenSilently();
        await fetch(URIVivienda, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(house)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err));

        window.location.reload()
    }


    async function votarDislike(){
        let respuestasAux = []

        comentario.respuestas.forEach((r) => {
            if(r === respuesta){
                respuesta.dislikes.push(user.name)
                if(respuesta.likes.includes(user.name)){
                    let likesAux = []
                    respuesta.likes.forEach((d) => {
                        if(d !== user.name){
                            likesAux.push(d)
                        }
                    })
                    respuesta.likes = likesAux
                }
                respuestasAux.push(respuesta)
            } else {
                respuestasAux.push(r)
            }
        })

        comentario.respuestas = respuestasAux

        let comentariosAux = []

        house.comentarios.forEach((c) => {
            if(c._id === comentario._id){
                comentariosAux.push(comentario)
            } else {
                comentariosAux.push(c)
            }
        })     

        house.comentarios = comentariosAux

        const accessToken = await getAccessTokenSilently();
        await fetch(URIVivienda, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(house)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err));

        window.location.reload()
    }

    return (
        <div>
            <p><img className="imagenComments" alt={`Imagen de ${respuesta.usuario}`} src={respuesta.imagenUsuario}/> <b className='mx-2'>{respuesta.usuario}</b> <small>{fechaComentario()}</small></p>
            <div className="row px-5"><p className='breakSpaces'>{respuesta.mensaje}</p></div>
            <button onClick={votarLike} disabled={respuesta.likes.includes(user.name)} className={respuesta.likes.includes(user.name) ? 'votado' : 'like'}><i className="fa-solid fa-thumbs-up"></i> {respuesta.likes.length}</button>
            <button onClick={votarDislike} disabled={respuesta.dislikes.includes(user.name)} className={respuesta.dislikes.includes(user.name) ? 'votado mx-2' : 'dislike mx-2'}><i className="fa-sharp fa-solid fa-thumbs-down"></i> {respuesta.dislikes.length}</button>
            <hr/>
        </div>
    )
}

export default Reply