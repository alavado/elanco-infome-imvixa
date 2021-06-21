import React, { useState } from "react";
import Select from "react-select";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "./FormParametros.css";
import { useDispatch, useSelector } from "react-redux";
import {
  guardaNombreEmpresa,
  guardarFechaDeInicio,
  guardarFechaDeTermino,
  guardarDivisionTemporal,
} from "../../../redux/ducks/reporte";

const FormParametros = () => {
  registerLocale("es", es);
  const {
    empresas,
    nombreEmpresa,
    fechaInicio,
    fechaFinal,
    divisionTemporal,
  } = useSelector((state) => state.reporte);

  const divisionTemporalOptions = [
    { value: "mensual", label: "M - Mensual" },
    { value: "trimetral", label: "T - Trimestral" },
    { value: "cuatrimestral", label: "Q - Cuatrimestral" },
    { value: "semestral", label: "S - Semestral" },
  ]
  const dTSelected = divisionTemporalOptions.find(option => option.value === divisionTemporal)
  const dispatch = useDispatch();
  return (
    <div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Empresa</div>
        <Select
          options={empresas}
          defaultValue={nombreEmpresa}
          onChange={(nombre) => dispatch(guardaNombreEmpresa(nombre))}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#2f4269",
            },
          })}
          placeholder="Seleccione empresa"
          styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 3 })
          }}
        />
      </div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Periodo de análisis</div>
        <p className="FormParametros__seccion_descripcion">
          Si no se ingresa fecha de inicio se considerará toda la historia
          disponible.
        </p>
        <div className="FormParametros__calendarios">
          <div className="FormParametros__calendario">
            <div className="FormParametros__label">Inicio</div>
            <DatePicker
              locale="es"
              isClearable={true}
              selected={fechaInicio}
              onChange={(date) => dispatch(guardarFechaDeInicio(date))}
              dateFormat="dd/MM/yyyy"
              className="FormParametros__datepicker"
            />
          </div>
          <div className="FormParametros__calendario">
            <div className="FormParametros__label">Término</div>
            <DatePicker
              locale="es"
              selected={fechaFinal}
              onChange={(date) => dispatch(guardarFechaDeTermino(date))}
              dateFormat="dd/MM/yyyy"
              className="FormParametros__datepicker"
            />
          </div>
        </div>
      </div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">
          División temporal de análisis
        </div>
        <Select
          defaultValue={dTSelected}
          options={divisionTemporalOptions}
          onChange={(option) => dispatch(guardarDivisionTemporal(option.value))}
          theme={(theme) => ({
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
  );
};

export default FormParametros;
