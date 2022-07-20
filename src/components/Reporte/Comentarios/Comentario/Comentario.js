import './Comentario.css'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useState } from 'react'

const Comentario = ({ texto, eliminarComentario }) => {

  const dispatch = useDispatch()
  const [tacharTexto, setTacharTexto] = useState(false)

  return (
    <li className="Comentario">
      <span
        className={classNames({
          'Comentario__texto--tachado': tacharTexto
        })}
      >
        {texto}
      </span>
      <button
        className="Comentario__boton_eliminar"
        title="Eliminar este comentario"
        onClick={() => dispatch(eliminarComentario(texto))}
        onMouseEnter={() => setTacharTexto(true)}
        onMouseLeave={() => setTacharTexto(false)}
      >
        <Icon icon="mdi:delete" />
      </button>
    </li>
  )
}

export default Comentario