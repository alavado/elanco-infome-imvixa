import React from "react";
import { useSelector } from "react-redux";
import "./TablaLotes.css";
import {
  colLoteAlimento,
  colALimentoM1,
  colALimentoM2,
  colALimentoM3,
  colALimentoM4,
  colALimentoCV,
  colALimentoProm,
  colALimentoSTD,
  colCumplimiento
} from "../../../constants";

const TablaLotes = () => {
  const { datosLotes } = useSelector((state) => state.reporteAlimento);

  const headers = [
    "Lote",
    "Muestra 1",
    "Muestra 2",
    "Muestra 3",
    "Muestra 4",
    "Promedio\n(ppm)",
    "CV\n",
    "Cumplimiento\n",
    "Desviación\nEstándar",
  ];
  const decimales1 = 1;
  const decimales2 = 2;
  return (
    <div className="TablaLotes">
      <div className="TablaLotes__tabla">
        <div className="TablaLotes__encabezados">
          {headers.map((col, i) => (
            <div key={`TablaLotes-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        {datosLotes.map((fila, i) => (
          <div key={`TablaLotes-fila-${i}`} className="TablaLotes__fila">
            <div>{fila[colLoteAlimento]}</div>
            <div>{fila[colALimentoM1]}</div>
            <div>{fila[colALimentoM2]}</div>
            <div>{fila[colALimentoM3]}</div>
            <div>{fila[colALimentoM4]}</div>
            <div>{fila[colALimentoProm]}</div>
            <div>{Math.round(fila[colALimentoCV] * 100  * Math.pow(10, decimales2)) / Math.pow(10, decimales2) }%</div>
            <div>{Math.round(fila[colCumplimiento] * 100 * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}%</div>
            <div>{Math.round(fila[colALimentoSTD] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablaLotes;
