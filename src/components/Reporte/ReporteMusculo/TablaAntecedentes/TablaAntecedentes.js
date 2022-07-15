import React from "react";
import "./TablaAntecedentes.css";

const TablaAntecedentes = () => {
  const filasColumna1 = [
    ["PMV", null],
    ["Grupo", null],
    ["Número de peces", null],
    ["Peso al inicio de tratamiento (g)", null],
    ["Estanques medicados", null],
    ["Lote de alimento", null],
    ["Planta de alimento", null],
  ];
  const filasColumna2 = [
    ["Concentración objetivo PMV (ppm)", null],
    ["Inclusión de activo en alimento (%)", null],
    ["Alimento consumido (kg)", null],
    ["Fecha de inicio de tratamiento", null],
    ["Fecha de término de tratamiento", null],
    ["Fecha de inicio fotoperiodo", null],
    ["Centro de destino", null],
  ];
  return (
    <div className="TablaAntecedentes">
      <h4 className="TablaAntecedentes__titulo">
        Antecedentes del grupo tratado
      </h4>
      <div className="TablaAntecedentes__tabla">
        <div className="TablaAntecedentes__columna">
          {filasColumna1.map((fila, i) => (
            <div
              key={`c1-fila-antecedentes-${i}`}
              className="TablaAntecedentes__fila"
            >
              <div>{fila[0]}:</div>
              <div>1{fila[1]}</div>
            </div>
          ))}
        </div>
        <div className="TablaAntecedentes__columna">
          {filasColumna2.map((fila, i) => (
            <div
              key={`c2-fila-antecedentes-${i}`}
              className="TablaAntecedentes__fila"
            >
              <div>{fila[0]}:</div>
              <div>1{fila[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaAntecedentes;
