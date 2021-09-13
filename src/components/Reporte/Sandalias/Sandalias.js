import './Sandalias.css'
import imagenHealthy from '../../../assets/images/forever-healthy.jpg'

const Sandalias = ({ pagina }) => {
  return (
    <div className="Sandalias">
      {pagina === 2 && <img src={imagenHealthy} className="Sandalias__imagen" />}
      <p className="Sandalias__texto">Imvixa, Elanco y la barra diagonal son marcas registradas de Elanco o sus afiliadas. © {new Date().getFullYear()} Elanco</p>
      <p className="Sandalias__numero_pagina">{pagina}</p>
    </div>
  )
}

export default Sandalias