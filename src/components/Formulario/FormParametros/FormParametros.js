import React, { useState } from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './FormParametros.css'

const FormParametros = () => {
  const empresas = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const divisionTemporal = [
    { value: 'mensual', label: 'M - Mensual' },
    { value: 'trimetral', label: 'T - Trimestral' },
    { value: 'cuatrimestral', label: 'Q - Cuatrimestral' },
    { value: 'semestral', label: 'S - Semestral' },
  ]
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Empresa</div>
        <Select 
          options={empresas} 
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#2f4269",
            },
          })}  
          placeholder="Seleccione empresa"
        />
      </div>
      <div  className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Periodo de análisis</div>
        <p className="FormParametros__seccion_descripcion">Si no se ingresa fecha de inicio se considerará toda la historia disponible.</p>
        <div className="FormParametros__calendarios">
          <div className="FormParametros__calendario">
            <div className="FormParametros__label">Fecha de inicio: </div>
            <DatePicker isClearable={true} selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="FormParametros__calendario">
            <div className="FormParametros__label">Fecha de término: </div>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
        </div>
      </div>
      <div  className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">División temporal de análisis</div>
        <Select 
          defaultValue={divisionTemporal[2]}
          options={divisionTemporal} 
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#2f4269",
            },
          })}  
          placeholder="Seleccione división temporal de análisis"
        />
      </div>
    </div>
  )
}

export default FormParametros
