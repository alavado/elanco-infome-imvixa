import { useSelector } from 'react-redux'
import MensajeError from '../../MensajeError'
import ProteccionMacrozonas from './ProteccionMacrozonas'
import salmones from '../../../assets/images/varios-salmones.png'
import './ResultadosEficacia.css'
import Tratamientos from './Tratamientos'
import { generalTexts } from '../generalTexts'

const ResultadosEficacia = ({language}) => {

  const { graficos } = useSelector(state => state.graficos)
  const mostrarGraficoTratamientos = graficos.find(g => g.id === 'GRAFICO_EFICACIA').visible
  const mostrarMapaMacrozonas = graficos.find(g => g.id === 'GRAFICO_MACROZONAS').visible
  const texto = generalTexts.ResultadosEficacia[language]

  const nGraficos = mostrarGraficoTratamientos + mostrarMapaMacrozonas
  if (nGraficos === 0) {
    return null
  }

  return (
    <div className="ResultadosEficacia">
      <h3 className="Reporte__titulo_seccion">
        {texto}
      </h3>
      <MensajeError>
        {mostrarGraficoTratamientos && <Tratamientos language={language}/>}
      </MensajeError>
      <MensajeError>
        {mostrarMapaMacrozonas && <ProteccionMacrozonas language={language} />}
      </MensajeError>
      {nGraficos === 1 && <img src={salmones} className="Salmones__imagen" alt="imagen salmones"/>}
    </div>
  )
}

export default ResultadosEficacia