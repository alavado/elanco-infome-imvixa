import React from "react";
import { useSelector } from "react-redux";
import { colEstanquePeces } from "../../../../constants";
import { iqrValues } from "../../utilitiesReporte";
import "./GraficoComparacion.css";
import { generalTexts } from '../generalTexts';

const GraficoComparacion = ({language}) => {
  const { datosGComp: datos } = useSelector(
    (state) => state.reporteMusculo
  );
  const { gt_GraficoComparacion } = generalTexts
  const { titulo, yaxis, xaxis } = gt_GraficoComparacion[language]
  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));
  const tick = vMax > 25 ? 5 : 2;
  let yMax = Math.max(20, Math.ceil(vMax + tick));
  const yMin = 0;

  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoComparacion">
      <p className="GraficoComparacion__titulo">
        {titulo}
      </p>
      <div className="GraficoComparacion__contenedor_grafico">
        <p className="GraficoComparacion__etiqueta_eje_y" style={{left: language === 'es'? '-4rem' : '-5rem'}}>{yaxis}</p>
				<div className="GraficoComparacion__contenedor_lineas">
          {yLineas.map((y) => (
            <div key={`compc-lineay-${y}`} className="GraficoComparacion__linea">
              <p className="GraficoComparacion__etiqueta_linea">
                {y.toLocaleString(language === 'es' ? "de-DE" : 'en')}
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
              {d.promedio.toLocaleString(language === 'es' ? "de-DE" : 'en', {
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
				<p className="GraficoComparacion__etiqueta_eje_x">{xaxis}</p>
      </div>
    </div>
  );
};

export default GraficoComparacion;
