import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarConcentracion } from "../../../redux/ducks/reporteSeguimiento";
import "./FormIndustria.css";

const FormConcentracion = () => {
  const dispatch = useDispatch();
  let { concentracion } = useSelector((state) => state.reporte);
  return (
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
            <div className="FormIndustria__parametro__label__button">Mín.</div>
            <input
              id="FormIndustria__parametro__g21"
              typeForm="locale-decimal"
              min="0"
              defaultValue={concentracion.min.toString().replace(".", ",")}
              onChange={(e) =>
                dispatch(
                  guardarConcentracion({
                    tipo: "min",
                    valor:
                      e.target.value !== ""
                        ? parseFloat(
                            e.target.value.replace(".", "").replace(",", ".")
                          )
                        : "",
                  })
                )
              }
            ></input>
          </label>
        </div>
        <div className="FormIndustria__parametro">
          <label
            htmlFor="FormIndustria__parametro__g22"
            className="FormIndustria__parametro__label"
          >
            <div className="FormIndustria__parametro__label__button">Max.</div>
            <input
              id="FormIndustria__parametro__g22"
              typeForm="locale-decimal"
              min="0"
              defaultValue={concentracion.max.toString().replace(".", ",")}
              onChange={(e) =>
                dispatch(
                  guardarConcentracion({
                    tipo: "max",
                    valor:
                      e.target.value !== ""
                        ? parseFloat(
                            e.target.value.replace(".", "").replace(",", ".")
                          )
                        : "",
                  })
                )
              }
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
            <div className="FormIndustria__parametro__label__button">P25</div>
            <input
              id="FormIndustria__parametro__g23"
              typeForm="locale-decimal"
              min="0"
              defaultValue={concentracion.q2.toString().replace(".", ",")}
              onChange={(e) =>
                dispatch(
                  guardarConcentracion({
                    tipo: "q2",
                    valor:
                      e.target.value !== ""
                        ? parseFloat(
                            e.target.value.replace(".", "").replace(",", ".")
                          )
                        : "",
                  })
                )
              }
            ></input>
          </label>
        </div>
        <div className="FormIndustria__parametro">
          <label
            htmlFor="FormIndustria__parametro__g24"
            className="FormIndustria__parametro__label"
          >
            <div className="FormIndustria__parametro__label__button">P50</div>
            <input
              id="FormIndustria__parametro__g24"
              typeForm="locale-decimal"
              min="0"
              defaultValue={concentracion.q3.toString().replace(".", ",")}
              onChange={(e) =>
                dispatch(
                  guardarConcentracion({
                    tipo: "q3",
                    valor:
                      e.target.value !== ""
                        ? parseFloat(
                            e.target.value.replace(".", "").replace(",", ".")
                          )
                        : "",
                  })
                )
              }
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
            <div className="FormIndustria__parametro__label__button">P75</div>
            <input
              id="FormIndustria__parametro__g25"
              typeForm="locale-decimal"
              min="0"
              defaultValue={concentracion.q4.toString().replace(".", ",")}
              onChange={(e) =>
                dispatch(
                  guardarConcentracion({
                    tipo: "q4",
                    valor:
                      e.target.value !== ""
                        ? parseFloat(
                            e.target.value.replace(".", "").replace(",", ".")
                          )
                        : "",
                  })
                )
              }
            ></input>
          </label>
        </div>
        <div className="FormIndustria__parametro">
          <label
            htmlFor="FormIndustria__parametro__g26"
            className="FormIndustria__parametro__label"
          >
            <div className="FormIndustria__parametro__label__button">Prom.</div>
            <input
              id="FormIndustria__parametro__g26"
              typeForm="locale-decimal"
              min="0"
              defaultValue={concentracion.prom.toString().replace(".", ",")}
              onChange={(e) =>
                dispatch(
                  guardarConcentracion({
                    tipo: "prom",
                    valor:
                      e.target.value !== ""
                        ? parseFloat(
                            e.target.value.replace(".", "").replace(",", ".")
                          )
                        : "",
                  })
                )
              }
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormConcentracion;
