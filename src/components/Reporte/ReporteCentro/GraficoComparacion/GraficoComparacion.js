import { min } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import {
  colEmpresaPeces,
  colEstanquePeces,
  colFechaPeces,
  colInformePeces,
  colInformePecesR,
  colPisciculturaPeces,
  colPPB,
  colSampleOrigin,
  tipoFreshWater,
  tipoSeaWater,
} from "../../../../constants";
import {
  esMayorQueFecha,
  esMenorQueFecha,
  onlyUnique,
} from "../../../../redux/ducks/utilities";
import { iqrValues, iqrValuesFixed, mean } from "../../utilitiesReporte";
import "./GraficoComparacion.css";

const GraficoComparacion = () => {
  const { datosPeces, datosPorInforme, fecha, nombreEmpresa } = useSelector(
    (state) => state.reporteCentro
  );
  const { concentracion } = useSelector((state) => state.reporte);

  // Obtener los datos historicos

  const datosEjercicio = datosPorInforme.filter(
    (datos) =>
      datos[colSampleOrigin] === tipoSeaWater &&
      datos["fecha"].toString().startsWith(fecha.value)
  );

  // Sacar todos los muestreos en el centro en cuestion
  const informeOReportesEjercicio = datosPorInforme
    .filter((datos) => datos[colSampleOrigin] === tipoSeaWater)
    .map((v) => v[colInformePeces]);

  const comparacionEmpresa = [];
  const comparacionIndustria = [];

  datosPeces.forEach((fila) => {
    if (
      fila[colSampleOrigin] === tipoSeaWater &&
      !informeOReportesEjercicio.includes(fila[colInformePeces]) &&
      !informeOReportesEjercicio.includes(fila[colInformePecesR]) &&
      fila[colPPB]
    ) {
      // Obtener cumplimientos historicos de empresa que no incluyan estos lotes
      if (fila[colEmpresaPeces] === nombreEmpresa.value) {
        comparacionEmpresa.push(fila[colPPB] / 1000);
      } else {
        comparacionIndustria.push(fila[colPPB] / 1000);
      }
    }
  });

  const datosEmpresa = {
    nombre: nombreEmpresa.value,
    promedio: mean(comparacionEmpresa),
    ...iqrValues(comparacionEmpresa),
    max: Math.max(...comparacionEmpresa),
    min: Math.min(...comparacionEmpresa),
  };

  const datosIndustria = {
    nombre: "Industria",
    promedio:
      concentracion.prom !== ""
        ? concentracion.prom
        : mean(comparacionIndustria),
    ...(concentracion.q2 !== ""
      ? iqrValuesFixed(concentracion.q2, concentracion.q3, concentracion.q4)
      : iqrValues(comparacionIndustria)),
    max:
      concentracion.max !== ""
        ? concentracion.max
        : Math.min(12, Math.max(...comparacionIndustria)),
    min:
      concentracion.min !== ""
        ? concentracion.min
        : Math.min(...comparacionIndustria),
  };

  const datos = [datosIndustria, datosEmpresa];
  // Obtener datos de los centros de este ejercicio
  const pisciculturasOrigen = datosEjercicio
    .map((f) => f[colPisciculturaPeces])
    .filter(onlyUnique);

  const datosPisciculturas = [];
  pisciculturasOrigen.map((piscicultura) => {
    const muestrasPorPiscicultura = datosEjercicio.filter(
      (fila) => fila[colPisciculturaPeces] === piscicultura
    );
    if (muestrasPorPiscicultura.length > 0) {
      const muestras = [];
      muestrasPorPiscicultura.map((muestrasInforme) => {
        muestras.push(...muestrasInforme.muestras.map((valor) => valor / 1000));
      });
      datosPisciculturas.push({
        nombre: piscicultura,
        promedio: mean(muestras),
        ...iqrValues(muestras),
        max: Math.max(...muestras),
        min: Math.min(...muestras),
      });
    }
  });

  datosPisciculturas.sort((a, b) => a.nombre.localeCompare(b.nombre));
  datos.push(...datosPisciculturas)

  console.log({
    pisciculturasOrigen,
    datos,
  });

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
        Concentración (ug/kg) en músculo post tratamiento según piscicultura de
        origen
      </p>
      <div className="GraficoComparacion__contenedor_grafico">
        <p className="GraficoComparacion__etiqueta_eje_y">Miles</p>
        <div className="GraficoComparacion__contenedor_lineas">
          {yLineas.map((y) => (
            <div
              key={`compc-lineay-${y}`}
              className="GraficoComparacion__linea"
            >
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
                fontSize:
                  datos.length < 5
                    ? ".85rem"
                    : datos.length < 10
                    ? ".70rem"
                    : ".55rem",
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
      </div>
    </div>
  );
};

export default GraficoComparacion;
