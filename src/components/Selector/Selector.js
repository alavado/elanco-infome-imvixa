import React from 'react'
import './Selector.css'
import logoImvixa from "../../assets/images/logo-imvixa.svg";
import logoElanco from "../../assets/images/MDS.svg";
import { useHistory } from 'react-router-dom'

const { ipcRenderer } = window.require('electron')

const Selector = () => {
  const history = useHistory()

  const goToPreViz = async () => {
    ipcRenderer.send("leerRegistro");
    history.push('/previz')
  };
  return (
    <div className="Selector">
      <div className="Selector__contenedor">
        <div className="Selector__header">
          <div className="Selector__titulo">
            <div>Visualizador de reporte Imvixa/Slice</div>
            <div className="logos">
              <img
                src={logoElanco}
                className="Selector__logo_elanco"
                alt="Logo MDS"
              />
            </div>
          </div>
          <div className="Selector__stepper">
            <div className="Selector__stepper_paso">
              Bienvenido
            </div>
            <div className="Selector__stepper_desc">
              Seleccione la opción con la que desea continuar
            </div>
          </div>
        </div>
        <div className="Selector__body">
          <div className='Selector__seccion'>
            <button
              onClick={() => goToPreViz()}
              className="Selector_boton"
            >
              Visualizar reportes impresos
            </button>
            <button
              onClick={() => history.push('/formulario')}
              className="Selector_boton"
            >
              Generar nuevo reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Selector