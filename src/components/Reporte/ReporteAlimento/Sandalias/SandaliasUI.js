import './Sandalias.css'
import imagenHealthy from '../../../../assets/images/forever-healthy.jpg'
import classNames from 'classnames'

const SandaliasUI = ({ hayComentarios }) => {
  return (
    <div className="Sandalias">
      {(!hayComentarios) && <img src={imagenHealthy} className="Sandalias__imagen" alt="imagen pie de pagina"/>}
      <p
        className={classNames({
          "Sandalias__texto": true,
          "Sandalias__texto--blanco": !hayComentarios
        })}
      >
        Imvixa, Elanco y la barra diagonal son marcas registradas de Elanco o sus afiliadas. © {new Date().getFullYear()} Elanco
      </p>
      <p className="Sandalias__numero_pagina">{1}</p> 
    </div>
  )
}

export default SandaliasUI