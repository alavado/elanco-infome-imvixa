import React, { useEffect, useMemo, useState } from "react";
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
  cargarConfigGraficos,
  toggleModal,
} from "../../../../redux/ducks/reporteCentro";
import { InlineIcon } from "@iconify/react";
import "./ParametrosReporteCentro.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const { ipcRenderer } = window.require("electron");

const ParametrosReporteCentro = () => {
  registerLocale("es", es);
  const {
    nombreEmpresa,
    centro,
    filtros,
    fecha,
    datosSeleccionParametros,
    mostrandoModalConf,
    parametrosGraficoPeso,
    parametrosGraficoUTAs
  } = useSelector((state) => state.reporteCentro);

  const [graficoUTAs, setGraficoUTAs] = useState(parametrosGraficoUTAs)
  const [graficoPeso, setGraficoPeso] = useState(parametrosGraficoPeso)

  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.send("cargarConfiguracionGraficos");
    ipcRenderer.once("cargarConfiguracionGraficos", async (e, data) => {
      if (data !== null) {
        // cargar config graficos en state
        console.log("SI HAY ARCHIVO")
        console.log({data})
        dispatch(cargarConfigGraficos(data));
      } else {
        console.log("NO HAY ARCHIVO")
      }
    });
  }, []);

  const closeModal = () => {
    dispatch(toggleModal());
  };

  const saveChanges = () => {
    dispatch(cargarConfigGraficos({
      defaultGraficoUtas: graficoUTAs,
      defaultGraficoPeso: graficoPeso
    }))
    dispatch(toggleModal());
    // Guardar en archivo de configuracion
    ipcRenderer.send("guardarConfiguracionGraficos", {
      graficoUTAs,
      graficoPeso
    });
  }



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

  return (
    <div>
      <div className="FormParametros__action">
        <button
          className="FormParametros__boton_config"
          title="Configuración"
          onClick={(f) => dispatch(toggleModal())}
        >
          <InlineIcon icon="mdi-settings" />
        </button>
      </div>
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
      <Dialog open={mostrandoModalConf} onClose={closeModal}>
        <DialogTitle>Configuración de curvas de depleción</DialogTitle>
        <DialogContent>
          <DialogContentText>Parámetros de curva según peso</DialogContentText>
          <TextField
            autoFocus
            defaultValue={parametrosGraficoPeso.coefInf}
            onChange={(e) => {setGraficoPeso({
              ...graficoPeso,
              coefInf: e.target.value
            })}}
            margin="dense"
            id="peso-inf-coef"
            label="Curva inferior - coeficiente"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoPeso.aInf}
            onChange={(e) => {setGraficoPeso({
              ...graficoPeso,
              aInf: e.target.value
            })}}
            margin="dense"
            id="peso-inf-a"
            label="Curva inferior - a"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoPeso.coefEst}
            onChange={(e) => {setGraficoPeso({
              ...graficoPeso,
              coefEst: e.target.value
            })}}
            margin="dense"
            id="peso-est-coef"
            label="Curva estimada - coeficiente"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoPeso.aEst}
            onChange={(e) => {setGraficoPeso({
              ...graficoPeso,
              aEst: e.target.value
            })}}
            margin="dense"
            id="peso-est-a"
            label="Curva estimada - a"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoPeso.coefSup}
            onChange={(e) => {setGraficoPeso({
              ...graficoPeso,
              coefSup: e.target.value
            })}}
            margin="dense"
            id="peso-sup-coef"
            label="Curva superior - coeficiente"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoPeso.aSup}
            onChange={(e) => {setGraficoPeso({
              ...graficoPeso,
              aSup: e.target.value
            })}}
            margin="dense"
            id="peso-sup-a"
            label="Curva superior - a"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Parámetros de curva según UTAs</DialogContentText>
          <TextField
            defaultValue={parametrosGraficoUTAs.coef}
            onChange={(e) => {setGraficoUTAs({
              ...graficoUTAs,
              coef: e.target.value
            })}}
            margin="dense"
            id="uta-coef"
            label="Coeficiente"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoUTAs.aInf}
            onChange={(e) => {setGraficoUTAs({
              ...graficoUTAs,
              aInf: e.target.value
            })}}
            margin="dense"
            id="uta-inf-a"
            label="Curva inferior - a"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoUTAs.aEst}
            onChange={(e) => {setGraficoUTAs({
              ...graficoUTAs,
              aEst: e.target.value
            })}}
            margin="dense"
            id="uta-est-a"
            label="Curva estimada - a"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            defaultValue={parametrosGraficoUTAs.aSup}
            onChange={(e) => {setGraficoUTAs({
              ...graficoUTAs,
              aSup: e.target.value
            })}}
            margin="dense"
            id="uta-sup-a"
            label="Curva superior - a"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button onClick={saveChanges}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParametrosReporteCentro;
