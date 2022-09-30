import { createSlice } from "@reduxjs/toolkit";
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
} from "../../constants";

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
      const lotes = state.lotesSeleccionados.map((lote, index) => {
        const l = lote.data
        const fecha = l[colFechaAlimento].toString().substring(0,10)
        const programa = l[colCantidadProgramadaAlimento].toLocaleString("de-DE", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })
        const calibre = l[colAlimentoCalibre] ? l[colAlimentoCalibre] : '-'
         // TODO: Guardar datos: Copiar de grafico cumplimiento
         const { cumplimiento } = action.payload;

         // TODO: Guardar headers


        return {
          index,
          informe: l[colInformeAlimento],
          piscicultura: l[colPisciculturaAlimento],
          planta: l[colPlanta],
          pmv: l[colRecetaAlimento],
          lote: l[colLoteAlimento],
          objetivo: l[colConcentracionObjetivo],
          fecha,
          programa,
          calibre,
          datos: [],
          headers: [],
          values: [],
          comentarios: []
        }
      })
      state.lotes = lotes
      state.fecha = new Date().toISOString()
    },
    cargarDatosAlimento(state, action) {
      state.datosSinFiltrar = action.payload;
      const opciones = action.payload.map(v => {
        return { value: v[colLoteAlimento], label: v[colLoteAlimento], data: {...v}};
      });
      opciones.sort((a, b) => a.value - b.value);
      state.lotesTotales = opciones;
    },
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
} = slice.actions;

export default slice.reducer;
