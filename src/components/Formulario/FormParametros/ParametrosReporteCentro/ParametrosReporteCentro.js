import React, { useMemo } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import {
  colDestinoTrat,
  colEmpresaTrat,
  colFechaTrat,
} from "../../../../constants";
import {
  guardarCentro,
  guardarFecha,
  guardarNombreEmpresa,
} from "../../../../redux/ducks/reporteCentro";

const ParametrosReporteCentro = () => {
  registerLocale("es", es);
  const { nombreEmpresa, centro, filtros, fecha, datosSeleccionParametros } =
    useSelector((state) => state.reporteCentro);

  const empresas = useMemo(
    () =>
      [
        ...datosSeleccionParametros.reduce((acc, current) => {
          if (
            (!filtros.includes(colFechaTrat) ||
              (current[colFechaTrat] &&
                current[colFechaTrat].toString().startsWith(fecha.value))) &&
            (!filtros.includes(colDestinoTrat) ||
              current[colDestinoTrat] === centro.value) &&
            current[colEmpresaTrat]
          ) {
            acc.add(current[colEmpresaTrat]);
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [centro, fecha, filtros, datosSeleccionParametros]
  );

  const centros = useMemo(
    () =>
      [
        ...datosSeleccionParametros.reduce((acc, current) => {
          if (
            (!filtros.includes(colFechaTrat) ||
              (current[colFechaTrat] &&
                current[colFechaTrat].toString().startsWith(fecha.value))) &&
            (!filtros.includes(colEmpresaTrat) ||
              current[colEmpresaTrat] === nombreEmpresa.value) &&
            current[colDestinoTrat]
          ) {
            acc.add(current[colDestinoTrat]);
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [nombreEmpresa, fecha, filtros, datosSeleccionParametros]
  );

  const fechas = useMemo(
    () =>
      [
        ...datosSeleccionParametros.reduce((acc, current) => {
          if (
            (!filtros.includes(colEmpresaTrat) ||
              current[colEmpresaTrat] === nombreEmpresa.value) &&
            (!filtros.includes(colDestinoTrat) ||
              current[colDestinoTrat] === centro.value) &&
            current[colFechaTrat]
          ) {
            if (typeof current[colFechaTrat] !== "string") {
              console.log(current[colFechaTrat]);
            }
            acc.add(current[colFechaTrat].toString().substring(0, 10));
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [centro, nombreEmpresa, filtros, datosSeleccionParametros]
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
        <div className="FormParametros__seccion_label">Centro</div>
        <Select
          value={centro}
          isClearable={true}
          options={centros}
          noOptionsMessage={(obj) => "No hay más opciones"}
          onChange={(p) => dispatch(guardarCentro(p))}
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
    </div>
  );
};

export default ParametrosReporteCentro;
