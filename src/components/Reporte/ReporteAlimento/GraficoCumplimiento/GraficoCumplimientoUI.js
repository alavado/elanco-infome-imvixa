import React from "react";
import { generalTexts } from "../generalTexts";
import "./GraficoCumplimiento.css";

const GraficoCumplimientoUI = ({ datos, language }) => {
  const { titulo, textoEje } = generalTexts.gt_GraficoCumplimiento[language]
  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));

  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.min), Infinity)
  );
  let tick = Math.pow(10, Math.floor(Math.log10(vMin)));
  if (tick <=  5) {
    tick = 10
  }

  let yMax = Math.min(Math.max(100, 10 * Math.ceil(vMax / tick)), vMax + 2 * tick);
  const yMin = Math.min(50, parseInt(vMin / 10) * 10);
  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoCumplimientoAl">
      <p className="GraficoCumplimientoAl__titulo">
        {titulo}
      </p>
      <div className="GraficoCumplimientoAl__contenedor_grafico">
        <p className="GraficoCumplimientoAl__etiqueta_eje_y" style={{left: language === 'es' ? '-7.5rem' : '-5.5rem'}}>{textoEje}</p>
        <div className="GraficoCumplimientoAl__contenedor_lineas">
          {yLineas.map((y) => (
            <div key={`lineay-${y}`} className="GraficoCumplimientoAl__linea">
              <p className="GraficoCumplimientoAl__etiqueta_linea">
                {y.toLocaleString("de-DE")}
              </p>
            </div>
          ))}
        </div>
        {datos.map((d) => (
          <div
            key={`caja-cc-${d.nombre}`}
            className="GraficoCumplimientoAl__contenedor_caja"
          >
            <div
              className="GraficoCumplimientoAl__bigote"
              style={{
                "--porcentaje-top": `${
                  ((yMax - d.max) / (yMax - yMin)) * 100
                }%`,
                height: `${((d.max - d.min) / (yMax - yMin)) * 100}%`,
              }}
            />
            <div
              className="GraficoCumplimientoAl__caja"
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
              }}
            >
              {d.promedio.toLocaleString(language, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div className="GraficoCumplimientoAl__etiqueta_caja">
              {d.nombre.split(" ").map((n, i) => (
                <div key={`${d.nombre}-${i}`}>{n}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraficoCumplimientoUI;