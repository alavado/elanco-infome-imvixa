import { InlineIcon } from '@iconify/react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarComentario } from '../../../redux/ducks/comentarios'
import Comentario from './Comentario'
import './Comentarios.css'
const { ipcRenderer } = window.require('electron')

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
    nuevoComentario.split('\n').filter(c => c).forEach(c => dispatch(agregarComentario(c)))
    setNuevoComentario('')
    setAgregandoComentario(false)
    ipcRenderer.send('hayComentarios')
  }

  useEffect(() => {
    if (comentarios.length === 0) {
      ipcRenderer.send('yaNoHayComentarios')
    }
  }, [comentarios])

  useEffect(() => {
    if (agregandoComentario) {
      textareaRef.current?.focus()
    }
  }, [agregandoComentario])

  const hayComentarios = comentarios.length > 0

  return (
    <div className="Comentarios">
      {hayComentarios && (
        <h3 className="Reporte__titulo_seccion">
          Comentarios
        </h3>
      )}
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
            <div className="Comentarios__acciones_formulario">
              <button
                className="Comentarios__boton_accion"
                type="submit"
                title="Agregar comentario"
              >
                <InlineIcon icon="mdi:comment-check" /> Agregar
              </button>
              <button
                className="Comentarios__boton_accion"
                type="button"
                onClick={() => setAgregandoComentario(false)}
                title="Cancelar"
              >
                <InlineIcon icon="mdi:close" /> Cancelar
              </button>
            </div>
          </form>
        : <button
            className="Comentarios__boton_agregar"
            onClick={() => setAgregandoComentario(true)}
          >
            <InlineIcon icon="mdi:comment-plus" />
            Agregar comentario
          </button>
      }
    </div>
  )
}

export default Comentarios