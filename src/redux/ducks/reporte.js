import { createSlice } from "@reduxjs/toolkit"
import { 
  onlyUnique, 
  filtrarDatosAlimento, 
  filtrarDatosTratamiento,
  filtrarDatosEficacia,
  filtrarDatosPeces } from "./utilities"
import { colEmpresaAlimento  } from '../../constants'

const today = new Date()
const slice = createSlice({
  name: "reporte",
  initialState: {
    pasoActual: 0,
    planillaAlimento: "",
    planillaTratamiento: "",
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
    datosTratamiento: null,
    datosEficacia: null,
    procesandoParaExportar: false,
    datosFiltradosAlimento: null,
    datosFiltradosPeces: null,
    datosFiltradosEficacia: null,
    datosFiltradosTratamiento: null,
    datosFiltradosIndustriaAlimento: null,
    datosFiltradosIndustriaPeces: null,
    datosFiltradosIndustriaEficacia: null,
    datosFiltradosIndustriaTratamiento: null,
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
      state.datosAlimento = action.payload.datos
      const empresas = action.payload.datos
        .map((r) => r[colEmpresaAlimento])
        .filter(onlyUnique)
      state.empresas = [
        { value: "Todas", label: "Todas" },
        ...empresas.map((v) => {
          return { value: v, label: v }
        }),
      ]
      if (state.planillaEficacia !== "" && state.planillaPeces !== "" && state.planillaTratamiento !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaTratamiento(state, action) {
      state.planillaTratamiento = action.payload.path
      state.datosTratamiento = action.payload.datos
      if (state.planillaEficacia !== "" && state.planillaAlimento !== "" && state.planillaPeces !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaPeces(state, action) {
      state.planillaPeces = action.payload.path
      state.datosPeces = action.payload.datos
      if (state.planillaEficacia !== "" && state.planillaAlimento !== "" && state.planillaTratamiento !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaEficacia(state, action) {
      state.planillaEficacia = action.payload.path
      state.datosEficacia = action.payload.datos
      if (state.planillaPeces !== "" && state.planillaAlimento !== "" && state.planillaTratamiento !== "") {
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
    },
    limpiarFormularioTratamiento(state, action) {
      state.todasLasPlanillas = false
      state.planillaTratamiento = ""
      state.datosTratamiento = []
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
      state.datosFiltradosIndustriaAlimento = filtrarDatosAlimento(
        state.datosAlimento,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosTratamiento = filtrarDatosTratamiento(
        state.datosTratamiento,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosIndustriaTratamiento = filtrarDatosTratamiento(
        state.datosTratamiento,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosEficacia = filtrarDatosEficacia(
        state.datosEficacia,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaEficacia = filtrarDatosEficacia(
        state.datosEficacia,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosPeces = filtrarDatosPeces(
        state.datosPeces,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaPeces = filtrarDatosPeces(
        state.datosPeces,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.procesandoParaExportar = true
    },
  },
})

export const {
  guardarPlanillaAlimento,
  guardarPlanillaTratamiento,
  guardarPlanillaPeces,
  guardarPlanillaEficacia,
  mostrarErrorFormulario,
  limpiarFormularioAlimento,
  limpiarFormularioTratamiento,
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
