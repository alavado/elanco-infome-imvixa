import React, { useEffect } from 'react'
import './Previsualizador.css'
import logoImvixa from "../../assets/images/logo-imvixa.svg";
import logoElanco from "../../assets/images/logo-elanco.svg";
import classNames from "classnames";
import { cargarRegistros } from '../../redux/ducks/previsualizador';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner';
import FormPrevisualizador from './FormPrevisualizador';

const { ipcRenderer } = window.require('electron')

const Previsualizador = () => {
  const dispatch = useDispatch();
  const { cargando } = useSelector(state => state.previsualizador)
  useEffect(() => {
    ipcRenderer.once("registros", async (e, data) => {
      dispatch(cargarRegistros(data))
    });
  }, []);

  return (
    <div className="Previsualizador">
      <div className="Previsualizador__contenedor">
        <div className="Previsualizador__header">
          <div className="Previsualizador__titulo">
            <div>Visualizador de reporte Imvixa</div>
            <div className="logos">
              <img
                src={logoImvixa}
                className="Previsualizador__logo_imvixa"
                alt="Logo Imvixa"
              />
              <img
                src={logoElanco}
                className="Previsualizador__logo_elanco"
                alt="Logo Elanco"
              />
            </div>
          </div>
          <div className="Previsualizador__stepper">
            <div className="Previsualizador__stepper_paso">
              Paso 1/1
            </div>
            <div className="Previsualizador__stepper_desc">
              Seleccione reporte a visualizar
            </div>
          </div>
        </div>
        <div className="Previsualizador__body">
          {
            cargando 
            ? <div className='FormParametros__seccion' style={{position: 'relative', top: '6rem'}}><Spinner/></div>
            : <FormPrevisualizador/>
          }
        </div>
      </div>
    </div>
  )
}

export default Previsualizador