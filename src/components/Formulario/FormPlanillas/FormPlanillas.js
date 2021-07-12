import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarPlanillaAlimento,
  guardarPlanillaEficacia,
  guardarPlanillaPeces,
  guardarPlanillaTratamiento,
  limpiarFormularioAlimento,
  limpiarFormularioEficacia,
  limpiarFormularioPeces,
  limpiarFormularioTratamiento,
  mostrarErrorFormulario,
} from "../../../redux/ducks/reporte";

import "./FormPlanillas.css";
const { ipcRenderer } = window.require("electron");

const getShortPath = (path) => {
  if (path.length < 50) return path;
  const splitted = path.split("\\");
  return [splitted[0], "...", ...splitted.slice(-2)].join("\\");
};

const FormPlanillas = () => {
  const dispatch = useDispatch();

  const leerPlanilla = async (tipo, path) => {
    if (path) {
      const data = ipcRenderer.send("leer", { tipo, path });
    }
  };

  const dispatchErrorFormulario = () => dispatch(mostrarErrorFormulario(
    "La planilla que intentó cargar no cumple con el formato necesario."
  ))

  ipcRenderer.once("alimento", async (e, data) => {
    console.log(data)
    if (data.datos.length === 0) {
      dispatchErrorFormulario()
      dispatch(limpiarFormularioAlimento())
    } else {
      dispatch(guardarPlanillaAlimento(data))
    }
  });
  
  ipcRenderer.once("eficacia", async (e, data) => {
    if (data.datos.length === 0) {
      dispatchErrorFormulario()
      dispatch(limpiarFormularioEficacia())
    } else {
      dispatch(guardarPlanillaEficacia(data))
    }
  });

  ipcRenderer.once("peces", async (e, data) => {
    if (data.datos.length === 0) {
      dispatchErrorFormulario()
      dispatch(limpiarFormularioPeces())
    } else {
      dispatch(guardarPlanillaPeces(data))
    }
  });

  ipcRenderer.once("tratamiento", async (e, data) => {
    if (data.datos.length === 0) {
      dispatchErrorFormulario()
      dispatch(limpiarFormularioTratamiento())
    } else {
      dispatch(guardarPlanillaTratamiento(data))
    }
  });

  const { 
    planillaAlimento, 
    planillaPeces, 
    planillaEficacia,
    planillaTratamiento,
   } = useSelector(
    (state) => state.reporte
  );

  // const selectFile = (e, validationFunction, action) => {
  //   if (e.target.files == null) return
  //   const f = e.target.files[0]
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //     let data = e.target.result
  //     data = new Uint8Array(data)
  //     try {
  //       validationFunction(
  //         XLSX.read(data, { type: "array"}),
  //         v => dispatch(action({file: f, data: v}))
  //       )
  //     } catch (error) {
  //       dispatch(
  //         mostrarErrorFormulario(
  //           "La planilla que intentó cargar no cumple con el formato necesario."
  //         )
  //       );
  //     }
  //   };
  //   reader.readAsArrayBuffer(f)
  // };

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
          onChange={
            (e) => leerPlanilla("alimento", e.target.files[0]?.path)
          }
        ></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label
          htmlFor="FormPlanillas__planilla__2"
          className="FormPlanillas__planilla__label"
        >
          <div className="FormPlanillas__planilla__label__button">Tratamiento</div>
          <div className="FormPlanillas__planilla__label__file">
            {getShortPath(planillaTratamiento)}
          </div>
        </label>
        <input
          id="FormPlanillas__planilla__2"
          type="file"
          accept=".csv, .xl*"
          onChange={
            (e) => leerPlanilla("tratamiento", e.target.files[0]?.path)
          }
        ></input>
      </div>
      <div className="FormPlanillas__planilla">
        <label
          htmlFor="FormPlanillas__planilla__4"
          className="FormPlanillas__planilla__label"
        >
          <div className="FormPlanillas__planilla__label__button">Eficacia</div>
          <div className="FormPlanillas__planilla__label__file">
            {getShortPath(planillaEficacia)}
          </div>
        </label>
        <input
          id="FormPlanillas__planilla__4"
          type="file"
          accept=".csv, .xl*"
          onChange={(e) => leerPlanilla("eficacia", e.target.files[0]?.path)}
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
          onChange={(e) => leerPlanilla("peces", e.target.files[0]?.path)}
        ></input>
      </div>
      <div id="htmlout"></div>
    </div>
  );
};

export default FormPlanillas;
