import './Sandalias.css'
import imagenHealthy from '../../../assets/images/forever-healthy.jpg'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

const Sandalias = ({ pagina }) => {

  const { comentarios } = useSelector(state => state.comentarios)
  const hayComentarios = comentarios.length > 0

  return (
    <div className="Sandalias">
      {pagina === 2 && !hayComentarios && <img src={imagenHealthy} className="Sandalias__imagen" />}
      <p
        className={classNames({
          "Sandalias__texto": true,
          "Sandalias__texto--blanco": !hayComentarios && pagina ==2
        })}
      >
        Imvixa, Elanco y la barra diagonal son marcas registradas de Elanco o sus afiliadas. © {new Date().getFullYear()} Elanco
      </p>
      <p className="Sandalias__numero_pagina">{pagina}</p>
    </div>
  )
}

export default Sandalias