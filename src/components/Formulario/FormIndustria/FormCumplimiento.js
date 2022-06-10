import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	guardarCumplimiento
} from "../../../redux/ducks/reporteSeguimiento";
import "./FormIndustria.css";

const FormCumplimiento = () => {
	const dispatch = useDispatch();
	let { cumplimiento } = useSelector((state) => state.reporte);
	return (
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
                typeForm="locale-decimal"
                min="0"
                defaultValue={cumplimiento.min.toString().replace('.',',')}
                onChange={(e) =>
                  dispatch(
                    guardarCumplimiento({
                      tipo: "min",
                      valor:
                        e.target.value !== "" ? parseFloat(e.target.value.replace('.','').replace(',','.')) : "",
                    })
                  )
                }
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
                min="0"
                typeForm="locale-decimal"
                defaultValue={cumplimiento.max.toString().replace('.',',')}
                onChange={(e) =>
                  dispatch(
                    guardarCumplimiento({
                      tipo: "max",
                      valor:
                        e.target.value !== "" ? parseFloat(e.target.value.replace('.','').replace(',','.')) : "",
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
              htmlFor="FormIndustria__parametro__g13"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">P25</div>
              <input
                id="FormIndustria__parametro__g13"
                typeForm="locale-decimal"
                min="0"
                defaultValue={cumplimiento.q2.toString().replace('.',',')}
                onChange={(e) =>
                  dispatch(
                    guardarCumplimiento({
                      tipo: "q2",
                      valor:
                        e.target.value !== "" ? parseFloat(e.target.value.replace('.','').replace(',','.')) : "",
                    })
                  )
                }
              ></input>
            </label>
          </div>
          <div className="FormIndustria__parametro">
            <label
              htmlFor="FormIndustria__parametro__g14"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">P50</div>
              <input
                id="FormIndustria__parametro__g14"
                typeForm="locale-decimal"
                min="0"
                defaultValue={cumplimiento.q3.toString().replace('.',',')}
                onChange={(e) =>
                  dispatch(
                    guardarCumplimiento({
                      tipo: "q3",
                      valor:
                        e.target.value !== "" ? parseFloat(e.target.value.replace('.','').replace(',','.')) : "",
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
              htmlFor="FormIndustria__parametro__g15"
              className="FormIndustria__parametro__label"
            >
              <div className="FormIndustria__parametro__label__button">P75</div>
              <input
                id="FormIndustria__parametro__g15"
                typeForm="locale-decimal"
                min="0"
                defaultValue={cumplimiento.q4.toString().replace('.',',')}
                onChange={(e) =>
                  dispatch(
                    guardarCumplimiento({
                      tipo: "q4",
                      valor:
                        e.target.value !== "" ? parseFloat(e.target.value.replace('.','').replace(',','.')) : "",
                    })
                  )
                }
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
                typeForm="locale-decimal"
                min="0"
                defaultValue={cumplimiento.prom.toString().replace('.',',')}
                onChange={(e) =>
                  dispatch(
                    guardarCumplimiento({
                      tipo: "prom",
                      valor:
                        e.target.value !== "" ? parseFloat(e.target.value.replace('.','').replace(',','.')) : "",
                    })
                  )
                }
              ></input>
            </label>
          </div>
        </div>
      </div>
	)
}

export default FormCumplimiento