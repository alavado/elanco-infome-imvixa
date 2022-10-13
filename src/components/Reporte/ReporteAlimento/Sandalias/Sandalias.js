import './Sandalias.css'
import { useSelector } from 'react-redux'
import SandaliasUI from './SandaliasUI'

const Sandalias = ({ indice }) => {
  const { comentariosAlimento } = useSelector(state => state.comentarios)
  const comentarios = comentariosAlimento[indice] || []
  const hayComentarios = comentarios.length > 0
  return (
    <SandaliasUI hayComentarios={hayComentarios} />
  )
}

export default Sandalias