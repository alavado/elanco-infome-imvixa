import React, { useMemo, useState } from "react";
import logoImvixa from "../../assets/images/logo-imvixa.svg";
import logoElanco from "../../assets/images/logo-elanco.svg";
import FormPlanillas from "./FormPlanillas";
import FormParametros from "./FormParametros";
import FormIndustria from "./FormIndustria";
import Spinner from "../Spinner";
import "./Formulario.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  pasoAnterior,
  pasoSiguiente,
  mostrarErrorFormulario,
  procesarDatosParaExportar,
} from "../../redux/ducks/reporte";
import classNames from "classnames";

const Formulario = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    pasoActual: indicePasoActual,
    errorFormulario,
    todasLasPlanillas,
    nombreEmpresa,
    validando,
    cumplimiento,
    concentracion,
  } = useSelector((state) => state.reporte);
  const cumplimientoOK =
    (cumplimiento.min <= cumplimiento.max || cumplimiento.max === "") &&
    (cumplimiento.min <= cumplimiento.q2 || cumplimiento.q2 === "") &&
    (cumplimiento.q2 <= cumplimiento.q3 || cumplimiento.q3 === "") &&
    (cumplimiento.q3 <= cumplimiento.q4 || cumplimiento.q4 === "") &&
    (cumplimiento.q4 <= cumplimiento.max || cumplimiento.max === "");
  const concentracionOK =
    (concentracion.min <= concentracion.max || concentracion.max === "") &&
    (concentracion.min <= concentracion.q2 || concentracion.q2 === "") &&
    (concentracion.q2 <= concentracion.q3 || concentracion.q3 === "") &&
    (concentracion.q3 <= concentracion.q4 || concentracion.q4 === "") &&
    (concentracion.q4 <= concentracion.max || concentracion.max === "");
  const valoresOK = cumplimientoOK && concentracionOK;
  let qCondition = true;
  const minCondition = cumplimiento.min === "" || cumplimiento.min >= 50;
  const boxElements = ['q2', 'q3', 'q4', 'prom']
  if (boxElements.some(v => cumplimiento[v] !== "")) {
    qCondition = Object.values(cumplimiento).every(v => v !== "");
  }
  if (boxElements.some(v => concentracion[v] !== "")) {
    qCondition = qCondition && Object.values(concentracion).every(v => v !== "");
  }
  const pasos = useMemo(
    () => [
      {
        paso: 1,
        descripcion: "Seleccionar las bases de datos",
        componente: <FormPlanillas />,
        volver: "",
        siguiente: "Siguiente",
        siguienteActivo:
          todasLasPlanillas && Object.values(validando).every((v) => !v),
        onClickSiguiente: () => {
          if (todasLasPlanillas) {
            dispatch(pasoSiguiente());
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
        descripcion: "Seleccionar empresa y periodo de an??lisis",
        componente: <FormParametros />,
        volver: "Volver",
        siguiente: "Siguiente",
        siguienteActivo: nombreEmpresa !== "",
        onClickSiguiente: () => {
          if (todasLasPlanillas && nombreEmpresa !== "") {
            dispatch(pasoSiguiente());
          } else {
            dispatch(
              mostrarErrorFormulario(
                "Necesita seleccionar una empresa antes de continuar"
              )
            );
          }
        },
      },
      {
        paso: 3,
        descripcion: "Definir rangos m??nimo y m??ximo para industria",
        componente: <FormIndustria />,
        volver: "Volver",
        siguiente: "Generar reporte",
        siguienteActivo: valoresOK && qCondition && minCondition,
        onClickSiguiente: () => {
          if (!valoresOK) {
            dispatch(
              mostrarErrorFormulario(
                "Los valores deben respetar la siguiente relaci??n min ??? p25 ??? p50 ??? p75 ??? max. "
              )
            );
            return
          }
          if (
            todasLasPlanillas &&
            nombreEmpresa !== "" &&
            valoresOK &&
            qCondition
          ) {
            dispatch(procesarDatosParaExportar());
            history.push("/reporte");
          } else {
            // dispatch(
            //   mostrarErrorFormulario(
            //     "Si ingresa alg??n percentil, debe ingresar todos los dem??s valores."
            //   )
            // );
            return
          }
        },
      },
    ],
    [
      validando,
      todasLasPlanillas,
      nombreEmpresa,
      errorFormulario,
      cumplimiento,
      concentracion,
      dispatch,
      history,
    ]
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
          {Object.values(validando).every((v) => !v) &&
          errorFormulario !== null ? (
            <div className="Formulario__error">{errorFormulario}</div>
          ) : null}
          {Object.values(validando).every((v) => !v) ? null : <Spinner />}
        </div>
        <div className="Formulario__botones">
          <button
            className={classNames({
              Formulario__boton: true,
              "Formulario__boton--activo": pasoActual.siguienteActivo,
            })}
            onClick={pasoActual.onClickSiguiente}
          >
            {pasoActual.siguiente}
          </button>
          {indicePasoActual === 0 ? null : (
            <button
              className={classNames({
                Formulario__boton: true,
                "Formulario__boton--activo": true,
              })}
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
