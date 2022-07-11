import React from "react";
import "./FormParametros.css";
import { useSelector } from "react-redux";
import ParametrosReporteAlimento from "./ParametrosReporteAlimento";
import ParametrosReporteSeguimiento from "./ParametrosReporteSeguimiento";
import ParametrosReporteMusculo from "./ParametrosReporteMusculo/ParametrosReporteMusculo";

const FormParametros = () => {

  const { reporte } = useSelector((state) => state.parametrosGenerales);
  switch (reporte.id) {
    case 1:
      return (
        <ParametrosReporteAlimento/>
      );
    case 2:
      return (
        <ParametrosReporteMusculo/>
      );
    default:
      return (
        <ParametrosReporteSeguimiento/>
      );
  }
};

export default FormParametros;
