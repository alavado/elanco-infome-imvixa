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

const GraficoCumplimiento = ({ lote: datoLote }) => {
  const {
    nombreEmpresa,
    lotesAsociados,
    plantasAsociadas,
    datosAlimento: datosAlimentoHistorico,
    datosAlimentoLotesAsociados,
  } = useSelector((state) => state.reporteMusculo);
  const { cumplimiento } = useSelector((state) => state.reporte);

  if (lotesAsociados.length === 0) {
    return (
      <div className="GraficoCumplimiento">
        <p className="GraficoCumplimiento__titulo">
          Cumplimiento (%) concentración en alimento (logrado / intentado)
        </p>
        <div className="GraficoCumplimiento__contenedor_grafico">
          <div className="GraficoCumplimiento__contenedor_grafico__error">
            Sin datos disponibles para el periodo seleccionado
          </div>
        </div>
      </div>
    );
  }

  const lotesEjercicio = lotesAsociados;
  const minFechasLotes = new Date(
    selectMinMaxFecha(
      datosAlimentoLotesAsociados.map((v) => v[colFechaAlimento])
    )[0]
  );
  const primerDiaDelMes = new Date(
    [
      minFechasLotes.getMonth() + 1,
      "01",
      minFechasLotes.getFullYear() - 1,
    ].join("-")
  );
  const datosAlimento = datosAlimentoHistorico.filter((fila) => {
    return (
      esMayorQueFecha(fila[colFechaAlimento], primerDiaDelMes) &&
      esMenorQueFecha(fila[colFechaAlimento], minFechasLotes)
    );
  });

  const cumplimientosEmpresa = datosAlimento
    .filter(
      (v) =>
        v[colEmpresaAlimento] === nombreEmpresa.value &&
        !lotesEjercicio.includes(v[colLoteAlimento])
    )
    .map((obj) => obj[colCumplimiento] * 100);

  const cumplimientosPorPlanta = plantasAsociadas.map((planta) => {
    const datos = datosAlimento
      .filter(
        (v) =>
          v[colPlanta] === planta &&
          !lotesEjercicio.includes(v[colLoteAlimento])
      )
      .map((obj) => obj[colCumplimiento] * 100);
    return {
      nombre: planta,
      cumplimiento: datos,
    };
  });

  let datosEmpresa = {
    nombre: nombreEmpresa.value,
    promedio: mean(cumplimientosEmpresa),
    ...iqrValues(cumplimientosEmpresa),
    max: Math.max(...cumplimientosEmpresa),
    min: Math.min(...cumplimientosEmpresa),
  };

  let datosPlantaIndustria = cumplimientosPorPlanta.map((cumplimientos) => {
    const cumplimientosPlantaIndustria = cumplimientos.cumplimiento;
    return {
      nombre: cumplimientos.nombre,
      promedio:
        cumplimiento.prom !== ""
          ? cumplimiento.prom
          : mean(cumplimientosPlantaIndustria),
      ...(cumplimiento.q2 !== ""
        ? iqrValuesFixed(cumplimiento.q2, cumplimiento.q3, cumplimiento.q4)
        : iqrValues(cumplimientosPlantaIndustria)),
      max:
        cumplimiento.max !== ""
          ? cumplimiento.max
          : Math.max(...cumplimientosPlantaIndustria),
      min:
        cumplimiento.min !== ""
          ? cumplimiento.min
          : Math.min(...cumplimientosPlantaIndustria),
    };
  });

  const datosPorLote = lotesEjercicio.map((l) => {
    const filaLote = datosAlimentoLotesAsociados.find(
      (f) => f[colLoteAlimento].toString() === l
    );
    const valuesLote = [
      colAlimentoM1,
      colAlimentoM2,
      colAlimentoM3,
      colAlimentoM4,
    ].map(
      (muestra) =>
        (filaLote[muestra] * 100) / filaLote[colConcentracionObjetivo]
    );
    return {
      nombre: l,
      promedio: mean(valuesLote),
      ...iqrValues(valuesLote),
      max: Math.max(...valuesLote),
      min: Math.min(...valuesLote),
    };
  });

  const datos = [...datosPlantaIndustria, datosEmpresa, ...datosPorLote];

  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));
  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.promedio), Infinity)
  );
  const tick = Math.pow(10, Math.floor(Math.log10(vMin)));
  let yMax = Math.max(100, 10 * Math.ceil(vMax / tick));
  const yMin = Math.min(50, 10 * Math.floor(vMin / tick));

  console.log({
    datos,
    vMax,
    vMin,
    tick,
    yMax,
    yMin,
  });
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
