import './Reporte.css'
import { Link } from 'react-router-dom'
import logoImvixa from '../../assets/images/logo-imvixa.svg'
import logoElanco from '../../assets/images/logo-elanco.svg'
import salmon from '../../assets/images/salmon.svg'
import DatosEmpresa from './DatosEmpresa/DatosEmpresa'
import InformacionGeneral from './InformacionGeneral/InformacionGeneral'
import ResultadosEficacia from './ResultadosEficacia'
import ResultadosConcentracion from './ResultadosConcentracion'
import Sandalias from './Sandalias'
const { ipcRenderer } = window.require('electron')

const Reporte = () => {

  const imprimirPDF = () => {
    ipcRenderer.send('imprimir')
  }

  return (
    <div className="Reporte">
      <div className="Reporte__herramientas">
        <Link className="Reporte__volver" to="/">❮ Parámetros</Link>
        <button onClick={imprimirPDF}>Exportar</button>
      </div>
      <div className="Reporte__contenedor">
        <img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
        <img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
        <img src={salmon} className="Reporte__salmon" alt="Salmón acuático" />
        <DatosEmpresa />
        <InformacionGeneral />
        <ResultadosConcentracion />
        <ResultadosEficacia />
        <Sandalias />
      </div>
    </div>
  )
}

export default Reporte