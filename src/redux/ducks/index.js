import { combineReducers } from 'redux'
import reporte from './reporte'
import comentarios from './comentarios'
import graficos from './graficos'

export default combineReducers({
  reporte,
  graficos,
  comentarios
})