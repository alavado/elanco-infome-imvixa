import Formulario from '../Formulario'
import Reporte from '../Reporte'
import { Switch, Route, useHistory } from 'react-router-dom'
import './App.css'

const { ipcRenderer } = window.require('electron')

const App = () => {

  const history = useHistory()

  ipcRenderer.on('volverAParametros', () => history.push('/'))

  return (
    <div className="App">
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
