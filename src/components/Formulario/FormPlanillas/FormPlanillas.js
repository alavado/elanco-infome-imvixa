import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarPlanillaAlimento,
  guardarPlanillaEficacia,
  guardarPlanillaPeces,
  mostrarErrorFormulario,
} from "../../../redux/ducks/reporte";
import "./FormPlanillas.css";
var XLSX = require("xlsx");

const processWb = function (wb) {
  const HTMLOUT = document.getElementById("htmlout");
  wb.SheetNames.forEach(function (sheetName) {
    const htmlstr = XLSX.utils.sheet_to_html(wb.Sheets[sheetName], {
      editable: false,
    });
    HTMLOUT.innerHTML += htmlstr;
  });
};

const checkAlimento = (e) => {
  // Revisar que tenga las columnas de alimento

  // Revisar que tenga datos

  // Revisar que tenga las columnas de PMV

  // Revisar que tenga datos
  return true;
};

const checkPeces = (e) => {
  // Revisar que tenga las columnas de peces

  // Revisar que tenga datos
  return true;
};

const checkEficacia = (e) => {
  // Revisar que tenga las columnas de eficacia

  // Revisar que tenga datos
  return true;
};

const readFile = function (files, processWb) {
  const f = files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    let data = e.target.result;
    data = new Uint8Array(data);
    processWb(XLSX.read(data, { type: "array" }));
  };
  reader.readAsArrayBuffer(f);
};

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
      readFile(e.target.files, validationFunction);
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
            {planillaAlimento}
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
            {planillaPeces}
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
            {planillaEficacia}
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
