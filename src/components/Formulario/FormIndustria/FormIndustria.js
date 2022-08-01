import "./FormIndustria.css";

import React from "react";
import { useSelector } from "react-redux";
import FormCumplimiento from "./FormCumplimiento";
import FormConcentracion from "./FormConcentracion";

const FormIndustria = () => {
  const { reporte } = useSelector((state) => state.parametrosGenerales);

  return (
    <div className="FormIndustria">
      <p className="FormIndustria__seccion_descripcion">
        Si no se ingresa algún valor se utilizará el cálculo automático.
        <br />
        Los valores deben respetar la siguiente relación min ≤ p25 ≤ p50 ≤ p75 ≤
        max.
        <br />
        Si ingresa algún percentil, debe ingresar todos los demás valores.
      </p>
    <FormCumplimiento/>
    {(reporte.id === 4 || reporte.id === 3) && <FormConcentracion/>}
    </div>
  );
};

export default FormIndustria;
