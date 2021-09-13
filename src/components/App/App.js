import Formulario from '../Formulario'
import Reporte from '../Reporte'
import { Switch, Route, useHistory } from 'react-router-dom'
import './App.css'
import Actualizando from '../Actualizando'
import { useDispatch } from 'react-redux'
import { mostrarGrafico, ocultarGrafico } from '../../redux/ducks/graficos'

const { ipcRenderer } = window.require('electron')

const App = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  ipcRenderer.on('volverAParametros', () => history.push('/'))
  ipcRenderer.on('ocultar-grafico', (_, args) => dispatch(ocultarGrafico(args.id)))
  ipcRenderer.on('mostrar-grafico', (_, args) => dispatch(mostrarGrafico(args.id)))

  return (
    <div className="App">
      <Actualizando />
      <Switch>
        <Route exact path="/reporte">
          <Reporte />
        </Route>
        <Route exact path="/">
          <Formulario />
        </Route>
      </Switch>
    </div>
  )
}

export default App
