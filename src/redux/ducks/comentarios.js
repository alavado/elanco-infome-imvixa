import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comentarios',
  initialState: {
    comentarios: [],
    comentariosAlimento: {}
  },
  reducers: {
    agregarComentario(state, action) {
      const texto = action.payload
      state.comentarios.push(texto)
    },
    eliminarComentario(state, action) {
      const texto = action.payload
      state.comentarios = state.comentarios.filter(c => c !== texto)
    },
    agregarComentarioAlimento(state, action) {
      const { texto, indice } = action.payload
      if (!state.comentariosAlimento[indice]) {
        state.comentariosAlimento[indice] = []
      }
      state.comentariosAlimento[indice].push(texto)
    },
    eliminarComentarioAlimento(state, action) {
      const { texto, indice } = action.payload
      state.comentariosAlimento[indice] = state.comentariosAlimento[indice].filter(c => c !== texto)
    }
  },
})

export const {
  agregarComentario,
  eliminarComentario,
  agregarComentarioAlimento,
  eliminarComentarioAlimento
} = slice.actions

export default slice.reducer
