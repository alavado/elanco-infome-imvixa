import { InlineIcon } from '@iconify/react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarComentarioAlimento } from '../../../../redux/ducks/comentarios'
import Comentario from './Comentario'
import salmones from '../../../../assets/images/varios-salmones.png'
import './Comentarios.css'
import { guardarComentariosLote } from '../../../../redux/ducks/visualizadorReporteAlimento'

const Comentarios = ({ pagina }) => {

  const [nuevoComentario, setNuevoComentario] = useState('')
  const [agregandoComentario, setAgregandoComentario] = useState(false)
  const { comentariosAlimento } = useSelector(state => state.comentarios)
  const comentarios = comentariosAlimento[pagina] || [];
  const textareaRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(guardarComentariosLote({comentarios, index: pagina - 1}))
  }, [comentarios])
  

  const comentar = e => {
    e.preventDefault()
    if (nuevoComentario === '') {
      return
    }
    nuevoComentario.split('\n').filter(c => c).forEach(c => dispatch(agregarComentarioAlimento({texto: c, indice: pagina})))
    setNuevoComentario('')
    setAgregandoComentario(false)
  }
  useEffect(() => {
    if (agregandoComentario) {
      textareaRef.current?.focus()
    }
  }, [agregandoComentario])

  const hayComentarios = comentarios.length > 0
  const nPalabras = comentarios.reduce((acc, curr) => acc + curr.length, 0)
  return (
    <div className="Comentarios">
      {hayComentarios && (
        <h3 className="Reporte__titulo_seccion">
          Comentarios
        </h3>
      )}
      <ul className="Comentarios__contenedor_comentarios">
        {comentarios.map((c, i) => <Comentario key={`comentario-${i}`} texto={c} indice={pagina} />)}
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
      {
        (comentarios.length >= 1 && comentarios.length <= 2 && nPalabras < 300) 
        && <div className="Comentarios__Salmones_contenedor"><img src={salmones} className="Comentarios__Salmones_imagen" alt="imagen salmones"/></div>
      }
    </div>
  )
}

export default Comentarios