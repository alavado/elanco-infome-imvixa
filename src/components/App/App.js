import React, { useEffect } from "react";
import Formulario from '../Formulario'
import Reporte from '../Reporte'
import { Switch, Route, useHistory } from 'react-router-dom'
import './App.css'
import Actualizando from '../Actualizando'
import { useDispatch } from 'react-redux'
import { mostrarGrafico, ocultarGrafico } from '../../redux/ducks/graficos'
import {
  cargarConfigGraficos,
} from "../../redux/ducks/reporteCentro";
import {
  cambiarIdioma
} from "../../redux/ducks/parametrosGenerales";
import {
  cambiarIdioma as cambiarIdiomaViz
} from "../../redux/ducks/previsualizador";
import Visualizador from "../Visualizador";
import Selector from "../Selector";
import Previsualizador from "../Previsualizador";

const { ipcRenderer } = window.require('electron')

const App = () => {

  const history = useHistory()
  const dispatch = useDispatch()


  ipcRenderer.on('ocultar-grafico', (_, args) => dispatch(ocultarGrafico(args.id)))
  ipcRenderer.on('mostrar-grafico', (_, args) => dispatch(mostrarGrafico(args.id)))

  // Cargar configuracion reporte centro
  useEffect(() => {
    ipcRenderer.on('volverAParametros', () => {
      history.goBack()})
    ipcRenderer.send("cargarConfiguracionGraficos");
    ipcRenderer.on("cargarConfiguracionGraficos", async (e, data) => {
      if (data !== null) {
        // cargar config graficos en state
        dispatch(cargarConfigGraficos(data));
      } else {
        console.log("NO HAY ARCHIVO DE CONF")
      }
    });
    ipcRenderer.on("cambiarIdioma", async (e) => {
      dispatch(cambiarIdioma());
      dispatch(cambiarIdiomaViz());
    });
  }, []);

  return (
    <div className="App">
      <Actualizando />
      <Switch>
        <Route exact path="/visualizador">
          <Visualizador />
        </Route>
        <Route exact path="/reporte">
          <Reporte />
        </Route>
        <Route exact path="/formulario">
          <Formulario />
        </Route>
        <Route exact path="/previz">
          <Previsualizador />
        </Route>
        <Route exact path="/">
          <Selector />
        </Route>
      </Switch>
    </div>
  )
}

export default App
