const REPORTE_ID_ALIMENTO = 1
const REPORTE_ID_MUSCULO = 2
const REPORTE_ID_CENTRO = 3
const REPORTE_ID_SEGUIMIENTO = 4

const REPORTE_NOMBRE_ALIMENTO = 'Reporte de concentración en alimento'
const REPORTE_NOMBRE_MUSCULO = 'Reporte de concentración en músculo/piel'
const REPORTE_NOMBRE_CENTRO = 'Reporte de seguimiento por centro de mar'
const REPORTE_NOMBRE_SEGUIMIENTO = 'Reporte de seguimiento'

const reportes = [
  {
    id: REPORTE_ID_ALIMENTO,
    titulo: REPORTE_NOMBRE_ALIMENTO
  },
  {
    id: REPORTE_ID_MUSCULO,
    titulo: REPORTE_NOMBRE_MUSCULO
  },
  {
    id: REPORTE_ID_CENTRO,
    titulo: REPORTE_NOMBRE_CENTRO
  },
  {
    id: REPORTE_ID_SEGUIMIENTO,
    titulo: REPORTE_NOMBRE_SEGUIMIENTO
  }
]



module.exports = { 
  reportes, 
  REPORTE_ID_ALIMENTO, 
  REPORTE_ID_MUSCULO, 
  REPORTE_ID_CENTRO, 
  REPORTE_ID_SEGUIMIENTO,
  REPORTE_NOMBRE_ALIMENTO,
  REPORTE_NOMBRE_MUSCULO,
  REPORTE_NOMBRE_CENTRO,
  REPORTE_NOMBRE_SEGUIMIENTO
 }