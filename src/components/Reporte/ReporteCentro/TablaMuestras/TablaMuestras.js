import React from "react";
import { useSelector } from "react-redux";
import "./TablaMuestras.css";
import { colEstanquePeces, colInformePeces } from "../../../../constants";
import { generalTexts } from '../generalTexts'

const TablaMuestras = ({ language }) => {
  const { datosPorInforme: datosEjercicio, fechaValor } = useSelector(
    (state) => state.reporteCentro
  );
  const { gt_TablaMuestras } = generalTexts
  const { titulo, headers: headersLabels } = gt_TablaMuestras[language]

  const nMuestras = 10;
  const headers = [
    headersLabels[0],
    headersLabels[1],
    headersLabels[2],
    ...Array(nMuestras)
      .fill(1)
      .map((v, i) => `${headersLabels[3]}\n${i + 1}`),
      headersLabels[4],
      headersLabels[5],
      headersLabels[6],
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
      {titulo}
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
              <p>{fechaValor}</p>
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
                    {muestra.toLocaleString(language === 'es' ? "de-DE" : 'en', {
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
                  {fila["prom"].toLocaleString(language === 'es' ? "de-DE" : 'en', {
                    maximumFractionDigits: 0,
                  })}
                </p>
              }
            </div>
            <div className="TablaMuestrasCentro__celda">
              {fila["min"].toLocaleString(language === 'es' ? "de-DE" : 'en', {
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="TablaMuestrasCentro__celda">
              {fila["max"].toLocaleString(language === 'es' ? "de-DE" : 'en', {
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
