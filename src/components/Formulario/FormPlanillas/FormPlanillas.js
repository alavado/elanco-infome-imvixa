import React from 'react'
import './FormPlanillas.css'

const FormPlanillas = () => {
  const file = ""
  return (
    <div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__1" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> Alimento</div>
          <div className="FormPlanillas__planilla__label__file">{file}</div>
        </label>
        <input id="FormPlanillas__planilla__1" type="file"></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__2" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> PMV</div>
          <div className="FormPlanillas__planilla__label__file">{file}</div>
        </label>
        <input id="FormPlanillas__planilla__2" type="file"></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__3" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> Peces</div>
          <div className="FormPlanillas__planilla__label__file">{file}</div>
        </label>
        <input id="FormPlanillas__planilla__3" type="file"></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__4" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> Eficacia</div>
          <div className="FormPlanillas__planilla__label__file">{file}</div>
        </label>
        <input id="FormPlanillas__planilla__4" type="file"></input>
      </div>
    </div>
  )
}

export default FormPlanillas
