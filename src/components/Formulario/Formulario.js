import React, { useMemo } from 'react'
import logoImvixa from '../../assets/images/logo-imvixa.svg'
import logoElanco from '../../assets/images/logo-elanco.svg'
import FormPlanillas from './FormPlanillas'
import FormParametros from './FormParametros'
import FormExportar from './FormExportar'
import './Formulario.css'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pasoAnterior, pasoSiguiente } from '../../redux/ducks/reporte'

const Formulario = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const indicePasoActual = useSelector(state => state.reporte.pasoActual)
  
  const pasos = useMemo(() => [
    {
      paso: 1,
      descripcion: "Seleccione las bases de datos",
      componente: <FormPlanillas />,
      volver: "",
      siguiente: "Siguiente",
      onClickSiguiente: () => dispatch(pasoSiguiente())
    },
    {
      paso: 2,
      descripcion: "Seleccione empresa y periodo de análisis",
      componente: <FormParametros />,
      volver: "Volver",
      siguiente: "Siguiente",
      onClickSiguiente: () => dispatch(pasoSiguiente())
    },
    {
      paso: 3,
      descripcion: "Seleccione elementos a exportar",
      componente: <FormExportar />,
      volver: "Volver",
      siguiente: "Exportar",
      onClickSiguiente: () => history.push('/reporte')
    }
  ], [dispatch, history])

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
          {pasoActual.componente}
        </div>
        <div className="Formulario__botones">
          <button 
            className="Formulario__boton"
            onClick={pasoActual.onClickSiguiente}
            >{pasoActual.siguiente}</button>
          {
            indicePasoActual === 0 
            ? null 
            : <button className="Formulario__boton" onClick={() => dispatch(pasoAnterior())}>{pasoActual.volver}</button>}
        </div>
      </div>
    </div>
  )
}

export default Formulario
