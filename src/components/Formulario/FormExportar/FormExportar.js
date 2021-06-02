import React from 'react'
import Select from 'react-select'
import './FormExportar.css'

const opcionesExportacion = [
  { value: 'pdf', label: 'Reporte', color: '#eb593c', isFixed: true },
  { value: 'resumen', label: 'Tabla resumen', color: '#eb593c', isFixed: false },
  { value: 'pecesTratados', label: 'Peces tratados', color: '#eb593c', isFixed: false },
  { value: 'pesoPromedio', label: 'Peso promedio', color: '#eb593c', isFixed: false },
  { value: 'cumplimiento', label: 'Cumplimiento', color: '#eb593c', isFixed: false },
  { value: 'concentracionPost', label: 'PPB post', color: '#eb593c', isFixed: false },
  { value: 'concentracion5q', label: 'PPB', color: '#eb593c', isFixed: false },
  { value: 'tratamientos', label: 'Meses a primer baño', color: '#eb593c', isFixed: false },
  { value: 'proteccionPromedio', label: 'Mapa protección promedio', color: '#eb593c', isFixed: false },
]

const FormExportar = () => {
  return (
    <div className="FormParametros__exportar" >
      <div className="FormParametros__exportar_label">Seleccione elementos a exportar</div>
      <p className="FormParametros__exportar_descripcion">El reporte será exportado en PDF. Los otros elementos se exportarán en JPG.</p>
      <Select
        defaultValue={[opcionesExportacion[0]]}
        isMulti
        name="colors"
        options={opcionesExportacion}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Seleccione elementos a exportar"
        noOptionsMessage={obj => "No hay más opciones"}
      />
    </div>
  )
}

export default FormExportar
