import logoElanco from '../../../assets/images/logo-elanco.svg'
import xImvixa from '../../../assets/images/x-imvixa.svg'
import './Sandalias.css'

const Sandalias = () => {
  return (
    <div className="Sandalias">
      <img className="Sandalias__logo_elanco" src={logoElanco} alt="Logo Elanco" />
      <p className="Sandalias__texto">Imvixa, Elanco y la barra diagonal son marcas registradas de Elanco o sus afiliadas. © 2021 Elanco</p>
      <img className="Sandalias__x_imvixa" src={xImvixa} alt="X de IMVIXA" />
    </div>
  )
}

export default Sandalias