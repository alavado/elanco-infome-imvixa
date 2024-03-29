import { InlineIcon } from '@iconify/react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarComentarioAlimento } from '../../../../redux/ducks/comentarios'
import Comentario from './Comentario'
import salmones from '../../../../assets/images/varios-salmones.png'
import './Comentarios.css'
import { guardarComentariosLote } from '../../../../redux/ducks/reporteAlimento'
import { generalTexts } from '../generalTexts'
import { comentarioAltoCumpEng, comentarioAltoCumplimiento, comentarioBajoCumplimiento, comentariosBajoCumEng } from '../../../../constants'

const Comentarios = ({ indice, language }) => {

  const [nuevoComentario, setNuevoComentario] = useState('')
  const [agregandoComentario, setAgregandoComentario] = useState(false)
  const { comentariosAlimento, preViz } = useSelector(state => state.comentarios)
  let comentarios = []
  if (comentariosAlimento[indice]) {
    if (language === 'es') {
      comentarios = comentariosAlimento[indice].map(v => v.replace(comentariosBajoCumEng, comentarioBajoCumplimiento).replace(comentarioAltoCumpEng, comentarioAltoCumplimiento))
    } else {
      comentarios = comentariosAlimento[indice].map(v => v.replace(comentarioBajoCumplimiento, comentariosBajoCumEng).replace(comentarioAltoCumplimiento, comentarioAltoCumpEng))
    }
  }
  // const comentarios = comentariosAlimento[indice] || [];
  const textareaRef = useRef()
  const dispatch = useDispatch()

  const comentariosTexto = comentarios.join('-')

  useEffect(() => {
    // Si es un nuevo reporte, guardar los comentairos en la informacion del lote
    if (!preViz) {
      dispatch(guardarComentariosLote({comentarios, index: indice}))
    }
  }, [comentariosTexto])

  const comentar = e => {
    e.preventDefault()
    if (nuevoComentario === '') {
      return
    }
    nuevoComentario.split('\n').filter(c => c).forEach(c => dispatch(agregarComentarioAlimento({texto: c, indice: indice})))
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
  const titulo = generalTexts.gt_Comentarios[language]
  return (
    <div className="Comentarios">
      {hayComentarios && (
        <h3 className="Reporte__titulo_seccion">
          {titulo}
        </h3>
      )}
      <ul className="Comentarios__contenedor_comentarios">
        {comentarios.map((c, i) => <Comentario key={`comentario-${i}`} texto={c} indice={indice} />)}
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