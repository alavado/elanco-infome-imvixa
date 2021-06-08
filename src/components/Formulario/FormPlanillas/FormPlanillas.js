import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarPlanillaAlimento,
  guardarPlanillaEficacia,
  guardarPlanillaPeces,
  mostrarErrorFormulario,
} from "../../../redux/ducks/reporte";
import { 
  readFile,
  checkAlimento,
  checkPeces,
  checkEficacia,
  getShortPath
 } from "./validation"
import "./FormPlanillas.css";
var XLSX = require("xlsx");


const FormPlanillas = () => {
  const dispatch = useDispatch();
  const {
    planillaAlimento,
    planillaPeces,
    planillaEficacia,
  } = useSelector((state) => state.reporte);

  const selectFile = (e, validationFunction, action) => {
    if (e.target.files == null) return;
    try {
      var path = e.target.files[0].path;
      readFile(e.target.files, validationFunction)
      dispatch(action(path));
    } catch (error) {
      dispatch(mostrarErrorFormulario(
        "La planilla que intentó cargar no cumple con el formato necesario."));
      console.log(error);
    }
  };

  return (
    <div>
      <div className="FormPlanillas__planilla">
        <label
          htmlFor="FormPlanillas__planilla__1"
          className="FormPlanillas__planilla__label"
        >
          <div className="FormPlanillas__planilla__label__button">Alimento</div>
          <div className="FormPlanillas__planilla__label__file">
            {getShortPath(planillaAlimento)}
          </div>
        </label>
        <input
          id="FormPlanillas__planilla__1"
          type="file"
          accept=".csv, .xl*"
          onChange={(e) =>
            selectFile(e, checkAlimento, guardarPlanillaAlimento)
          }
        ></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label
          htmlFor="FormPlanillas__planilla__3"
          className="FormPlanillas__planilla__label"
        >
          <div className="FormPlanillas__planilla__label__button"> Peces</div>
          <div className="FormPlanillas__planilla__label__file">
            {getShortPath(planillaPeces)}
          </div>
        </label>
        <input
          id="FormPlanillas__planilla__3"
          type="file"
          accept=".csv, .xl*"
          onChange={(e) => selectFile(e, checkPeces, guardarPlanillaPeces)}
        ></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label
          htmlFor="FormPlanillas__planilla__4"
          className="FormPlanillas__planilla__label"
        >
          <div className="FormPlanillas__planilla__label__button">
            {" "}
            Eficacia
          </div>
          <div className="FormPlanillas__planilla__label__file">
            {getShortPath(planillaEficacia)}
          </div>
        </label>
        <input
          id="FormPlanillas__planilla__4"
          type="file"
          accept=".csv, .xl*"
          onChange={(e) =>
            selectFile(e, checkEficacia, guardarPlanillaEficacia)
          }
        ></input>
      </div>
      <div id="htmlout"></div>
    </div>
  );
};

export default FormPlanillas;
