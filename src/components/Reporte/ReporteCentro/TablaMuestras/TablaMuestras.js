import React from "react";
import { useSelector } from "react-redux";
import "./TablaMuestras.css";
import { colEstanquePeces, colFechaPeces, colInformePeces, colSampleOrigin, tipoSeaWater } from "../../../../constants";

const TablaMuestras = () => {
  const { datosPorInforme: datosEjercicio, fecha } = useSelector(
    (state) => state.reporteCentro
  );

  const nMuestras = 10;
  const headers = [
    "Fecha muestreo",
    "Informe N°",
    "Jaula",
    ...Array(nMuestras)
      .fill(1)
      .map((v, i) => `Muestra\n${i + 1}`),
    "Promedio (ppb)",
    "Min\n(ppb)",
    "Máx\n(ppb)",
  ];
  const filas = datosEjercicio;
  const nFilas = filas.length;
  const style1 = {
    gridTemplate: `3.5rem repeat(${nFilas}, 1fr) / 4fr 6fr repeat(14, 3fr)`,
    maxHeight: `calc(${nFilas + 1} * 3.5rem)`,
  };

  const style0 = {
    maxHeight: `calc(${nFilas + 1} * 3.5rem)`,
  };

  return (
    <div className="TablaMuestrasCentro" style={style0}>
      <p className="TablaMuestrasCentro__titulo">
      II. Resultados de concentración obtenidos en muestreo de seguimiento en mar
      </p>
      <div className="TablaMuestrasCentro__tabla" style={style1}>
        <div className="TablaMuestrasCentro__encabezados">
          {headers.map((col, i) => (
            <div key={`TablaMuestrasCentro-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        {filas.map((fila, i) => (
          <div key={`tm-fila-${i}`} className="TablaMuestrasCentro__fila">
            <div className="TablaMuestrasCentro__celda">
              <p>{fecha.value}</p>
            </div>
            <div className="TablaMuestrasCentro__celda">
              <p>{fila[colInformePeces]}</p>
            </div>
            <div className="TablaMuestrasCentro__celda">
              <p>{fila[colEstanquePeces]}</p>
            </div>
            {fila["muestras"].map((muestra, j) => (
              <div
                key={`TablaMuestrasCentro-celda-${i}-${j}`}
                className="TablaMuestrasCentro__celda"
              >
                {muestra === "-" ? (
                  muestra
                ) : (
                  <p
                  >
                    {muestra.toLocaleString("de-DE", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                )}
              </div>
            ))}
            <div className="TablaMuestrasCentro__celda">
              {
                <p
                >
                  {fila["prom"].toLocaleString("de-DE", {
                    maximumFractionDigits: 0,
                  })}
                </p>
              }
            </div>
            <div className="TablaMuestrasCentro__celda">
              {fila["min"].toLocaleString("de-DE", {
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="TablaMuestrasCentro__celda">
              {fila["max"].toLocaleString("de-DE", {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablaMuestras;
