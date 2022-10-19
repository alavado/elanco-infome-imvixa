import { createSlice } from "@reduxjs/toolkit"
import { 
  filtrarDatosAlimento, 
  filtrarDatosPecesTratados,
  filtrarDatosEficacia,
  filtrarDatosPeces,
  filtrarDatosPecesTratadosSinInicio } from "./utilities"

const today = new Date()
const cumplimientoMax = localStorage.getItem("cumplimientoIndustriaMax")
const cumplimientoMin = localStorage.getItem("cumplimientoIndustriaMin")
const concentracionMax = localStorage.getItem("concentracionIndustriaMax")
const concentracionMin = localStorage.getItem("concentracionIndustriaMin")
const concentracion25 = localStorage.getItem("concentracionIndustria25")
const concentracion50 = localStorage.getItem("concentracionIndustria50")
const concentracion75 = localStorage.getItem("concentracionIndustria75")
const concentracionProm = localStorage.getItem("concentracionIndustriaProm")
const slice = createSlice({
  name: "reporte",
  initialState: {
    nombreEmpresa: "",
    divisionTemporal: "trimestral",
    fechaInicio: null,
    fechaFinal: new Date(today.getFullYear(), today.getMonth(), 0),
    cumplimiento: {
      min: cumplimientoMin ? cumplimientoMin : "",
      max: cumplimientoMax ? cumplimientoMax : "",
      q2: "",
      q3: "",
      q4: "",
      prom: "",
    },
    concentracion: {
      min: concentracionMin ? concentracionMin : "",
      max: concentracionMax ? concentracionMax : "",
      q2: concentracion25 ? concentracion25 : "",
      q3: concentracion50 ? concentracion50 : "",
      q4: concentracion75 ? concentracion75 : "",
      prom: concentracionProm ? concentracionProm : "",
    },
    procesandoParaExportar: false,
    datosFiltradosAlimento: null,
    datosFiltradosPeces: null,
    datosFiltradosEficacia: null,
    datosFiltradosPecesTratados: null,
    datosPecesTratados: null,
    datosFiltradosIndustriaAlimento: null,
    datosFiltradosIndustriaPeces: null,
    datosFiltradosIndustriaEficacia: null,
    comentarios: []
  },
  reducers: {
    guardaNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload.value
    },
    guardarFechaDeInicio(state, action) {
      state.fechaInicio = action.payload
    },
    guardarFechaDeTermino(state, action) {
      state.fechaFinal = action.payload
    },
    guardarDivisionTemporal(state, action) {
      state.divisionTemporal = action.payload
    },
    guardarCumplimiento(state, action) {
      switch (action.payload.tipo) {
        case 'min':
          state.cumplimiento.min = action.payload.valor
          return
        case 'max':
          state.cumplimiento.max = action.payload.valor
          return
        case 'q2':
          state.cumplimiento.q2 = action.payload.valor
          return
        case 'q3':
          state.cumplimiento.q3 = action.payload.valor
          return
        case 'q4':
          state.cumplimiento.q4 = action.payload.valor
          return
        case 'prom':
          state.cumplimiento.prom = action.payload.valor
          return
        default:
          return 
      }
    },
    guardarConcentracion(state, action) {
      switch (action.payload.tipo) {
        case 'min':
          state.concentracion.min = action.payload.valor
          return
        case 'max':
          state.concentracion.max = action.payload.valor
          return
        case 'q2':
          state.concentracion.q2 = action.payload.valor
          return
        case 'q3':
          state.concentracion.q3 = action.payload.valor
          return
        case 'q4':
          state.concentracion.q4 = action.payload.valor
          return
        case 'prom':
          state.concentracion.prom = action.payload.valor
          return
        default:
          return 
      }
    },
    guardarComentarios(state, action) {
      state.comentarios = action.payload
    },
    procesarDatosParaExportar(state, action) {
      const {
        datosAlimento,
        datosPeces,
        datosEficacia,
        datosPecesTratados } = action.payload
      state.datosFiltradosAlimento = filtrarDatosAlimento(
        datosAlimento,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaAlimento = filtrarDatosAlimento(
        datosAlimento,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosPecesTratados = filtrarDatosPecesTratados(
        datosPecesTratados,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosPecesTratados = filtrarDatosPecesTratadosSinInicio(
        datosPecesTratados,
        state.nombreEmpresa,
        state.fechaFinal
      )
      state.datosFiltradosEficacia = filtrarDatosEficacia(
        datosEficacia,
        state.nombreEmpresa,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaEficacia = filtrarDatosEficacia(
        datosEficacia,
        "Todas",
        state.fechaFinal
      )
      state.datosFiltradosPeces = filtrarDatosPeces(
        datosPeces,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaPeces = filtrarDatosPeces(
        datosPeces,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.procesandoParaExportar = true
    },
  },
})

export const {
  guardaNombreEmpresa,
  guardarFechaDeInicio,
  guardarFechaDeTermino,
  guardarDivisionTemporal,
  guardarCumplimiento,
  guardarConcentracion,
  procesarDatosParaExportar,
  guardarComentarios
} = slice.actions

export default slice.reducer
