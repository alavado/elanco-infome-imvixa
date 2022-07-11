import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  estaValidando,
  guardarPlanillaAlimento,
  guardarPlanillaEficacia,
  guardarPlanillaPeces,
  limpiarFormularioAlimento,
  limpiarFormularioEficacia,
  limpiarFormularioPeces,
  mostrarErrorFormulario,
} from "../../../redux/ducks/parametrosGenerales";

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
      dispatch(estaValidando({[tipo]: true}))
      ipcRenderer.send("leer", { tipo, path });
    }
  };

  const dispatchErrorFormulario = () => dispatch(mostrarErrorFormulario(
    "La planilla que intentó cargar no cumple con el formato necesario."
  ))

  ipcRenderer.once("alimento", async (e, data) => {
    dispatch(estaValidando({alimento: false}))
    if (data.datos.length === 0) {
      dispatchErrorFormulario()
      dispatch(limpiarFormularioAlimento())
    } else {
      dispatch(guardarPlanillaAlimento(data))
      localStorage.setItem("planillaAlimento", data.path)
    }
  });
  
  ipcRenderer.once("eficacia", async (e, data) => {
    dispatch(estaValidando({eficacia: false}))
    if (data.datos.length === 0) {
      dispatchErrorFormulario()
      dispatch(limpiarFormularioEficacia())
    } else {
      dispatch(guardarPlanillaEficacia(data))
      localStorage.setItem("planillaEficacia", data.path)
    }
  });

  ipcRenderer.once("peces", async (e, data) => {
    dispatch(estaValidando({peces: false}))
    if (data.datos.length === 0) {
      dispatchErrorFormulario()
      dispatch(limpiarFormularioPeces())
    } else {
      dispatch(guardarPlanillaPeces(data))
      localStorage.setItem("planillaPeces", data.path)
    }
  });

  // ipcRenderer.once("tratamiento", async (e, data) => {
  //   dispatch(estaValidando({tratamiento: false}))
  //   if (data.datos.length === 0) {
  //     dispatchErrorFormulario()
  //     dispatch(limpiarFormularioTratamiento())
  //   } else {
  //     dispatch(guardarPlanillaTratamiento(data))
  //     localStorage.setItem("planillaTratamiento", data.path)
  //   }
  // });

  let { 
    planillaAlimento, 
    planillaPeces, 
    planillaEficacia,
    // planillaTratamiento,
   } = useSelector(
    (state) => state.parametrosGenerales
  );
  
  useEffect(() => {
    // Recuperar de localstorage aquellos
    if (planillaAlimento === "" && localStorage.getItem('planillaAlimento') !== null) {
      leerPlanilla("alimento", localStorage.getItem('planillaAlimento'))
    } 
    if (planillaEficacia === "" && localStorage.getItem('planillaEficacia') !== null) {
      leerPlanilla("eficacia", localStorage.getItem('planillaEficacia'))
    } 
    // if (planillaTratamiento === "" && localStorage.getItem('planillaTratamiento') !== null) {
    //   leerPlanilla("tratamiento", localStorage.getItem('planillaTratamiento'))
    // } 
    if (planillaPeces === "" && localStorage.getItem('planillaPeces') !== null) {
      leerPlanilla("peces", localStorage.getItem('planillaPeces'))
    } 
  }, []);

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
      {/* <div className="FormPlanillas__planilla">
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
      </div> */}
      <div id="htmlout"></div>
    </div>
  );
};

export default FormPlanillas;
