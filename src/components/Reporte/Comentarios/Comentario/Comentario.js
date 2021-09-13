import './Comentario.css'
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { eliminarComentario } from '../../../../redux/ducks/comentarios';

const Comentario = ({ texto }) => {

  const dispatch = useDispatch()

  return (
    <li className="Comentario">
      <button onClick={() => dispatch(eliminarComentario(texto))}>
        <Icon icon="mdi:delete" />
      </button>
      {texto}
    </li>
  )
}

export default Comentario