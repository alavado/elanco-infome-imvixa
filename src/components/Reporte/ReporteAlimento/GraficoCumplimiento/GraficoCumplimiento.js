import React from "react";
import { useSelector } from "react-redux";
import {
  colAlimentoMuestra,
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
import GraficoCumplimientoUI from "./GraficoCumplimientoUI";

const GraficoCumplimiento = ({ lote: datoLote, index }) => {
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
    nombre: datoLote[colPlanta] === datoLote[colEmpresaAlimento] ? `Planta ${datoLote[colPlanta]}` : datoLote[colPlanta],
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
        ? Math.max(cumplimiento.min, Math.min(...cumplimientosPlantaIndustria))
        : Math.min(...cumplimientosPlantaIndustria),
  };

  if (cumplimiento.q2 !== "") {
    datosPlantaIndustria = {
      ...datosPlantaIndustria,
      ...iqrValuesFixed(cumplimiento.q2, cumplimiento.q3, cumplimiento.q4),
    };
  }
  const valuesLote = []

  Object.entries(datoLote).forEach((e) => {
    if (e[0].startsWith(colAlimentoMuestra) && e[1]) {
      valuesLote.push(
        (e[1] * 100) / datoLote[colConcentracionObjetivo]
      );
    }
  });

  const datos = []
  if (cumplimientosPlantaIndustria.length > 0) {
    datos.push(datosPlantaIndustria)
  }
  if (cumplimientosEmpresa.length > 0) {
    datos.push(datosEmpresa)
  }
  datos.push({
    nombre: loteNombre.toString(),
      promedio: mean(valuesLote),
      ...iqrValues(valuesLote),
      max: Math.max(...valuesLote),
      min: Math.min(...valuesLote),
  })
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(guardarDatosLote({datos, index}))
  // }, [datos])
  
  return (<GraficoCumplimientoUI datos={datos}/>);
};

export default GraficoCumplimiento;
