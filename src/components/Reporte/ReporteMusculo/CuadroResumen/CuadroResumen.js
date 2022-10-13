import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarRepCliente, guardarRepElanco, guardarRepVisita } from "../../../../redux/ducks/reporteMusculo";
import "./CuadroResumen.css";

const CuadroResumen = () => {
  const dispatch = useDispatch()
  const { 
    pisciculturaValue, 
    fechaValue, 
    initialRepElanco: repElanco, 
    initialRepVisita: repVisita, 
    initialRepCliente: repCliente } = useSelector((state) => state.reporteMusculo);
  // const [repElanco, setRepElanco] = useState(initialRepElanco);
  // const [repVisita, setRepVisita] = useState(initialRepVisita);
  // const [repCliente, setRepCliente] = useState(initialRepCliente);
  return (
    <div className="CuadroResumen">
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Piscicultura:</div>
        <div className="CuadroResumen__value">{pisciculturaValue}</div>
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
              dispatch(guardarRepElanco(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">Fecha de visita:</div>
        <div className="CuadroResumen__value">{fechaValue}</div>
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
              dispatch(guardarRepVisita(e.target.value));
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
              dispatch(guardarRepCliente(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CuadroResumen;
