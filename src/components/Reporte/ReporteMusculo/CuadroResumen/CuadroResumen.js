import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarRepCliente, guardarRepElanco, guardarRepVisita } from "../../../../redux/ducks/reporteMusculo";
import "./CuadroResumen.css";
import { generalTexts } from '../generalTexts';


const CuadroResumen = ({ language }) => {
  const dispatch = useDispatch()
  const { 
    pisciculturaValue, 
    fechaValue, 
    initialRepElanco: repElanco, 
    initialRepVisita: repVisita, 
    initialRepCliente: repCliente } = useSelector((state) => state.reporteMusculo);
  const { gt_CuadroResumen } = generalTexts
  const labels = gt_CuadroResumen[language].filas
  return (
    <div className="CuadroResumen">
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">{labels[0]}:</div>
        <div className="CuadroResumen__value">{pisciculturaValue}</div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">{labels[1]}:</div>
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
        <div className="CuadroResumen__label">{labels[2]}:</div>
        <div className="CuadroResumen__value">{fechaValue}</div>
      </div>
      <div className="CuadroResumen__elemento">
        <div className="CuadroResumen__label">{labels[3]}:</div>
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
        <div className="CuadroResumen__label">{labels[4]}:</div>
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
