import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comentarios',
  initialState: {
    comentarios: [],
    comentariosMusculo: [],
    comentariosCentro: [],
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
    },
    limpiarComentariosAlimento(state) {
      state.comentariosAlimento = {}
    },
    agregarComentarioMusculo(state, action) {
      const texto = action.payload
      state.comentariosMusculo.push(texto)
    },
    eliminarComentarioMusculo(state, action) {
      const texto = action.payload
      state.comentariosMusculo = state.comentariosMusculo.filter(c => c !== texto)
    },
    agregarComentarioCentro(state, action) {
      const texto = action.payload
      state.comentariosCentro.push(texto)
    },
    eliminarComentarioCentro(state, action) {
      const texto = action.payload
      state.comentariosCentro = state.comentariosCentro.filter(c => c !== texto)
    },
  },
})

export const {
  agregarComentario,
  eliminarComentario,
  agregarComentarioAlimento,
  eliminarComentarioAlimento,
  agregarComentarioMusculo,
  eliminarComentarioMusculo,
  limpiarComentariosAlimento,
  agregarComentarioCentro,
  eliminarComentarioCentro
} = slice.actions

export default slice.reducer
