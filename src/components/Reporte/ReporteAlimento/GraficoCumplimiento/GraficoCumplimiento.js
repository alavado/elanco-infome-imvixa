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
import {
  esMayorQueFecha,
  esMenorQueFecha,
  selectMinMaxFecha,
} from "../../../../redux/ducks/utilities";
import { mean, iqrValues, iqrValuesFixed } from "../../utilitiesReporte";
import "./GraficoCumplimiento.css";

const GraficoCumplimiento = ({ lote: datoLote }) => {
  const loteNombre = datoLote[colLoteAlimento];
  const { cumplimiento } = useSelector((state) => state.reporte);
  const { lotesTotales, lotesSeleccionados } = useSelector(
    (state) => state.reporteAlimento
  );

  const lotesEjercicio = lotesSeleccionados.map((l) => l.data[colLoteAlimento]);
  const minFechasLotes = new Date(
    selectMinMaxFecha(
      lotesSeleccionados.map((l) => l.data[colFechaAlimento])
    )[0]
  );
  const primerDiaDelMes = new Date(
    [
      minFechasLotes.getMonth() + 1,
      "01",
      minFechasLotes.getFullYear() - 1,
    ].join("-")
  );

  const lotesTotalesPeriodo = lotesTotales.filter(
    (v) =>
      esMayorQueFecha(v.data[colFechaAlimento], primerDiaDelMes) &&
      esMenorQueFecha(v.data[colFechaAlimento], minFechasLotes) &&
      (v.data[colEmpresaAlimento] === datoLote[colEmpresaAlimento] ||
        v.data[colPlanta] === datoLote[colPlanta])
  );

  const cumplimientosEmpresa = lotesTotalesPeriodo
    .filter(
      (v) =>
        v.data[colEmpresaAlimento] === datoLote[colEmpresaAlimento] &&
        !lotesEjercicio.includes(v.data[colLoteAlimento])
    )
    .map((obj) => obj.data[colCumplimiento] * 100);

  const cumplimientosPlantaIndustria = lotesTotalesPeriodo
    .filter(
      (v) =>
        v.data[colPlanta] === datoLote[colPlanta] &&
        !lotesEjercicio.includes(v.data[colLoteAlimento])
    )
    .map((obj) => obj.data[colCumplimiento] * 100);

  let datosEmpresa = {
    nombre: datoLote[colEmpresaAlimento],
    promedio: mean(cumplimientosEmpresa),
    ...iqrValues(cumplimientosEmpresa),
    max: Math.max(...cumplimientosEmpresa),
    min: Math.min(...cumplimientosEmpresa),
  };

  let datosPlantaIndustria = {
    nombre: datoLote[colPlanta],
    promedio:
      cumplimiento.prom !== ""
        ? cumplimiento.prom
        : mean(cumplimientosPlantaIndustria),
    ...iqrValues(cumplimientosPlantaIndustria),
    max:
      cumplimiento.max !== ""
        ? cumplimiento.max
        : Math.max(...cumplimientosPlantaIndustria),
    min:
      cumplimiento.min !== ""
        ? cumplimiento.min
        : Math.min(...cumplimientosPlantaIndustria),
  };

  if (cumplimiento.q2 !== "") {
    datosPlantaIndustria = {
      ...datosPlantaIndustria,
      ...iqrValuesFixed(cumplimiento.q2, cumplimiento.q3, cumplimiento.q4),
    };
  }

  const valuesLote = [
    colAlimentoM1,
    colAlimentoM2,
    colAlimentoM3,
    colAlimentoM4,
  ].map(
    (muestra) => (datoLote[muestra] * 100) / datoLote[colConcentracionObjetivo]
  );

  const datos = [
    datosPlantaIndustria,
    datosEmpresa,
    {
      nombre: loteNombre.toString(),
      promedio: mean(valuesLote),
      ...iqrValues(valuesLote),
      max: Math.max(...valuesLote),
      min: Math.min(...valuesLote),
    },
  ];
  console.log({
    datos,
  });
  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));
  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.promedio), Infinity)
  );
  const tick = Math.pow(10, Math.floor(Math.log10(vMin)));
  let yMax = Math.max(100, 10 * Math.ceil(vMax / tick));
  const yMin = Math.min(50, 10 * Math.floor(vMin / tick));
  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoCumplimiento">
      <p className="GraficoCumplimiento__titulo">
        Cumplimiento (%) concentración en alimento (logrado / intentado)
      </p>
      <div className="GraficoCumplimiento__contenedor_grafico">
        <p className="GraficoCumplimiento__etiqueta_eje_y">% de cumplimiento</p>
        <div className="GraficoCumplimiento__contenedor_lineas">
          {yLineas.map((y) => (
            <div key={`lineay-${y}`} className="GraficoCumplimiento__linea">
              <p className="GraficoCumplimiento__etiqueta_linea">
                {y.toLocaleString("de-DE")}
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
              {d.promedio.toLocaleString("de-DE", {
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
