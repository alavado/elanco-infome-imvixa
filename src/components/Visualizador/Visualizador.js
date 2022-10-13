import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { REPORTE_ID_ALIMENTO, REPORTE_ID_CENTRO, REPORTE_ID_MUSCULO } from '../../helpers/reportes'
import ReporteMusculo from '../Reporte/ReporteMusculo'
import VisualizadorAlimento from './VisualizadorAlimento'
// import VisualizadorMusculo from './VisualizadorMusculo'
// import VisualizadorCentro from './VisualizadorCentro'
import VisualizadorSeguimiento from './VisualizadorSeguimiento'
const { ipcRenderer } = window.require('electron')

const Visualizador = () => {
  const { reporte } = useSelector(state => state.previsualizador)
  // TODO: Check si se imprime despues de que se renderiza
  // NO ESTá funcionando, incluso ya no sirve el boton de exportar, esta malo
  // Check si le puedo poner un if para que no se imprima cuando viene directo desde el state
  // useEffect(() => {
  //   ipcRenderer.send('visualizandoReporte', reporte.id)
  //   ipcRenderer.on('imprimirReporte', async (_) => {
  //     ipcRenderer.send('imprimirReporte', reporte.id)
  //   })
  //   return () => ipcRenderer.send('yaNoViendoReporte')
  // }, [])
  useEffect(() => {
    ipcRenderer.send('viendoReporte', reporte.TipoID)
    return () => ipcRenderer.send('yaNoViendoReporte')
  }, [reporte.TipoID])

  switch (reporte.TipoID) {
    case REPORTE_ID_ALIMENTO:
      return (
        <VisualizadorAlimento />
      );
    case REPORTE_ID_MUSCULO:
      return (
        <ReporteMusculo />
      )
    // case REPORTE_ID_CENTRO:
    //   return (
    //     <VisualizadorCentro />
    //   )
    default:
      return (
        <VisualizadorSeguimiento />
      );
  }
}

export default Visualizador