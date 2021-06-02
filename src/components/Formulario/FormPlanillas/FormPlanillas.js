import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { guardarPlanillaAlimento, guardarPlanillaEficacia, guardarPlanillaPeces, guardarPlanillaPMV } from '../../../redux/ducks/reporte'
import './FormPlanillas.css'

const FormPlanillas = () => {
  const dispatch = useDispatch()
  const { 
    planillaAlimento,
    planillaPMV,
    planillaPeces,
    planillaEficacia
  } = useSelector(state => state.reporte)

  const selectFile = (e, action) => {
    dispatch(action(e.target.files[0].path))
  }
  return (
    <div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__1" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> Alimento</div>
          <div className="FormPlanillas__planilla__label__file">{planillaAlimento}</div>
        </label>
        <input id="FormPlanillas__planilla__1" type="file" onChange={e => selectFile(e, guardarPlanillaAlimento)}></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__2" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> PMV</div>
          <div className="FormPlanillas__planilla__label__file">{planillaPMV}</div>
        </label>
        <input id="FormPlanillas__planilla__2" type="file" onChange={e => selectFile(e, guardarPlanillaPMV)}></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__3" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> Peces</div>
          <div className="FormPlanillas__planilla__label__file">{planillaPeces}</div>
        </label>
        <input id="FormPlanillas__planilla__3" type="file" onChange={e => selectFile(e, guardarPlanillaPeces)}></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label htmlFor="FormPlanillas__planilla__4" className="FormPlanillas__planilla__label">
          <div className="FormPlanillas__planilla__label__button"> Eficacia</div>
          <div className="FormPlanillas__planilla__label__file">{planillaEficacia}</div>
        </label>
        <input id="FormPlanillas__planilla__4" type="file" onChange={e => selectFile(e, guardarPlanillaEficacia)}></input>
      </div>
    </div>
  )
}

export default FormPlanillas
