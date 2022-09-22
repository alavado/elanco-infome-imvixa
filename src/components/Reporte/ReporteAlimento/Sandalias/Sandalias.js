import './Sandalias.css'
import { useSelector } from 'react-redux'
import SandaliasUI from './SandaliasUI'

const Sandalias = ({ pagina }) => {
  const { comentariosAlimento } = useSelector(state => state.comentarios)
  const comentarios = comentariosAlimento[pagina] || []
  const hayComentarios = comentarios.length > 0
  return (
    <SandaliasUI hayComentarios={hayComentarios} />
  )
}

export default Sandalias