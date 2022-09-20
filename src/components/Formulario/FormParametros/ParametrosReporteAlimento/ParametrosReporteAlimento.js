import React, { useMemo } from "react";
import Select from "react-select";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarNombreEmpresa,
  guardarPiscicultura,
  guardarPMV,
  guardarFecha,
  guardarLotes,
} from "../../../../redux/ducks/reporteAlimento";
import {
  colEmpresaAlimento,
  colPisciculturaAlimento,
  colFechaAlimento,
  colRecetaAlimento,
} from "../../../../constants";
import "../FormParametros.css";

const ParametrosReporteAlimento = () => {
  registerLocale("es", es);
  const {
    nombreEmpresa,
    piscicultura,
    pmv,
    fecha,
    lotesTotales,
    filtros,
    lotesSeleccionados,
  } = useSelector((state) => state.reporteAlimento);

  const dispatch = useDispatch();
  const empresas = useMemo(
    () =>
      [
        ...lotesTotales.reduce((acc, current) => {
          if (
            (!filtros.includes(colFechaAlimento) ||
              (current.data[colFechaAlimento] &&
                current.data[colFechaAlimento]
                  .toString()
                  .startsWith(fecha.value))) &&
            (!filtros.includes(colRecetaAlimento) ||
              (current.data[colRecetaAlimento] &&
                current.data[colRecetaAlimento].toString() === pmv.value)) &&
            (!filtros.includes(colPisciculturaAlimento) ||
              current.data[colPisciculturaAlimento] === piscicultura.value) &&
            current.data[colEmpresaAlimento]
          ) {
            acc.add(current.data[colEmpresaAlimento]);
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [piscicultura, fecha, pmv, filtros, lotesTotales]
  );

  const pisciculturas = useMemo(
    () =>
      [
        ...lotesTotales.reduce((acc, current) => {
          if (
            (!filtros.includes(colFechaAlimento) ||
              (current.data[colFechaAlimento] &&
                current.data[colFechaAlimento]
                  .toString()
                  .startsWith(fecha.value))) &&
            (!filtros.includes(colRecetaAlimento) ||
              (current.data[colRecetaAlimento] &&
                current.data[colRecetaAlimento].toString() === pmv.value)) &&
            (!filtros.includes(colEmpresaAlimento) ||
              current.data[colEmpresaAlimento] === nombreEmpresa.value) &&
            current.data[colPisciculturaAlimento]
          ) {
            acc.add(current.data[colPisciculturaAlimento]);
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [nombreEmpresa, fecha, pmv, filtros, lotesTotales]
  );

  const pmvs = useMemo(
    () =>
      [
        ...lotesTotales.reduce((acc, current) => {
          if (
            (!filtros.includes(colFechaAlimento) ||
              (current.data[colFechaAlimento] &&
                current.data[colFechaAlimento]
                  .toString()
                  .startsWith(fecha.value))) &&
            (!filtros.includes(colEmpresaAlimento) ||
              current.data[colEmpresaAlimento] === nombreEmpresa.value) &&
            (!filtros.includes(colPisciculturaAlimento) ||
              current.data[colPisciculturaAlimento] === piscicultura.value) &&
            current.data[colRecetaAlimento]
          ) {
            acc.add(current.data[colRecetaAlimento].toString());
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [piscicultura, nombreEmpresa, fecha, filtros, lotesTotales]
  );

  const fechas = useMemo(
    () =>
      [
        ...lotesTotales.reduce((acc, current) => {
          if (
            (!filtros.includes(colEmpresaAlimento) ||
              current.data[colEmpresaAlimento] === nombreEmpresa.value) &&
            (!filtros.includes(colRecetaAlimento) ||
              (current.data[colRecetaAlimento] &&
                current.data[colRecetaAlimento].toString() === pmv.value)) &&
            (!filtros.includes(colPisciculturaAlimento) ||
              current.data[colPisciculturaAlimento] === piscicultura.value) &&
            current.data[colFechaAlimento]
          ) {
            acc.add(current.data[colFechaAlimento].substring(0, 10));
          }
          return acc;
        }, new Set()),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((v) => {
          return { value: v, label: v };
        }),
    [piscicultura, nombreEmpresa, pmv, filtros, lotesTotales]
  );

  const lotesOpciones = useMemo(
    () =>
      lotesTotales.filter(
        (v) =>
          (!filtros.includes(colFechaAlimento) ||
            (v.data[colFechaAlimento] &&
              v.data[colFechaAlimento].toString().startsWith(fecha.value))) &&
          (!filtros.includes(colEmpresaAlimento) ||
            v.data[colEmpresaAlimento] === nombreEmpresa.value) &&
          (!filtros.includes(colRecetaAlimento) ||
            (v.data[colRecetaAlimento] &&
              v.data[colRecetaAlimento].toString() === pmv.value)) &&
          (!filtros.includes(colPisciculturaAlimento) ||
            v.data[colPisciculturaAlimento] === piscicultura.value)
      ),
    [piscicultura, nombreEmpresa, pmv, fecha, filtros, lotesTotales]
  );

  return (
    <div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Empresa</div>
        <Select
          value={nombreEmpresa}
          options={empresas}
          isClearable={true}
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
          isClearable={true}
          options={pisciculturas}
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
            <div className="FormParametros__seccion_label">PMV</div>
            <Select
              options={pmvs}
              value={pmv}
              isClearable={true}
              placeholder="Seleccione PMV"
              onChange={(pmv) => dispatch(guardarPMV(pmv))}
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
      </div>
      <div className="FormParametros__seccion">
        <div className="FormParametros__seccion_label">Lote</div>
        <Select
          isMulti
          isClearable={true}
          isSearchable={true}
          value={lotesSeleccionados}
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
