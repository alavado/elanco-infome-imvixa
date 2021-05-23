import './Reporte.css'
import logoImvixa from '../../assets/images/logo-imvixa.svg'
import logoElanco from '../../assets/images/logo-elanco.svg'
import salmon from '../../assets/images/salmon.svg'
import DatosEmpresa from './DatosEmpresa/DatosEmpresa'
import InformacionGeneral from './InformacionGeneral/InformacionGeneral'
import ResultadosEficacia from './ResultadosEficacia'
import ResultadosConcentracion from './ResultadosConcentracion'
import Sandalias from './Sandalias'

const Reporte = () => {
  return (
    <div className="Reporte">
      <img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
      <img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
      <img src={salmon} className="Reporte__salmon" alt="Salmón acuático" />
      <DatosEmpresa />
      <InformacionGeneral />
      <ResultadosConcentracion />
      <ResultadosEficacia />
      <Sandalias />
    </div>
  )
}

export default Reporte