import './Sandalias.css'
import imagenHealthy from '../../../../assets/images/forever-healthy.jpg'
import classNames from 'classnames'
import { generalTexts } from '../generalTexts'

const SandaliasUI = ({ hayComentarios, language }) => {
  const texto = generalTexts.gt_Sandalias[language]
  return (
    <div className="Sandalias">
      {(!hayComentarios) && <img src={imagenHealthy} className="Sandalias__imagen" alt="imagen pie de pagina"/>}
      <p
        className={classNames({
          "Sandalias__texto": true,
          "Sandalias__texto--blanco": !hayComentarios
        })}
      >
        {texto}
      </p>
      <p className="Sandalias__numero_pagina">{1}</p> 
    </div>
  )
}

export default SandaliasUI