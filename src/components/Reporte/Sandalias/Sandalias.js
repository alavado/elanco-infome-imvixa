import './Sandalias.css'

const Sandalias = ({ pagina }) => {
  return (
    <div className="Sandalias">
      <p className="Sandalias__texto">Imvixa, Elanco y la barra diagonal son marcas registradas de Elanco o sus afiliadas. © {new Date().getFullYear()} Elanco</p>
      <p className="Sandalias__numero_pagina">{pagina}</p>
    </div>
  )
}

export default Sandalias