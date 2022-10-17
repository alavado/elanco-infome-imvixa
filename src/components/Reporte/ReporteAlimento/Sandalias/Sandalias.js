import './Sandalias.css'
import { useSelector } from 'react-redux'
import SandaliasUI from './SandaliasUI'

const Sandalias = ({ indice, language }) => {
  const { comentariosAlimento } = useSelector(state => state.comentarios)
  const comentarios = comentariosAlimento[indice] || []
  const hayComentarios = comentarios.length > 0
  return (
    <SandaliasUI hayComentarios={hayComentarios} language={language}/>
  )
}

export default Sandalias