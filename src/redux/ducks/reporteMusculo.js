import { createSlice } from "@reduxjs/toolkit";
import {
  colEmpresaPeces as colEmpresa,
  colPisciculturaPeces as colPiscicultura,
  colFechaPeces as colFecha,
} from "../../constants";

const slice = createSlice({
  name: "reporteMusculo",
  initialState: {
    nombreEmpresa: null,
    piscicultura: null,
    fecha: null,
    datosPeces: null,
    datosAlimento: null,
    opcion: null,
    filtros: [], // colEmpresa, colFecha, colPiscicultura
    umbral: 12000,
  },
  reducers: {
    guardarNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colEmpresa)) {
          state.filtros = [...state.filtros, colEmpresa];
        }
      } else {
        state.filtros = state.filtros.filter((v) => v !== colEmpresa);
      }
    },
    guardarPiscicultura(state, action) {
      state.piscicultura = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colPiscicultura))
          state.filtros = [...state.filtros, colPiscicultura];
      } else {
        state.filtros = state.filtros.filter((v) => v !== colPiscicultura);
      }
    },
    guardarFecha(state, action) {
      state.fecha = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colFecha))
          state.filtros = [...state.filtros, colFecha];
      } else {
        state.filtros = state.filtros.filter((v) => v !== colFecha);
      }
    },
    procesarDatosParaExportar(state, action) {
      state.opcion = action.payload;
      state.nombreEmpresa = action.payload[colEmpresa];
      state.procesandoParaExportar = true;
    },
    cargarDatosMusculo(state, action) {
      state.datosPeces = action.payload.datosPeces;
      console.log({
        pecesitos: action.payload.datosPeces
      })
      state.datosAlimento = action.payload.datosAlimento;
    },
  },
});

export const {
  guardarNombreEmpresa,
  guardarPiscicultura,
  guardarFecha,
  cargarDatosMusculo,
  procesarDatosParaExportar,
} = slice.actions;

export default slice.reducer;
