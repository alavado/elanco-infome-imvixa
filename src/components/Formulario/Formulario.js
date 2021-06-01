import React from 'react'
import logoImvixa from '../../assets/images/logo-imvixa.svg'
import logoElanco from '../../assets/images/logo-elanco.svg'
import FormPlanillas from './FormPlanillas'
import FormParametros from './FormParametros'
import FormExportar from './FormExportar'
import './Formulario.css'
import { useDispatch, useSelector } from 'react-redux'
import { pasoAnterior, pasoSiguiente } from '../../redux/ducks/reporte'

const Formulario = () => {
  const pasos = [
    {
      paso: 1,
      descripcion: "Seleccione las bases de datos",
      componente: FormPlanillas,
      volver: "",
      siguiente: "Siguiente",
    },
    {
      paso: 2,
      descripcion: "Seleccione empresa y periodo de análisis",
      componente: FormParametros,
      volver: "Volver",
      siguiente: "Siguiente",
    },
    {
      paso: 3,
      descripcion: "Seleccione elementos a exportar",
      componente: FormExportar,
      volver: "Volver",
      siguiente: "Generar reporte"
    }
  ]
  const dispatch = useDispatch()
  const indicePasoActual = useSelector(state => state.reporte.pasoActual)
  const pasoActual = pasos[indicePasoActual]

  return (
    <div className="Formulario">
      <div className="Formulario__contenedor">
        <div className="Formulario__header">
          <div className="Formulario__titulo">
            <div>
                Generador de reporte Imvixa
            </div>
            <div className="logos">
              <img src={logoImvixa} className="Formulario__logo_imvixa" alt="Logo Imvixa" />
              <img src={logoElanco} className="Formulario__logo_elanco" alt="Logo Elanco" />
            </div>
          </div>
          <div className="Formulario__stepper">
            <div className="Formulario__stepper_paso">Paso {pasoActual.paso}/3</div>
            <div className="Formulario__stepper_desc">{pasoActual.descripcion}</div>
          </div>
        </div>
        <div className="Formulario__body">
          {pasoActual.componente()}
        </div>
        <div className="Formulario__botones">
          <div 
            className="Formulario__boton"
            onClick={() => dispatch(pasoSiguiente())}
          >{pasoActual.siguiente}</div>
          {
            indicePasoActual === 0 
            ? null 
            : <div className="Formulario__boton" onClick={() => dispatch(pasoAnterior())}>{pasoActual.volver}</div>}
        </div>
      </div>
    </div>
  )
}

export default Formulario
