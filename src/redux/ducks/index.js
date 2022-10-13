import { combineReducers } from 'redux'
import reporte from './reporteSeguimiento'
import reporteAlimento from './reporteAlimento'
import reporteMusculo from './reporteMusculo'
import reporteCentro from './reporteCentro'
import comentarios from './comentarios'
import graficos from './graficos'
import parametrosGenerales from './parametrosGenerales'
import visualizadorReporteAlimento from './visualizadorReporteAlimento'
import previsualizador from './previsualizador'

export default combineReducers({
  reporte,
  reporteAlimento,
  reporteMusculo,
  reporteCentro,
  graficos,
  comentarios,
  parametrosGenerales,
  visualizadorReporteAlimento,
  previsualizador
})