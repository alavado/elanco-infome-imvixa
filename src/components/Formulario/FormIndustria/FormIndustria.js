import "./FormIndustria.css";

import React from "react";

const FormIndustria = () => {
  return (
    <div className="FormIndustria">
      <div className="FormIndustria__seccion">
        <div className="FormIndustria__seccion_label">
          Gráfico cumplimiento (%) concentración en alimento 
        </div>
        <p className="FormIndustria__seccion_descripcion">
          Si no se ingresa algún valor se utilizará el cálculo automático.
        </p>

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
                onChange={(e) => null}
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
                onChange={(e) => null}
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
                Q2
              </div>
              <input
                id="FormIndustria__parametro__g13"
                type="number"
                min="0"
                onChange={(e) => null}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g14"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Q3
              </div>
              <input
                id="FormIndustria__parametro__g14"
                type="number"
                min="0"
                onChange={(e) => null}
              ></input>
            </label>
          </div>
        </div>
      </div>
      <div className="FormIndustria__seccion">
        <div className="FormIndustria__seccion_label">
          Gráfico comparación concentración (ppb) en músculo
        </div>
        <p className="FormIndustria__seccion_descripcion">
          Si no se ingresa algún valor se utilizará el cálculo automático.
        </p>
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
                onChange={(e) => null}
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
                onChange={(e) => null}
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
                Q2
              </div>
              <input
                id="FormIndustria__parametro__g23"
                type="number"
                min="0"
                onChange={(e) => null}
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g24"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">
                Q3
              </div>
              <input
                id="FormIndustria__parametro__g24"
                type="number"
                min="0"
                onChange={(e) => null}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormIndustria;
