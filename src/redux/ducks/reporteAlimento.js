import { createSlice } from "@reduxjs/toolkit";
import { 
  colEmpresaAlimento,
  colPisciculturaAlimento,
  colAñoAlimento,
  colFechaAlimento,
  colLoteAlimento } from "../../constants";

const slice = createSlice({
  name: "reporteAlimento",
  initialState: {
    nombreEmpresa: "",
    año: null,
    piscicultura: null,
    fecha: null,
    lotes: [],
    lotesOpciones: [],
    datosFiltradosAlimento: null,
    datosLotes: null,
    procesandoParaExportar: false
  },
  reducers: {
    guardarNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload.value;
      state.fecha = null;
      state.piscicultura = null;
      state.año = null;
      state.lotes = [];
      state.lotesOpciones = [];
    },
    guardarPiscicultura(state, action) {
      state.piscicultura = action.payload;
      state.fecha = null;
      state.año = null;
      state.lotes = [];
      state.lotesOpciones = [];
    },
    guardarAño(state, action) {
      state.año = action.payload;
      state.fecha = null;
      state.lotes = [];
      state.lotesOpciones = [];
    },
    guardarFecha(state, action) {
      state.fecha = action.payload.fecha;
      state.lotesOpciones = [
        ...action.payload.datosLotes.reduce((acc, current) => {
          if (
            current[colEmpresaAlimento] === state.nombreEmpresa &&
            current[colPisciculturaAlimento] === state.piscicultura.value &&
            current[colAñoAlimento] === state.año.value &&
            current[colFechaAlimento].startsWith(state.fecha.value)
          ) {
            acc.push(current[colLoteAlimento]);
          }
          return acc;
        }, []),
      ]
        .sort((a, b) => a - b)
        .map((v) => {
          return { value: v, label: v };
        })
        state.lotes = state.lotesOpciones
    },
    guardarLotes(state, action) {
      if (action.payload.length > 0) {
        state.lotes = action.payload;
      }
    },
    procesarDatosParaExportar(state, action) {
      const datos = action.payload.filter((obj) => obj[colEmpresaAlimento] === state.nombreEmpresa);
      state.datosFiltradosAlimento = datos
      console.log(datos)
      state.datosLotes = state.lotes.map(l => datos.find((obj) => obj[colLoteAlimento] === l.value && obj[colPisciculturaAlimento] === state.piscicultura.value));
      state.procesandoParaExportar = true;
    },
  },
});

export const {
  guardarNombreEmpresa,
  guardarPiscicultura,
  guardarAño,
  guardarFecha,
  guardarLotes,
  procesarDatosParaExportar,
} = slice.actions;

export default slice.reducer;
