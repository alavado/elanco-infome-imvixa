import React, { useMemo } from "react";
import Select from "react-select";
import { registerLocale } from "react-datepicker";
import "./ParametrosReporteMusculo.css";
import es from "date-fns/locale/es";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarNombreEmpresa,
  guardarPiscicultura,
  guardarFecha,
  guardarUmbral
} from "../../../../redux/ducks/reporteMusculo";
import {
  colEmpresaPeces,
  colPisciculturaPeces,
  colFechaPeces,
} from "../../../../constants";

const ParametrosReporteMusculo = () => {
  registerLocale("es", es);
  const { nombreEmpresa, piscicultura, filtros, fecha, datosPeces, umbral } =
    useSelector((state) => state.reporteMusculo);
  const empresas = useMemo(
    () =>
      [
        ...datosPeces.reduce((acc, current) => {
          if (
            (!filtros.includes(colFechaPeces) ||
              (current[colFechaPeces] &&
                current[colFechaPeces].toString().startsWith(fecha.value))) &&
            (!filtros.includes(colPisciculturaPeces) ||
              current[colPisciculturaPeces] === piscicultura.value) &&
            current[colEmpresaPeces]
          ) {
            acc.add(current[colEmpresaPeces]);
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [piscicultura, fecha, filtros, datosPeces]
  );

  const pisciculturas = useMemo(
    () =>
      [
        ...datosPeces.reduce((acc, current) => {
          if (
            (!filtros.includes(colFechaPeces) ||
              (current[colFechaPeces] &&
                current[colFechaPeces].toString().startsWith(fecha.value))) &&
            (!filtros.includes(colEmpresaPeces) ||
              current[colEmpresaPeces] === nombreEmpresa.value) &&
            current[colPisciculturaPeces]
          ) {
            acc.add(current[colPisciculturaPeces]);
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [nombreEmpresa, fecha, filtros, datosPeces]
  );

  const fechas = useMemo(
    () =>
      [
        ...datosPeces.reduce((acc, current) => {
          if (
            (!filtros.includes(colEmpresaPeces) ||
              current[colEmpresaPeces] === nombreEmpresa.value) &&
            (!filtros.includes(colPisciculturaPeces) ||
              current[colPisciculturaPeces] === piscicultura.value) &&
            current[colFechaPeces]
          ) {
            if (typeof current[colFechaPeces] !== "string") {
              console.log(current[colFechaPeces]);
            }
            acc.add(current[colFechaPeces].toString().substring(0, 10));
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [piscicultura, nombreEmpresa, filtros, datosPeces]
  );

  const dispatch = useDispatch();
  return (
    <div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Empresa</div>
        <Select
          options={empresas}
          isClearable={true}
          defaultValue={nombreEmpresa}
          onChange={(nombre) => dispatch(guardarNombreEmpresa(nombre))}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#2f4269",
            },
          })}
          noOptionsMessage={(obj) => "No hay más opciones"}
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
          isClearable={true}
          options={pisciculturas}
          noOptionsMessage={(obj) => "No hay más opciones"}
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
        <div className="FormParametros__seccion_label">Fecha </div>
        <Select
          options={fechas}
          isClearable={true}
          value={fecha === null ? "" : fecha}
          onChange={(f) => dispatch(guardarFecha(f))}
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
      <div className="FormParametros__seccion">
        <div className="FormParametros__parametro">
          <label
            htmlFor="FormParametros__parametro__umbral"
            className="FormParametros__parametro_label"
          >
            <div className="FormParametros__parametro_label__button">Umbral ppb</div>
            <input
              defaultValue={umbral}
              id="FormParametros__parametro__umbral"
              typeForm="number"
              type="number"
              min="0"
              onChange={(e) => {
                console.log("HERE")
                dispatch(guardarUmbral(e.target.value))}}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ParametrosReporteMusculo;
