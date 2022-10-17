import './DatosEmpresa.css'
import { generalTexts } from '../ReporteAlimento/generalTexts';

const DatosEmpresa = ({ nombreEmpresa, fechaDatos, fecha, language }) => {
  const today = new Date(fecha);
  const { gt_DatosEmpresa } = generalTexts
  const fechaEmision = gt_DatosEmpresa.fechaEmision[language](today.getFullYear(), today.getMonth(), today.getDate())
  const subtitulo = gt_DatosEmpresa.subtitulo[language](nombreEmpresa)
  return (
    <div className="DatosEmpresa">
      <div className="DatosEmpresa__titulo">
      <h1 className="DatosEmpresa__nombre">{nombreEmpresa}</h1>
       { fechaDatos !== null && <div className="DatosEmpresa__fechadatos">{fechaDatos}</div>}
      </div>
      <p className="DatosEmpresa__bajada">
        <span className="DatosEmpresa__fecha">{fechaEmision}</span> {subtitulo} 
      </p>

    </div>
  )
}

export default DatosEmpresa