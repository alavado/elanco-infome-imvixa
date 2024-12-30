import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { REPORTE_ID_ALIMENTO, REPORTE_ID_CENTRO, REPORTE_ID_MUSCULO } from '../../helpers/reportes'
import ReporteAlimento from '../Reporte/ReporteAlimento'
import ReporteCentro from '../Reporte/ReporteCentro'
import ReporteMusculo from '../Reporte/ReporteMusculo'
import ReporteSeguimiento from '../Reporte/ReporteSeguimiento'
import { productos } from '../../helpers/productos'

const { ipcRenderer } = window.require('electron')

const Visualizador = () => {
  const { reporte, language } = useSelector(state => state.previsualizador)
  useEffect(() => {
    ipcRenderer.send('viendoReporte', reporte.TipoID)
    return () => ipcRenderer.send('yaNoViendoReporte')
  }, [reporte.TipoID])

  console.log({
    reporte,
    productos
  })
  const producto = productos.find(v => v.titulo === reporte?.Producto)

  console.log({producto})
  switch (reporte.TipoID) {
    case REPORTE_ID_ALIMENTO:
      return (
        <ReporteAlimento language={language} product={producto}/>
      );
    case REPORTE_ID_MUSCULO:
      return (
        <ReporteMusculo language={language} product={producto}/>
      )
    case REPORTE_ID_CENTRO:
      return (
        <ReporteCentro language={language} product={producto}/>
      )
    default:
      return (
        <ReporteSeguimiento language={language} product={producto}/>
      );
  }
}

export default Visualizador