import { createSlice } from "@reduxjs/toolkit";
import { iqrValues, iqrValuesFixed, mean } from "../../components/Reporte/utilitiesReporte";
import {
  colEmpresaAlimento,
  colPisciculturaAlimento,
  colRecetaAlimento,
  colFechaAlimento,
  colLoteAlimento,
  colConcentracionObjetivo,
  colInformeAlimento,
  colAlimentoCalibre,
  colCantidadProgramadaAlimento,
  colPlanta,
  colAlimentoMuestra,
  colCumplimiento,
  colAlimentoSTD,
  colAlimentoCV,
  colAlimentoProm,
} from "../../constants";
import { esMayorQueFecha, esMenorQueFecha, selectMinMaxFecha } from "./utilities";

const slice = createSlice({
  name: "reporteAlimento",
  initialState: {
    nombreEmpresa: null,
    opcionEmpresa: null,
    piscicultura: null,
    fecha: null,
    pmv: null,
    lotesSeleccionados: [],
    lotesTotales: [],
    datosFiltradosAlimento: null,
    datosLotes: null,
    datosSinFiltrar: null,
    procesandoParaExportar: false,
    filtros: [], // colEmpresaAlimento, colFechaAlimento, colPisciculturaAlimento
    lotes: [],
    fechaReporte: null
  },
  reducers: {
    guardarNombreEmpresa(state, action) {
      state.opcionEmpresa = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colEmpresaAlimento)) {
          state.filtros = [...state.filtros, colEmpresaAlimento]
        }
      } else {
        state.filtros = state.filtros.filter(v => v !== colEmpresaAlimento)
      }
    },
    guardarPiscicultura(state, action) {
      state.piscicultura = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colPisciculturaAlimento)) {
          state.filtros = [...state.filtros, colPisciculturaAlimento]
        }
      } else {
        console.log("BORRANDO FILTRO PISCICULTURA")
        state.filtros = state.filtros.filter(v => v !== colPisciculturaAlimento)
      }
    },
    guardarFecha(state, action) {
      state.fecha = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colFechaAlimento)) {
          state.filtros = [...state.filtros, colFechaAlimento]
        }
      } else {
        console.log("BORRANDO FILTRO FECHA")
        state.filtros = state.filtros.filter(v => v !== colFechaAlimento)
      }
    },
    guardarPMV(state, action) {
      state.pmv = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colRecetaAlimento)) {
          state.filtros = [...state.filtros, colRecetaAlimento]
        }
      } else {
        state.filtros = state.filtros.filter(v => v !== colRecetaAlimento)
      }
    },
    guardarLotes(state, action) {
      if (action.payload !== null && action.payload.length > 0) {
        if (!state.filtros.includes(colLoteAlimento)) {
          state.lotesSeleccionados = action.payload;
          if (!state.filtros.includes(colEmpresaAlimento)) {
            state.filtros = [...state.filtros, colEmpresaAlimento]
            const nombreEmpresa = action.payload[0].data[colEmpresaAlimento]
            state.opcionEmpresa = { value: nombreEmpresa, label: nombreEmpresa }
          }
        }
      } else {
        state.lotesSeleccionados = []
        state.filtros = state.filtros.filter(v => v !== colLoteAlimento)
      }
    },
    procesarDatosParaExportar(state, action) {
      const nombreEmpresa = state.lotesSeleccionados[0].data[colEmpresaAlimento]
      state.nombreEmpresa = nombreEmpresa
      state.opcionEmpresa = { value: nombreEmpresa, label: nombreEmpresa }
      state.procesandoParaExportar = true;

      const { cumplimiento } = action.payload;
      const lotesEjercicio = state.lotesSeleccionados.map((l) => l.data[colLoteAlimento]);
      const minFechasLotes = new Date(
        selectMinMaxFecha(
          state.lotesSeleccionados.map((l) => l.data[colFechaAlimento])
        )[0]
      );
      const primerDiaDelMes = new Date(
        [
          minFechasLotes.getMonth() + 1,
          "01",
          minFechasLotes.getFullYear() - 1,
        ].join("-")
      );

      const lotes = state.lotesSeleccionados.map((lote, index) => {
        const datoLote = lote.data
        const programa = datoLote[colCantidadProgramadaAlimento] ? datoLote[colCantidadProgramadaAlimento].toLocaleString("de-DE", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }) : '-'
        const calibre = datoLote[colAlimentoCalibre] ? datoLote[colAlimentoCalibre] : '-'
        // Guardar datos de grafico cumplimiento
        const lotesTotalesPeriodo = state.lotesTotales.filter(
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
          nombre: `Industria ${datoLote[colEmpresaAlimento]}`,
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
              ? cumplimiento.min
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
          nombre: datoLote[colLoteAlimento].toString(),
            promedio: mean(valuesLote),
            ...iqrValues(valuesLote),
            max: Math.max(...valuesLote),
            min: Math.min(...valuesLote),
        })

         // Guardar headers y values Tabla Lotes
         const headers = ["Lote"];
         let values = [datoLote[colLoteAlimento]];
       
         Object.entries(datoLote).forEach((e) => {
           if (e[0].startsWith(colAlimentoMuestra) && e[1]) {
             headers.push(e[0].split(' ').join('\n'));
             values.push(
               e[1].toLocaleString("de-DE", {
                 maximumFractionDigits: 1,
                 minimumFractionDigits: 1,
               })
             );
           }
         });
       
         [
           "Promedio\n(ppm)", "CV\n", "Cumplimiento\n", "Desviación\nEstándar"
         ].forEach((v) => headers.push(v))
       
         values = [
           ...values,
           datoLote[colAlimentoProm].toLocaleString("de-DE", {
             maximumFractionDigits: 1,
             minimumFractionDigits: 1,
           }),
           (datoLote[colAlimentoCV] * 100).toLocaleString("de-DE", {
             maximumFractionDigits: 1,
             minimumFractionDigits: 1,
           }) + '%',
           (datoLote[colCumplimiento] * 100).toLocaleString("de-DE", {
             maximumFractionDigits: 1,
             minimumFractionDigits: 1,
           }) + '%',
           datoLote[colAlimentoSTD].toLocaleString("de-DE", {
             maximumFractionDigits: 1,
             minimumFractionDigits: 1,
           })
         ]

        return {
          index,
          informe: datoLote[colInformeAlimento],
          piscicultura: datoLote[colPisciculturaAlimento],
          planta: datoLote[colPlanta],
          pmv: datoLote[colRecetaAlimento],
          lote: datoLote[colLoteAlimento],
          objetivo: datoLote[colConcentracionObjetivo],
          fecha: datoLote[colFechaAlimento],
          programa,
          calibre,
          datos: [...datos],
          headers: [...headers],
          values: [...values],
          comentarios: []
        }
      })
      state.lotes = lotes
      state.fechaReporte = new Date().toISOString()
    },
    cargarDatosAlimento(state, action) {
      state.datosSinFiltrar = action.payload;
      const opciones = action.payload.map(v => {
        return { value: v[colLoteAlimento], label: v[colLoteAlimento], data: {...v}};
      });
      opciones.sort((a, b) => a.value - b.value);
      state.lotesTotales = opciones;
    },
    guardarComentariosLote(state, action) {
      const { index, comentarios } = action.payload
      const copyLotes = [...state.lotes]
      copyLotes[index].comentarios = comentarios
      state.lotes = copyLotes
      console.log('GUARDAR COMENTARIOS')
    },
    cargarPreViz(state, action) {
      const { fecha, nombreEmpresa, lotes } = action.payload
      state.fechaReporte = fecha
      state.nombreEmpresa = nombreEmpresa
      state.lotes = lotes
    }
  },
});

export const {
  guardarNombreEmpresa,
  guardarPiscicultura,
  guardarPMV,
  guardarFecha,
  guardarLotes,
  procesarDatosParaExportar,
  cargarDatosAlimento,
  guardarComentariosLote,
  cargarPreViz
} = slice.actions;

export default slice.reducer;
