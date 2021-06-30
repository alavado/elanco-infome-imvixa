import { createSlice } from "@reduxjs/toolkit"
import { 
  onlyUnique, 
  filtrarDatosAlimento, 
  filtrarDatosPMV,
  filtrarDatosEficacia,
  filtrarDatosPeces } from "./utilities"

const today = new Date()
const slice = createSlice({
  name: "reporte",
  initialState: {
    pasoActual: 0,
    planillaAlimento: "",
    planillaPeces: "",
    planillaEficacia: "",
    empresas: [{ value: "Todas", label: "Todas" }],
    nombreEmpresa: "",
    divisionTemporal: "trimestral",
    fechaInicio: null,
    fechaFinal: new Date(today.getFullYear(), today.getMonth(), 0),
    todasLasPlanillas: false,
    errorFormulario: null,
    datosAlimento: null,
    datosPeces: null,
    datosPMV: null,
    datosEficacia: null,
    procesandoParaExportar: false,
    datosFiltradosAlimento: null,
    datosFiltradosPeces: null,
    datosFiltradosEficacia: null,
    datosFiltradosPMV: null,
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
    pasoSiguiente(state) {
      if (state.pasoActual < 2) state.pasoActual += 1
    },
    pasoAnterior(state) {
      if (state.pasoActual > 0) {
        state.pasoActual -= 1
        state.errorFormulario = null
      }
    },
    guardarPlanillaAlimento(state, action) {
      state.planillaAlimento = action.payload.path
      state.datosAlimento = action.payload.datos.datosAlimento
      state.datosPMV = action.payload.datos.datosPMV
      const empresas = state.datosAlimento
        .map((r) => r.Cliente)
        .filter(onlyUnique)
      state.empresas = [
        { value: "Todas", label: "Todas" },
        ...empresas.map((v) => {
          return { value: v, label: v }
        }),
      ]
      if (state.planillaEficacia !== "" && state.planillaPeces !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaPeces(state, action) {
      state.planillaPeces = action.payload.path
      state.datosPeces = action.payload.datos
      if (state.planillaEficacia !== "" && state.planillaAlimento !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaEficacia(state, action) {
      state.planillaEficacia = action.payload.path
      state.datosEficacia = action.payload.datos
      if (state.planillaPeces !== "" && state.planillaAlimento !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    mostrarErrorFormulario(state, action) {
      state.errorFormulario = action.payload
    },
    limpiarFormularioAlimento(state, action) {
      state.todasLasPlanillas = false
      state.planillaAlimento = ""
      state.datosAlimento = []
      state.datosPMV = []
    },
    limpiarFormularioPeces(state, action) {
      state.todasLasPlanillas = false
      state.planillaPeces = ""
      state.datosPeces = []
    },
    limpiarFormularioEficacia(state, action) {
      state.todasLasPlanillas = false
      state.planillaEficacia = ""
      state.datosEficacia = []
    },
    procesarDatosParaExportar(state) {
      state.datosFiltradosAlimento = filtrarDatosAlimento(
        state.datosAlimento,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosPMV = filtrarDatosPMV(
        state.datosPMV,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosEficacia = filtrarDatosEficacia(
        state.datosEficacia,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosPeces = filtrarDatosPeces(
        state.datosPeces,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.procesandoParaExportar = true
    },
  },
})

export const {
  guardarPlanillaAlimento,
  guardarPlanillaPeces,
  guardarPlanillaEficacia,
  mostrarErrorFormulario,
  limpiarFormularioAlimento,
  limpiarFormularioPeces,
  limpiarFormularioEficacia,
  guardaNombreEmpresa,
  guardarFechaDeInicio,
  guardarFechaDeTermino,
  guardarDivisionTemporal,
  pasoSiguiente,
  pasoAnterior,
  procesarDatosParaExportar,
} = slice.actions

export default slice.reducer
