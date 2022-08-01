import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CuadroResumen.css";

const CuadroResumen = () => {
  const { fecha } = useSelector((state) => state.reporteCentro);
  const [repElanco, setRepElanco] = useState("");
  const [repVisita, setRepVisita] = useState("");
  const [repCliente, setRepCliente] = useState("");
  return (
    <div className="CuadroResumen">
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Fecha de visita:</div>
        <div className="CuadroResumen__value">{fecha.value}</div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Representante Elanco:</div>
        <div className="CuadroResumen__value">
          <input
            id=""
            style={{backgroundColor: repElanco !== "" ? "transparent" : "var(--color-highlight)"}}
            className="CuadroResumen__input"
            value={repElanco}
            onChange={(e) => {
              setRepElanco(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Representante cliente:</div>
        <div className="CuadroResumen__value">
          <input
            id=""
            className="CuadroResumen__input"
            style={{backgroundColor: repCliente !== "" ? "transparent" : "var(--color-highlight)"}}
            value={repCliente}
            onChange={(e) => {
              setRepCliente(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Representante visita:</div>
        <div className="CuadroResumen__value">
          <input
            id=""
            className="CuadroResumen__input"
            value={repVisita}
            style={{backgroundColor: repVisita !== "" ? "transparent" : "var(--color-highlight)"}}
            onChange={(e) => {
              setRepVisita(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CuadroResumen;
