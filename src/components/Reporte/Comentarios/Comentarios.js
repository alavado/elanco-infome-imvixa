import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarComentario } from '../../../redux/ducks/comentarios'
import Comentario from './Comentario'
import './Comentarios.css'

const Comentarios = () => {

  const [nuevoComentario, setNuevoComentario] = useState('')
  const [agregandoComentario, setAgregandoComentario] = useState(false)
  const { comentarios } = useSelector(state => state.comentarios)
  const textareaRef = useRef()
  const dispatch = useDispatch()

  const comentar = e => {
    e.preventDefault()
    if (nuevoComentario === '') {
      return
    }
    nuevoComentario.split('\n').forEach(c => dispatch(agregarComentario(c)))
    setNuevoComentario('')
    setAgregandoComentario(false)
  }

  useEffect(() => {
    if (agregandoComentario) {
      textareaRef.current?.focus()
    }
  }, [agregandoComentario])

  return (
    <div className="Comentarios">
      <h3 className="Reporte__titulo_seccion">
        Comentarios
      </h3>
      <ul className="Comentarios__contenedor_comentarios">
        {comentarios.map((c, i) => <Comentario key={`comentario-${i}`} texto={c} />)}
      </ul>
      {agregandoComentario
        ? <form
            onSubmit={comentar}
            className="Comentarios__formulario"
          >
            <textarea
              value={nuevoComentario}
              onChange={e => setNuevoComentario(e.target.value)}
              className="Comentarios__textarea"
              ref={textareaRef}
            />
            <button type="submit">Agregar</button>
            <button type="button" onClick={() => setAgregandoComentario(false)}>Cancelar</button>
          </form>
        : <button
            className="Comentarios__boton_agregar"
            onClick={() => setAgregandoComentario(true)}
          >
            Agregar comentario
          </button>
      }
    </div>
  )
}

export default Comentarios