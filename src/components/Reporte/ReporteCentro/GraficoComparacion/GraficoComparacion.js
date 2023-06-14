import React from "react";
import { useSelector } from "react-redux";
import "./GraficoComparacion.css";
import { generalTexts } from '../generalTexts';


const GraficoComparacion = ({ language }) => {
  const {
    datosGraficoComparacion: datosReadOnly,
  } = useSelector((state) => state.reporteCentro);
  const { gt_GraficoComparacion } = generalTexts
  const { titulo, yaxis, sindatos, disclaimer } = gt_GraficoComparacion[language]

  if (datosReadOnly.length === 2) {
    return (
      <div className="GraficoComparacion">
        <p className="GraficoComparacion__titulo">
          {titulo}
        </p>
        <div className="GraficoComparacion__contenedor_grafico">
        <div className="GraficoComparacion__contenedor_grafico__error">
          {sindatos}
          </div>
        </div>
      </div>
    )
  }

  const datos = [...datosReadOnly.map(v => {return {...v}})]
  datos[0]['nombre'] = language === 'es' ? 'Industria' : 'Industry'
  datos[1]['nombre'] = language === 'es' ? 'Empresa' : 'Company'
  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));

  const tick = vMax > 25 ? 5 : 2;
  let yMax = Math.max(12, Math.ceil(vMax + tick));
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
            <div
              key={`compc-lineay-${y}`}
              className="GraficoComparacion__linea"
            >
              <p className="GraficoComparacion__etiqueta_linea">
                {y.toLocaleString(language)}
              </p>
            </div>
          ))}
        </div>
        {datos.map((d) => {
          if (d.promedio === 0 || !d.promedio) {
            return (
                <div key={`caja-cc-${d.nombre}`} className="GraficoComparacion__contenedor_caja">
                  <div className="GraficoComparacion__si">{sindatos}</div>
                <div className="GraficoComparacion__etiqueta_caja">
                  {d.nombre.split(' ').map((n, i) => <div key={`${d.nombre}-${i}`}>{n}</div>)}
                </div>
              </div>
            )
          }
          return (
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
                fontSize:
                  datos.length < 5
                    ? ".85rem"
                    : datos.length < 10
                    ? ".70rem"
                    : ".55rem",
              }}
            >
              {d.promedio.toLocaleString(language, {
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
        )})}
        <div className="disclaimer">{disclaimer}</div>
      </div>
    </div>
  );
};

export default GraficoComparacion;
