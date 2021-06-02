import Formulario from '../Formulario'
import Reporte from '../Reporte'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import ParametrosIniciales from '../ParametrosIniciales'

const App = () => {
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
