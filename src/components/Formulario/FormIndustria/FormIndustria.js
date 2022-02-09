import "./FormIndustria.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarCumplimiento,
  guardarConcentracion
} from "../../../redux/ducks/reporte";

const FormIndustria = () => {
  const dispatch = useDispatch();
  let { 
    cumplimiento, 
    concentracion,
   } = useSelector(
    (state) => state.reporte
  );

  return (
    <div className="FormIndustria">
      <p className="FormIndustria__seccion_descripcion">
          Si no se ingresa algún valor se utilizará el cálculo automático.
          <br/>
          Los valores deben respetar la siguiente relación min ≤ p25 ≤ p50 ≤ p75 ≤ max.
          <br/>
          Si ingresa algún percentil, debe ingresar todos los demás valores.
      </p>
      <div className="FormIndustria__seccion">
        <div className="FormIndustria__seccion_label">
          Gráfico cumplimiento (%) concentración en alimento 
        </div>
        <div className="FormIndustria__parametros">
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g11"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Mín.
              </div>
              <input
                id="FormIndustria__parametro__g11"
                type="number"
                min="0"
                defaultValue={cumplimiento.min}
                onChange={(e) => dispatch(guardarCumplimiento({tipo: 'min', valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g12"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Max.
              </div>
              <input
                id="FormIndustria__parametro__g12"
                type="number"
                min="0"
                defaultValue={cumplimiento.max}
                onChange={(e) => dispatch(guardarCumplimiento({tipo:'max',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
        </div>
        <div className="FormIndustria__parametros">
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g13"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                P25
              </div>
              <input
                id="FormIndustria__parametro__g13"
                type="number"
                min="0"
                defaultValue={cumplimiento.q2}
                onChange={(e) => dispatch(guardarCumplimiento({tipo: 'q2',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g14"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                P50
              </div>
              <input
                id="FormIndustria__parametro__g14"
                type="number"
                min="0"
                defaultValue={cumplimiento.q3}
                onChange={(e) => dispatch(guardarCumplimiento({tipo:'q3',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
        </div>
        <div className="FormIndustria__parametros">
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g15"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                P75
              </div>
              <input
                id="FormIndustria__parametro__g15"
                type="number"
                min="0"
                defaultValue={cumplimiento.q4}
                onChange={(e) => dispatch(guardarCumplimiento({tipo: 'q4',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g16"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Prom.
              </div>
              <input
                id="FormIndustria__parametro__g16"
                type="number"
                min="0"
                defaultValue={cumplimiento.prom}
                onChange={(e) => dispatch(guardarCumplimiento({tipo: 'prom',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
        </div>
      </div>
      <div className="FormIndustria__seccion">
        <div className="FormIndustria__seccion_label">
          Gráfico comparación concentración (ppb) en músculo
        </div>
        <div className="FormIndustria__parametros">
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g21"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Mín.
              </div>
              <input
                id="FormIndustria__parametro__g21"
                type="number"
                min="0"
                defaultValue={concentracion.min}
                onChange={(e) => dispatch(guardarConcentracion({tipo: 'min',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g22"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Max.
              </div>
              <input
                id="FormIndustria__parametro__g22"
                type="number"
                min="0"
                defaultValue={concentracion.max}
                onChange={(e) => dispatch(guardarConcentracion({tipo: 'max',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
        </div>
        <div className="FormIndustria__parametros">
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g23"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                P25
              </div>
              <input
                id="FormIndustria__parametro__g23"
                type="number"
                min="0"
                defaultValue={concentracion.q2}
                onChange={(e) => dispatch(guardarConcentracion({tipo: 'q2',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g24"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                P50
              </div>
              <input
                id="FormIndustria__parametro__g24"
                type="number"
                min="0"
                defaultValue={concentracion.q3}
                onChange={(e) => dispatch(guardarConcentracion({tipo: 'q3',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
        </div>
        <div className="FormIndustria__parametros">
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g25"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                P75
              </div>
              <input
                id="FormIndustria__parametro__g25"
                type="number"
                min="0"
                defaultValue={concentracion.q4}
                onChange={(e) => dispatch(guardarConcentracion({tipo: 'q4',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g26"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Prom.
              </div>
              <input
                id="FormIndustria__parametro__g26"
                type="number"
                min="0"
                defaultValue={concentracion.prom}
                onChange={(e) => dispatch(guardarConcentracion({tipo: 'prom',valor: e.target.value !== "" ? parseInt(e.target.value) : ""}))}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormIndustria;
