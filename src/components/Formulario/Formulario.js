import React, { useMemo, useState } from "react";
import logoImvixa from "../../assets/images/logo-imvixa.svg";
import logoElanco from "../../assets/images/logo-elanco.svg";
import FormPlanillas from "./FormPlanillas";
import FormParametros from "./FormParametros";
import FormExportar from "./FormExportar";
import "./Formulario.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  pasoAnterior,
  pasoSiguiente,
  mostrarErrorFormulario,
  procesarDatosParaExportar
} from "../../redux/ducks/reporte";

const Formulario = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    pasoActual: indicePasoActual,
    errorFormulario,
    todasLasPlanillas,
  } = useSelector((state) => state.reporte);
  const pasos = useMemo(
    () => [
      {
        paso: 1,
        descripcion: "Seleccionar las bases de datos",
        componente: <FormPlanillas />,
        volver: "",
        siguiente: "Siguiente",
        onClickSiguiente: () => {
          if (todasLasPlanillas) {
            dispatch(pasoSiguiente())
          } else {
            dispatch(
              mostrarErrorFormulario(
                "Necesita seleccionar todas las bases de datos antes de continuar"
              )
            );
          }
        },
      },
      {
        paso: 2,
        descripcion: "Seleccionar empresa y periodo de análisis",
        componente: <FormParametros />,
        volver: "Volver",
        siguiente: "Exportar",
        onClickSiguiente: () => {
          if (todasLasPlanillas) {
            dispatch(procesarDatosParaExportar())
            history.push("/reporte");
          }
        },
      },
      // {
      //   paso: 3,
      //   descripcion: "Exportar reporte y otros gráficos",
      //   componente: <FormExportar />,
      //   volver: "Volver",
      //   siguiente: "Exportar",
      //   onClickSiguiente: () => history.push('/reporte')
      // }
    ],
    [todasLasPlanillas, errorFormulario, dispatch, history]
  );

  const pasoActual = pasos[indicePasoActual];

  return (
    <div className="Formulario">
      <div className="Formulario__contenedor">
        <div className="Formulario__header">
          <div className="Formulario__titulo">
            <div>Generador de reporte Imvixa</div>
            <div className="logos">
              <img
                src={logoImvixa}
                className="Formulario__logo_imvixa"
                alt="Logo Imvixa"
              />
              <img
                src={logoElanco}
                className="Formulario__logo_elanco"
                alt="Logo Elanco"
              />
            </div>
          </div>
          <div className="Formulario__stepper">
            <div className="Formulario__stepper_paso">
              Paso {pasoActual.paso}/{pasos.length}
            </div>
            <div className="Formulario__stepper_desc">
              {pasoActual.descripcion}
            </div>
          </div>
        </div>
        <div className="Formulario__body">
          {pasoActual.componente}
          {errorFormulario !== null ? (
            <div className="Formulario__error">{errorFormulario}</div>
          ) : null}
        </div>

        <div className="Formulario__botones">
          <button
            className="Formulario__boton"
            onClick={pasoActual.onClickSiguiente}
          >
            {pasoActual.siguiente}
          </button>
          {indicePasoActual === 0 ? null : (
            <button
              className="Formulario__boton"
              onClick={() => dispatch(pasoAnterior())}
            >
              {pasoActual.volver}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Formulario;
