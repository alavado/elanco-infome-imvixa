import React, { useState } from 'react'
import Select from 'react-select'
import DatePicker, { registerLocale }  from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import './FormParametros.css'
import { useSelector } from 'react-redux';


const FormParametros = () => {
  registerLocale("es", es);
  const { empresas } = useSelector(state => state.reporte)
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
            <DatePicker 
              locale="es" 
              isClearable={true} 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="FormParametros__calendario">
            <div className="FormParametros__label">Fecha de término: </div>
            <DatePicker 
              locale="es" 
              selected={endDate} 
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
            />
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
