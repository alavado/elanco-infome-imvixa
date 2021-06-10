import { createSlice } from "@reduxjs/toolkit"

const today = new Date()
const slice = createSlice({
  name: 'reporte',
  initialState: {
    pasoActual: 0,
    planillaAlimento: "",
    planillaPMV: "",
    planillaPeces: "",
    planillaEficacia: "",
    empresas: [{value: 'Todas', label: 'Todas'}],
    nombreEmpresa: '',
    divisionTemporal: 'cuatrimestral',
    fechaInicio: null,
    fechaFinal: new Date(today.getFullYear(), today.getMonth(), 0),
    todasLasPlanillas: false,
    errorFormulario: null,

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
      if (state.pasoActual > 0) state.pasoActual -= 1
    },
    guardarPlanillaAlimento(state, action) {
      state.planillaAlimento = action.payload.f.path
      state.empresas = [{value: 'Todas', label: 'Todas'},...action.payload.empresas.map(v => {
        return {value: v, label: v}
      })]
      if (state.planillaEficacia !== '' && state.planillaPeces !== '') {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaPeces(state, action) {
      state.planillaPeces = action.payload.path
      if (state.planillaEficacia !== '' && state.planillaAlimento !== '') {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaEficacia(state, action) {
      state.planillaEficacia = action.payload.path
      if (state.planillaPeces !== '' && state.planillaAlimento !== '') {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    mostrarErrorFormulario(state, action) {
      state.errorFormulario = action.payload
    }
  }
})

export const { 
  guardarPlanillaAlimento,
  guardarPlanillaPeces,
  mostrarErrorFormulario,
  guardarPlanillaEficacia,
  guardaNombreEmpresa,
  guardarFechaDeInicio,
  guardarFechaDeTermino,
  guardarDivisionTemporal,
  pasoSiguiente,
  pasoAnterior } = slice.actions

export default slice.reducer