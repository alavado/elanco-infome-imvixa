import './Sandalias.css'
import imagenHealthy from '../../../../assets/images/forever-healthy.jpg'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

const Sandalias = ({ pagina }) => {

  const { comentariosCentro } = useSelector(state => state.comentarios)
  const nPalabras = comentariosCentro.reduce((acc, curr) => acc + curr.length, 0)
  const hayComentarios = nPalabras > 900
  console.log({nPalabras})
  return (
    <div className="Sandalias">
      {pagina === 2 && !hayComentarios && <img src={imagenHealthy} className="Sandalias__imagen" alt="imagen pie de pagina"/>}
      <p
        className={classNames({
          "Sandalias__texto": true,
          "Sandalias__texto--blanco": !hayComentarios && pagina === 2
        })}
      >
        Imvixa, Elanco y la barra diagonal son marcas registradas de Elanco o sus afiliadas. © {new Date().getFullYear()} Elanco
      </p>
      <p className="Sandalias__numero_pagina">{pagina}</p>
    </div>
  )
}

export default Sandalias