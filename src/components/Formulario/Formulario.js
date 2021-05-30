import React from 'react'
import logoImvixa from '../../assets/images/logo-imvixa.svg'
import logoElanco from '../../assets/images/logo-elanco.svg'
import FormPlanillas from './FormPlanillas'
import FormParametros from './FormParametros'
import FormExportar from './FormExportar'
import './Formulario.css'

const Formulario = () => {
  const pasos = [
    {
      paso: 1,
      descripcion: "Seleccione las bases de datos",
      componente: FormPlanillas
    },
    {
      paso: 2,
      descripcion: "Seleccione empresa y periodo de análisis",
      componente: FormParametros
    },
    {
      paso: 3,
      descripcion: "Seleccione elementos a exportar",
      componente: FormExportar
    }
  ]
  const pasoSeleccionado = 0

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
            <div className="Formulario__stepper_paso">Paso {pasos[pasoSeleccionado].paso}/3</div>
            <div className="Formulario__stepper_desc">{pasos[pasoSeleccionado].descripcion}</div>
          </div>
        </div>
        <div className="Formulario__body">
          {pasos[pasoSeleccionado].componente()}
        </div>
        <div className="Formulario__botones">
          <div className="Formulario__boton">Volver</div>
          <div className="Formulario__boton">Siguiente</div>
        </div>
      </div>
    </div>
  )
}

export default Formulario
