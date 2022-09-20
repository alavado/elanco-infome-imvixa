import React, { useMemo } from "react";
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
} from "../../redux/ducks/parametrosGenerales";
import { procesarDatosParaExportar as procesarReporteSeguimiento } from "../../redux/ducks/reporteSeguimiento";
import {
  procesarDatosParaExportar as procesarReporteAlimento,
  cargarDatosAlimento,
} from "../../redux/ducks/reporteAlimento";
import {
  procesarDatosParaExportar as procesarReporteMusculo,
  cargarDatosMusculo,
} from "../../redux/ducks/reporteMusculo";
import {
  cargarDatosCentro, procesarReporteCentro,
} from "../../redux/ducks/reporteCentro";
import {
  agregarComentarioAlimento,
  limpiarComentariosAlimento
} from "../../redux/ducks/comentarios"
import classNames from "classnames";
import FormSeleccionarReporte from "./FormSeleccionarReporte";
import { colCumplimiento, comentarioAltoCumplimiento, comentarioBajoCumplimiento } from "../../constants";

const Formulario = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    pasoActual: indicePasoActual,
    errorFormulario,
    todasLasPlanillas,
    validando,
    reporte,
    datosAlimento,
    datosPeces,
    datosEficacia,
    datosTratamiento,
    datosPecesTratados
  } = useSelector((state) => state.parametrosGenerales);
  const { nombreEmpresa, cumplimiento, concentracion } = useSelector(
    (state) => state.reporte
  );
  const { lotesSeleccionados: lotes } = useSelector(
    (state) => state.reporteAlimento
  );

  const { nombreEmpresa: nEmpresaAlimento, piscicultura, fecha, umbral, umbralDestacar } = useSelector(
    (state) => state.reporteMusculo
  );

  const { nombreEmpresa: nEmpresaCentro, centro, fecha: fechaCentro } = useSelector(
    (state) => state.reporteCentro
  );

  const unicaOpcionMusculo = [nEmpresaAlimento, piscicultura, fecha].every(v => v !== null)
  const unicaOpcionCentro = [nEmpresaCentro, centro, fechaCentro].every(v => v !== null)

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

  const valoresOK =
    cumplimientoOK &&
    ((reporte !== null && reporte.id === 1) || concentracionOK);
  let qCondition = true;
  const minCondition = cumplimiento.min === "" || cumplimiento.min >= 0;
  const boxElements = ["q2", "q3", "q4", "prom"];
  if (boxElements.some((v) => cumplimiento[v] !== "")) {
    qCondition = Object.values(cumplimiento).every((v) => v !== "");
  }
  if (boxElements.some((v) => concentracion[v] !== "")) {
    qCondition =
      qCondition &&
      (reporte.id === 1 || Object.values(concentracion).every((v) => v !== ""));
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
        descripcion: "Seleccionar reporte a emitir",
        componente: <FormSeleccionarReporte />,
        volver: "Volver",
        siguiente: "Siguiente",
        siguienteActivo: reporte !== null,
        onClickSiguiente: () => {
          if (todasLasPlanillas && reporte !== null) {
            if (reporte.id === 1) {
              dispatch(cargarDatosAlimento(datosAlimento));
            } else if (reporte.id === 2) {
              dispatch(cargarDatosMusculo({ datosAlimento, datosPeces, datosTratamiento }));
            } else if (reporte.id === 3) {
              dispatch(cargarDatosCentro({ datosAlimento, datosPeces, datosTratamiento }));
            }
            dispatch(pasoSiguiente());
          } else {
            dispatch(
              mostrarErrorFormulario(
                "Necesita seleccionar un tipo de reporte antes de continuar"
              )
            );
          }
        },
      },
      {
        paso: 3,
        descripcion:
          reporte !== null
            ? "Definir parámetros del " + reporte.titulo.toLowerCase()
            : "",
        componente: <FormParametros />,
        volver: "Volver",
        siguiente: "Siguiente",
        siguienteActivo:
          reporte !== null &&
          ((reporte.id === 4 && nombreEmpresa !== "") ||
            (reporte.id === 1 && lotes.length > 0) ||
            (reporte.id === 2 &&  unicaOpcionMusculo) ||
            (reporte.id === 3 && unicaOpcionCentro)),
        onClickSiguiente: () => {
          if (reporte.id === 1 && lotes.length > 0){
            dispatch(limpiarComentariosAlimento())
            lotes.forEach((l, i) => {
              try {
                dispatch(agregarComentarioAlimento({
                  texto: (l.data[colCumplimiento] * 100) >= 90 ? comentarioAltoCumplimiento : comentarioBajoCumplimiento,
                  indice: (i + 1)
                }))
              } catch (error) {
                console.log(error)
              }
            })
            dispatch(pasoSiguiente());
          } else if (reporte.id === 2 && unicaOpcionMusculo) {
            localStorage.setItem('umbralDestacar', umbralDestacar)
            localStorage.setItem('umbral', umbral)
            dispatch(pasoSiguiente());
          } else if ((reporte.id === 3 && unicaOpcionCentro) ||(reporte.id === 4 && todasLasPlanillas && nombreEmpresa !== "")) {
            dispatch(pasoSiguiente());
          } else {
            let error = "Necesita completar la información antes de continuar"
            if (reporte.id === 4) {
              error = "Necesita seleccionar una empresa antes de continuar"
            } 
            if (reporte.id === 1) {
              error = "Necesita seleccionar al menos un lote antes de continuar"
            } 
            dispatch(
              mostrarErrorFormulario(error)
            );
          }
        },
      },
      {
        paso: 4,
        descripcion: "Definir rangos mínimo y máximo para industria",
        componente: <FormIndustria />,
        volver: "Volver",
        siguiente: "Generar reporte",
        siguienteActivo: valoresOK && qCondition && minCondition,
        onClickSiguiente: () => {
          if (!valoresOK) {
            dispatch(
              mostrarErrorFormulario(
                "Los valores deben respetar la siguiente relación min ≤ p25 ≤ p50 ≤ p75 ≤ max. "
              )
            );
            return;
          }
          switch (reporte.id) {
            case 1:
              if (
                lotes.length > 0 &&
                cumplimientoOK &&
                qCondition &&
                minCondition
              ) {
                dispatch(procesarReporteAlimento());
              }
              break;
            case 2:
              if (
                unicaOpcionMusculo &&
                cumplimientoOK &&
                qCondition &&
                minCondition
              ) {
                dispatch(procesarReporteMusculo());
              }
              break;
            case 3:
                if (
                  unicaOpcionCentro &&
                  cumplimientoOK &&
                  concentracionOK &&
                  qCondition &&
                  minCondition
                ) {
                  dispatch(procesarReporteCentro());
                }
                break;
            default:
              if (
                todasLasPlanillas &&
                nombreEmpresa !== "" &&
                valoresOK &&
                qCondition
              ) {
                dispatch(
                  procesarReporteSeguimiento({
                    datosAlimento,
                    datosPeces,
                    datosEficacia,
                    datosPecesTratados
                  })
                );
              }
              break;
          }
          history.push("/reporte");
          // dispatch(
          //   mostrarErrorFormulario(
          //     "Si ingresa algún percentil, debe ingresar todos los demás valores."
          //   )
          // );
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
      reporte,
      lotes,
      unicaOpcionMusculo,
      umbral,
      umbralDestacar,
      unicaOpcionCentro
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
