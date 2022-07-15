import React from "react";
import { useSelector } from "react-redux";
import { colEstanquePeces } from "../../../../constants";
import { iqrValues } from "../../utilitiesReporte";
import "./GraficoComparacion.css";

const GraficoComparacion = () => {
  const { datosEjercicio } = useSelector(
    (state) => state.reporteMusculo
  );
  
  const datos = datosEjercicio.map(fila => {
    const muestras = fila["muestras"].filter(v => v !== "-").map(v => v / 1000)
    return {
    nombre: fila[colEstanquePeces].toString(),
    promedio: fila["prom"] / 1000,
    ...iqrValues(muestras),
    max: fila["max"] / 1000,
    min: fila["min"] / 1000
  }});

  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));


  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.promedio), Infinity)
  );
  const tick = vMax > 25 ? 5 : 2;
  let yMax = Math.max(20, Math.ceil(vMax + tick));
  const yMin = 0;
  console.log({
    vMax,
    vMin,
    tick,
    yMax
  })
  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoComparacion">
      <p className="GraficoComparacion__titulo">
        Comparación concentración (ppb) en músculo
      </p>
      <div className="GraficoComparacion__contenedor_grafico">
        <p className="GraficoComparacion__etiqueta_eje_y">Miles</p>
				<div className="GraficoComparacion__contenedor_lineas">
          {yLineas.map((y) => (
            <div key={`compc-lineay-${y}`} className="GraficoComparacion__linea">
              <p className="GraficoComparacion__etiqueta_linea">
                {y.toLocaleString("de-DE")}
              </p>
            </div>
          ))}
        </div>
				{datos.map((d) => (
          <div
            key={`compc-caja-${d.nombre}`}
            className="GraficoComparacion__contenedor_caja"
          >
            <div
              className="GraficoComparacion__bigote"
              style={{
                "--porcentaje-top": `${
                  ((yMax - d.max) / (yMax - yMin)) * 100
                }%`,
                height: `${((d.max - d.min) / (yMax - yMin)) * 100}%`,
              }}
            />
            <div
              className="GraficoComparacion__caja"
              style={{
                "--porcentaje-bottom": `${Math.max(
                  0,
                  ((d.mediana - d.iqrMitadInferior - yMin) / (yMax - yMin)) *
                    100
                )}%`,
                "--porcentaje-top": `${
                  ((yMax - d.iqrMitadSuperior - d.mediana) / (yMax - yMin)) *
                  100
                }%`,
                fontSize: datos.length < 5 ? ".85rem" :  datos.length < 10 ? ".70rem" : ".55rem"
              }}
            >
              {d.promedio.toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div className="GraficoComparacion__etiqueta_caja">
              {d.nombre.split(" ").map((n, i) => (
                <div key={`compc-${d.nombre}-${i}`}>{n}</div>
              ))}
            </div>
          </div>
        ))}
				<p className="GraficoComparacion__etiqueta_eje_x">Estanque</p>
      </div>
    </div>
  );
};

export default GraficoComparacion;
