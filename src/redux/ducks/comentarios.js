import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comentarios',
  initialState: {
    comentarios: [],
    comentariosMusculo: [],
    comentariosCentro: [],
    comentariosAlimento: {},
    preViz: false
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
      state.preViz = false // se ha modificado
    },
    eliminarComentarioAlimento(state, action) {
      state.preViz = false // se ha modificado
      const { texto, indice } = action.payload
      state.comentariosAlimento[indice] = state.comentariosAlimento[indice].filter(c => c !== texto)
    },
    limpiarComentariosAlimento(state) {
      state.comentariosAlimento = {}
      state.preViz = false 
    },
    limpiarComentarios(state) {
      state.comentariosAlimento = {}
      state.comentariosCentro = []
      state.comentariosMusculo = []
      state.comentarios = []
      state.preViz = false 
    },
    agregarComentarioMusculo(state, action) {
      state.preViz = false // se ha modificado
      const texto = action.payload
      state.comentariosMusculo.push(texto)
    },
    eliminarComentarioMusculo(state, action) {
      state.preViz = false // se ha modificado
      const texto = action.payload
      state.comentariosMusculo = state.comentariosMusculo.filter(c => c !== texto)
    },
    agregarComentarioCentro(state, action) {
      state.preViz = false // se ha modificado
      const texto = action.payload
      state.comentariosCentro.push(texto)
    },
    eliminarComentarioCentro(state, action) {
      state.preViz = false // se ha modificado
      const texto = action.payload
      state.comentariosCentro = state.comentariosCentro.filter(c => c !== texto)
    },
    cargarComentariosAlimento(state, action) {
      state.comentariosAlimento = [action.payload]
      state.preViz = true
    },
    cargarComentariosMusculo(state, action) {
      state.comentariosMusculo = action.payload
      state.preViz = true
    },
    cargarComentariosCentro(state, action) {
      state.comentariosCentro = action.payload
      state.preViz = true
    },
    cargarComentariosSeguimiento(state, action) {
      state.comentarios = action.payload
      state.preViz = true
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
  limpiarComentarios,
  agregarComentarioCentro,
  eliminarComentarioCentro,
  cargarComentariosAlimento,
  cargarComentariosMusculo,
  cargarComentariosCentro,
  cargarComentariosSeguimiento
} = slice.actions

export default slice.reducer
