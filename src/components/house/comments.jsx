import '../../styles/house.css'

const Comments = ({comentario}) => {

    function fechaComentario(){
        const fecha = new Date(comentario.fecha)
        return (fecha.getDate() +"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear())
    }

    return (
        <div>
            {console.log(comentario.imagenUsuario)}
            <p><img className="imagenComments" alt={`Imagen de ${comentario.usuario}`} src={comentario.imagenUsuario}/> <b className='mx-2'>{comentario.usuario}</b> <small>{fechaComentario()}</small></p>
            <p>{comentario.mensaje}</p>
            <hr/>
        </div>
    )
}

export default Comments