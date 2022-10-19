import React from "react";
import { useSelector } from "react-redux";
import {
  colAlimentoM1,
  colAlimentoM2,
  colAlimentoM3,
  colAlimentoM4,
  colConcentracionObjetivo,
  colCumplimiento,
  colEmpresaAlimento,
  colFechaAlimento,
  colLoteAlimento,
  colPlanta,
} from "../../../../constants";
import { mean, iqrValues, iqrValuesFixed } from "../../utilitiesReporte";
import {
  esMayorQueFecha,
  esMenorQueFecha,
  selectMinMaxFecha,
} from "../../../../redux/ducks/utilities";
import "./GraficoCumplimiento.css";
import { generalTexts } from '../generalTexts';

const GraficoCumplimiento = ({language}) => {
  const {
    datosGCumpl: datos
  } = useSelector((state) => state.reporteMusculo);
  // const { cumplimiento } = useSelector((state) => state.reporte);
  const { gt_GraficoCumplimiento } = generalTexts
  const { titulo, yaxis, sindatos } = gt_GraficoCumplimiento[language]

  if (datos.length === 0) {
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
  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));
  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.min), Infinity)
  );

  let tick = Math.pow(10, Math.floor(Math.log10(vMin)));
  if (tick <=  0) {
    tick = 10
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
                {y.toLocaleString(language === 'es' ? "de-DE" : 'en')}
              </p>
            </div>
          ))}
        </div>
        {datos.map((d) => (
          <div
            key={`caja-cc-${d.nombre}`}
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
              {d.promedio.toLocaleString(language === 'es' ? "de-DE" : 'en', {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div className="GraficoCumplimiento__etiqueta_caja">
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

export default GraficoCumplimiento;
