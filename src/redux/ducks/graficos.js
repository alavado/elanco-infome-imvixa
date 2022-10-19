import { createSlice } from '@reduxjs/toolkit'
import { graficos } from '../../helpers/graficos'

const slice = createSlice({
  name: 'graficos',
  initialState: {
    graficos: graficos.map(g => ({ ...g, visible: true }))
  },
  reducers: {
    ocultarGrafico(state, action) {
      const id = action.payload
      state.graficos = state.graficos.map(g => g.id === id ? ({ ...g, visible: false }) : g)
    },
    mostrarGrafico(state, action) {
      const id = action.payload
      state.graficos = state.graficos.map(g => g.id === id ? ({ ...g, visible: true }) : g)
    },
    cargarGraficos(state, action) {
      state.graficos = action.payload
    },
    limpiarGraficos(state, action) {
      state.graficos = graficos.map(g => ({ ...g, visible: true }))
    }
  },
})

export const {
  ocultarGrafico,
  mostrarGrafico,
  cargarGraficos,
  limpiarGraficos
} = slice.actions

export default slice.reducer
