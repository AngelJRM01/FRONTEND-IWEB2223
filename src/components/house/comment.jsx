import '../../styles/house.css'
import '../../styles/texto.css'
import { Global } from '../../helper/Global';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';

const Comment = ({comentario, user, house, comentarios}) => {

    const { getAccessTokenSilently } = useAuth0();
    const baseUrl = Global.baseUrl
    const URIVivienda = `${baseUrl}viviendas/` + house._id
    const [poderResponder, setPoderResponder] = useState(false)
    const [reply, setReply] = useState('')
    const [allRepliesToView, setAllRepliesToView] = useState(false)

    function fechaComentario(){
        const fecha = new Date(comentario.fecha)
        return (fecha.getDate() +"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear())
    }

    async function votarLike(){
        let comentariosAux = []

        comentarios.forEach((c) => {
            if(c === comentario){
                comentario.likes.push(user.name)
                if(comentario.dislikes.includes(user.name)){
                    let dislikesAux = []
                    comentario.dislikes.forEach((d) => {
                        if(d !== user.name){
                            dislikesAux.push(d)
                        }
                    })
                    comentario.dislikes = dislikesAux
                }
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
        let comentariosAux = []

        comentarios.forEach((c) => {
            if(c === comentario){
                comentario.dislikes.push(user.name)
                if(comentario.likes.includes(user.name)){
                    let likesAux = []
                    comentario.likes.forEach((d) => {
                        if(d !== user.name){
                            likesAux.push(d)
                        }
                    })
                    comentario.likes = likesAux
                }
                comentariosAux.push(comentario)
            } else {
                comentariosAux.push(c)
            }
        })

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

    async function handleSubmit(){
        let respuesta = {
            vivienda: house._id,
            usuario: user.name,
            imagenUsuario: user.picture,
            likes: [],
            dislikes: [],
            mensaje: reply
        };

        let comentariosAux = []

        comentarios.forEach((c) => {
            if(c === comentario){
                comentario.respuestas.push(respuesta)
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
    }

    function addAllRepliesToView() {
        setAllRepliesToView(true)
    }

    return (
        <div>
            <p><img className="imagenComments" alt={`Imagen de ${comentario.usuario}`} src={comentario.imagenUsuario}/> <b className='mx-2'>{comentario.usuario}</b> <small>{fechaComentario()}</small></p>
            <div className="row px-5"><p className='breakSpaces'>{comentario.mensaje}</p></div>
            <button onClick={votarLike} disabled={comentario.likes.includes(user.name)} className={comentario.likes.includes(user.name) ? 'votado' : 'like'}><i className="fa-solid fa-thumbs-up"></i> {comentario.likes.length}</button>
            <button onClick={votarDislike} disabled={comentario.dislikes.includes(user.name)} className={comentario.dislikes.includes(user.name) ? 'votado mx-2' : 'dislike mx-2'}><i className="fa-sharp fa-solid fa-thumbs-down"></i> {comentario.dislikes.length}</button>
            <button onClick={() => setPoderResponder(!poderResponder)} className='btnViewMoreComments'>{poderResponder ? 'No responder' : 'Responder'}</button>
            <br/>
            {comentario.respuestas.length > 0 ?
                <div>
                    <button hidden={allRepliesToView} className="mt-3 btnViewMoreComments" onClick={addAllRepliesToView}><i className="fa-solid fa-caret-down"></i> Ver las respuestas</button>
                    {allRepliesToView ? 
                        <div>
                            
                        </div>
                        :
                        <div></div>
                    }
                </div>
                :
                <div></div>
            }

            <div hidden={!poderResponder}>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <label>Añade una respuesta</label>
                    <input type="text"
                        className="form-control mt-1"
                        value={reply}
                        onChange={e => setReply(e.target.value)}></input>
                    <button className="btn btn-primary mt-3" type="submit">Responder</button>
                </form>
            </div>
            <hr/>
        </div>
    )
}

export default Comment