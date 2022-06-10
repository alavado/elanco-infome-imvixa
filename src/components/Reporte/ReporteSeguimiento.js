import './Reporte.css'
import logoImvixa from '../../assets/images/logo-imvixa.svg'
import logoElanco from '../../assets/images/logo-elanco.svg'
import salmon from '../../assets/images/varios-salmones.png'
import DatosEmpresa from './DatosEmpresa/DatosEmpresa'
import InformacionGeneral from './InformacionGeneral/InformacionGeneral'
import ResultadosEficacia from './ResultadosEficacia'
import ResultadosConcentracion from './ResultadosConcentracion'
import Comentarios from './Comentarios'
import Sandalias from './Sandalias'
import MensajeError from '../MensajeError'

const ReporteSeguimiento = () => {
  return (
    <div className="Reporte">
      <div className="Reporte__contenedor">
        <div className="Reporte__pagina Reporte__pagina--1">
          <img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
          <img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
          <img src={salmon} className="Reporte__salmon" alt="Salmón acuático" />
          <MensajeError>
            <DatosEmpresa />
          </MensajeError>
          <InformacionGeneral />
          <ResultadosConcentracion />
          <Sandalias pagina={1} />
        </div>
        <div className="Reporte__pagina Reporte__pagina--2">
          <img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
          <img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
          <img src={salmon} className="Reporte__salmon" alt="Salmón acuático" />
          <ResultadosEficacia />
          <Comentarios />
          <Sandalias pagina={2} />
        </div>
      </div>
    </div>
  )
}
export default ReporteSeguimiento