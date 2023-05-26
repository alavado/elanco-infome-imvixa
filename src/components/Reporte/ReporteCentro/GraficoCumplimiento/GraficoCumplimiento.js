import React from "react";
import { useSelector } from "react-redux";
import "./GraficoCumplimiento.css";
import { generalTexts } from '../generalTexts';


const GraficoCumplimiento = ({ language }) => {
  const {
    datosGraficoCumplimiento: datosReadOnly
  } = useSelector((state) => state.reporteCentro);
  // const { cumplimiento } = useSelector((state) => state.reporte);
  const { gt_GraficoCumplimiento } = generalTexts
  const { titulo, yaxis, sindatos, disclaimer } = gt_GraficoCumplimiento[language]

  if (datosReadOnly.length === 0) {
    return (
      <div className="GraficoCumplimiento">
        <p className="GraficoCumplimiento__titulo">
          {titulo}
        </p>
        <div className="GraficoCumplimiento__contenedor_grafico">
          <div className="GraficoCumplimiento__contenedor_grafico__error">
          {sindatos}
          </div>
        </div>
      </div>
    );
  }

  const datos = [...datosReadOnly.map(v => {return {...v}})]

  datos[0]['nombre'] = language === 'es' ? 'Industria' : 'Industry'
  console.log({
    datosReadOnly,
    datos
  })


  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));
  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.min), Infinity)
  );
  let tick = Math.pow(10, Math.floor(Math.log10(vMin)));
  console.log({
    vMax,
    vMin,
    tick
  })
  if (tick <= 0 || tick > 30) {
    tick = 10;
  }
  let yMax = Math.max(100, 10 * Math.ceil(vMax / tick));
  // const yMin = Math.min(50, 10 * Math.floor(vMin / tick));
  const yMin = Math.min(50, parseInt(vMin / 10) * 10);

  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoCumplimiento">
      <p className="GraficoCumplimiento__titulo">
        {titulo}
      </p>
      <div className="GraficoCumplimiento__contenedor_grafico">
        <p className="GraficoCumplimiento__etiqueta_eje_y">{yaxis}</p>
        <div className="GraficoCumplimiento__contenedor_lineas">
          {yLineas.map((y) => (
            <div key={`lineay-${y}`} className="GraficoCumplimiento__linea">
              <p className="GraficoCumplimiento__etiqueta_linea">
                {y.toLocaleString(language)}
              </p>
            </div>
          ))}
        </div>
        {datos.map((d, i) => {
          if (d.promedio) {
            return (<div
              key={`caja-cc-${d.nombre}-${i}`}
              className="GraficoCumplimiento__contenedor_caja"
            >
              <div
                className="GraficoCumplimiento__bigote"
                style={{
                  "--porcentaje-top": `${
                    ((yMax - d.max) / (yMax - yMin)) * 100
                  }%`,
                  height: `${((d.max - d.min) / (yMax - yMin)) * 100}%`,
                }}
              />
              <div
                className="GraficoCumplimiento__caja"
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
              <div className="GraficoCumplimiento__etiqueta_caja">
                {d.nombre.split(" ").map((n, i) => (
                  <div key={`${d.nombre}-${i}`}>{n}</div>
                ))}
              </div>
            </div>)
          } else {
            return (
              <div
              key={`caja-cc-${d.nombre}`}
              className="GraficoCumplimiento__contenedor_caja"
            >
              <div
                className="GraficoCumplimiento__si"
              >
                {sindatos}
              </div>
              <div className="GraficoCumplimiento__etiqueta_caja">
                {d.nombre.split(" ").map((n, i) => (
                  <div key={`${d.nombre}-${i}`}>{n}</div>
                ))}
              </div>
            </div>
            )
          }
        })}
        <div class="disclaimer">{disclaimer}</div>
      </div>
    </div>
  );
};

export default GraficoCumplimiento;
