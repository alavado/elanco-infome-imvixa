import React from "react";
import { useSelector } from "react-redux";
import "./TablaMuestras.css";
import { colEstanquePeces, colInformePeces } from "../../../../constants";
import { generalTexts } from '../generalTexts'

const TablaMuestras = ({language}) => {
  const { umbral, umbralDestacar, datosEjercicio } = useSelector(
    (state) => state.reporteMusculo
  );
  const valorDestacar = parseInt(umbralDestacar.replace(".", ""));
  const nMuestras = 10;
  const { gt_TablaMuestras } = generalTexts
  const { titulo, headers: headersLabels, headers2, rows } = gt_TablaMuestras[language]
  const headers = [
    headersLabels[0],
    headersLabels[1],
    ...Array(nMuestras)
      .fill(1)
      .map((v, i) => `${headersLabels[2]}\n${i + 1}`),
    headersLabels[3],
    headersLabels[4],
    headersLabels[5],
    headersLabels[6],
    headersLabels[7]
  ];

  const filas = datosEjercicio;
  const nFilas = filas.length;
  const style1 = {
    gridTemplate: `repeat(${nFilas + 1}, 1fr) / 2fr repeat(15, 1fr) 2fr`,
    maxHeight: `calc(${nFilas + 1} * 3rem)`,
  };

  const style0 = {
    maxHeight: `calc(${nFilas + 1 + 4} * 3rem)`,
  };

  const colorPorResultado = (r) => {
    if (r === 2) return "var(--color-g)";
    else if (r === 1) return "var(--color-f)";
    else return "var(--color-amarillo)";
  };

  return (
    <div className="TablaMuestras" style={style0}>
      <p className="TablaMuestras__titulo">
        {titulo}
      </p>
      <div className="TablaMuestras__tabla" style={style1}>
        <div className="TablaMuestras__encabezados">
          {headers.map((col, i) => (
            <div key={`TablaMuestras-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        {filas.map((fila, i) => (
          <div key={`tm-fila-${i}`} className="TablaMuestras__fila">
            <div className="TablaMuestras__celda">
              <p>{fila[colInformePeces]}</p>
            </div>
            <div className="TablaMuestras__celda">
              <p>{fila[colEstanquePeces]}</p>
            </div>
            {fila["muestras"].map((muestra, j) => (
              <div
                key={`TablaMuestras-celda-${i}-${j}`}
                className="TablaMuestras__celda"
              >
                {muestra === "-" ? (
                  muestra
                ) : (
                  <p
                    style={{
                      color:
                        muestra < valorDestacar
                          ? "var(--color-warning)"
                          : "initial",
                    }}
                  >
                    {muestra.toLocaleString("de-DE", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                )}
              </div>
            ))}
            <div className="TablaMuestras__celda">
              {
                <p
                  style={{
                    color:
                      fila["prom"] < valorDestacar
                        ? "var(--color-warning)"
                        : "initial",
                  }}
                >
                  {fila["prom"].toLocaleString("de-DE", {
                    maximumFractionDigits: 0,
                  })}
                </p>
              }
            </div>
            <div className="TablaMuestras__celda">
              {fila["cv"].toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
              %
            </div>
            <div className="TablaMuestras__celda">
              {fila["min"].toLocaleString("de-DE", {
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="TablaMuestras__celda">
              {fila["max"].toLocaleString("de-DE", {
                maximumFractionDigits: 0,
              })}
            </div>
            <div
              className="TablaMuestras__celda"
              style={{
                color: "var( --color-fondo)",
                backgroundColor: colorPorResultado(fila["resultado"]),
              }}
            >
              {fila["resultado"]}
            </div>
          </div>
        ))}
      </div>
      <div className="TablaMuestras__footer">
        <div className="TablaMuestras__encabezado_footer">
          <div>{headers2[0]}</div>
          <div>{headers2[1]}</div>
        </div>
        <div className="TablaMuestras__fila_footer">
          <div style={{ backgroundColor: "var(--color-g)" }}>2</div>
          <div>
          {rows[0]} &ge; {umbral}{" "}
            ppb; CV &le; 30%{")"}
          </div>
        </div>
        <div className="TablaMuestras__fila_footer">
          <div style={{ backgroundColor: "var(--color-f)" }}>1</div>
          <div>
          {rows[1]} &ge; {umbral} ppb; CV &ge; 30%{")"}
          </div>
        </div>
        <div className="TablaMuestras__fila_footer">
          <div style={{ backgroundColor: "var(--color-amarillo)" }}>0</div>
          <div>
          {rows[2]} &le; {umbral} ppb{")"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaMuestras;
