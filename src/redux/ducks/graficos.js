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
  },
})

export const {
  ocultarGrafico,
  mostrarGrafico,
} = slice.actions

export default slice.reducer
