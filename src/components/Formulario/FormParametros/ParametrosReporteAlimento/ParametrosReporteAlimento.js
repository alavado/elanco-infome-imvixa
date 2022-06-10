import React, { useMemo } from "react";
import Select from "react-select";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarNombreEmpresa,
  guardarPiscicultura,
  guardarAño,
  guardarFecha,
  guardarLotes
} from "../../../../redux/ducks/reporteAlimento";
import {
  colEmpresaAlimento,
  colPisciculturaAlimento,
  colAñoAlimento,
  colFechaAlimento,
  colLoteAlimento,
} from "../../../../constants";
import "../FormParametros.css";

const ParametrosReporteAlimento = () => {
  registerLocale("es", es);
  const { empresas, pisciculturas, datosAlimento } = useSelector(
    (state) => state.parametrosGenerales
  );
  const { nombreEmpresa, piscicultura, año, fecha, lotes, lotesOpciones } = useSelector(
    (state) => state.reporteAlimento
  );
  const dispatch = useDispatch();
  let nombreEmpresaSelected;
  if (nombreEmpresa === "") {
    nombreEmpresaSelected = nombreEmpresa;
  } else {
    nombreEmpresaSelected = empresas.find(
      (option) => option.value === nombreEmpresa
    );
  }
  const años = useMemo(() =>
    piscicultura === null
      ? []
      : [
          ...datosAlimento.reduce((acc, current) => {
            if (
              current[colEmpresaAlimento] === nombreEmpresa &&
              current[colPisciculturaAlimento] === piscicultura.value
            ) {
              acc.add(current[colAñoAlimento]);
            }
            return acc;
          }, new Set()),
        ]
          .sort((a, b) => a - b)
          .map((v) => {
            return { value: v, label: v };
          }),
    [piscicultura]
  );
  console.log({lotes})
  const fechas = useMemo(
    () =>
      piscicultura === null || año === null
        ? []
        : [
            ...datosAlimento.reduce((acc, current) => {
              if (
                current[colEmpresaAlimento] === nombreEmpresa &&
                current[colPisciculturaAlimento] === piscicultura.value &&
                current[colAñoAlimento] === año.value
              ) {
                acc.add(
                  current[colFechaAlimento]
                    .substring(0, 10)
                );
              }
              return acc;
            }, new Set()),
          ]
            .sort((a, b) => a - b)
            .map((v) => {
              return { value: v, label: v };
            }),
    [piscicultura, año]
  );

  return (
    <div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Empresa</div>
        <Select
          options={empresas}
          defaultValue={nombreEmpresaSelected}
          onChange={(nombre) => dispatch(guardarNombreEmpresa(nombre))}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#2f4269",
            },
          })}
          placeholder="Seleccione empresa"
          styles={{
            // Fixes the overlapping problem of the component
            menu: (provided) => ({ ...provided, zIndex: 3 }),
            input: (provided) => ({ ...provided, minHeight: "2rem" }),
          }}
        />
      </div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Piscicultura</div>
        <Select
          value={piscicultura}
          options={nombreEmpresa === "" ? [] : pisciculturas[nombreEmpresa]}
          isDisabled={nombreEmpresa === ""}
          onChange={(p) => dispatch(guardarPiscicultura(p))}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#2f4269",
            },
          })}
          placeholder="Seleccione piscicultura"
          styles={{
            // Fixes the overlapping problem of the component
            menu: (provided) => ({ ...provided, zIndex: 3 }),
            input: (provided) => ({ ...provided, minHeight: "2rem" }),
          }}
        />
      </div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__grupo">
          <div className="FormParametros__elemento">
            <div className="FormParametros__seccion_label">Año</div>
            <Select
              options={años === null ? [] : años}
              value={año}
              placeholder="Seleccione año"
              isDisabled={piscicultura === null}
              onChange={(año) => dispatch(guardarAño(año))}
              noOptionsMessage={(obj) => "No hay más opciones"}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#2f4269",
                },
              })}
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 3 }),
                input: (provided) => ({ ...provided, minHeight: "2rem" }),
              }}
            />
          </div>
          <div className="FormParametros__elemento">
            <div className="FormParametros__seccion_label">Fecha </div>
            <Select
              options={fechas}
              value={fecha === null ? "" : fecha}
              isDisabled={piscicultura === null}
              onChange={(f) => dispatch(guardarFecha({fecha: f, datosLotes: datosAlimento}))}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#2f4269",
                },
              })}
              placeholder="Seleccione fecha"
              noOptionsMessage={(obj) => "No hay más opciones"}
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 3 }),
                input: (provided) => ({ ...provided, minHeight: "2rem" }),
              }}
            />
          </div>
        </div>
      </div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Lote</div>
        <Select
          isMulti
          value={lotes}
          name="colors"
          options={lotesOpciones}
          placeholder="Seleccione lotes"
          className="basic-multi-select"
          classNamePrefix="select"
          noOptionsMessage={(obj) => "No hay más opciones"}
          onChange={(l) => dispatch(guardarLotes(l))}
        />
      </div>
    </div>
  );
};

export default ParametrosReporteAlimento;
