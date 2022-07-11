import { combineReducers } from 'redux'
import reporte from './reporteSeguimiento'
import reporteAlimento from './reporteAlimento'
import reporteMusculo from './reporteMusculo'
import comentarios from './comentarios'
import graficos from './graficos'
import parametrosGenerales from './parametrosGenerales'

export default combineReducers({
  reporte,
  reporteAlimento,
  reporteMusculo,
  graficos,
  comentarios,
  parametrosGenerales
})