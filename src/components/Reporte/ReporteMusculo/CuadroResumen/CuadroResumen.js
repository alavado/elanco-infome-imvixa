import React from "react";
import { useSelector } from "react-redux";
import "./CuadroResumen.css";

const CuadroResumen = () => {
  const { piscicultura, fecha } = useSelector(
    (state) => state.reporteMusculo
  );
  return (
    <div className="CuadroResumen">
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Piscicultura:</div>
        <div className="CuadroResumen__value">{piscicultura.value}</div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Representante Elanco:</div>
        <div className="CuadroResumen__value">Loncotraro</div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Fecha de visita:</div>
        <div className="CuadroResumen__value">{fecha.value}</div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Representante visita:</div>
        <div className="CuadroResumen__value">Loncotraro</div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Representante cliente:</div>
        <div className="CuadroResumen__value">Loncotraro Loncotraro</div>
      </div>
    </div>
  );
};

export default CuadroResumen;
