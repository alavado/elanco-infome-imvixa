import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comentarios',
  initialState: {
    comentarios: []
  },
  reducers: {
    agregarComentario(state, action) {
      const texto = action.payload
      state.comentarios.push(texto)
    },
    eliminarComentario(state, action) {
      const texto = action.payload
      state.comentarios = state.comentarios.filter(c => c !== texto)
    }
  },
})

export const {
  agregarComentario,
  eliminarComentario,
} = slice.actions

export default slice.reducer
