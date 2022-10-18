import React from "react";
import "./TablaLotes.css";

const translate = (v) => {
  return v.replace('Lote', 'Lot').replace('Muestra', 'Sample').replace('Promedio', 'Average').replace('Cumplimiento', 'Achievement').replace('Desviación','Standard').replace('Estándar', 'Deviation')
}
const translateNumbers = (v) => {
  return v ? v.toString().replace(',', '-').replace('.', ',').replace('-','.') : '-'
}
const translateHeaders = (headers) => {
  return headers.map(v => translate(v))
}
const translateValues = (headers) => {
  return headers.map(v => translateNumbers(v))
}
const TablaLotesUI = ({ headers, values, language }) => {
  const finalHeaders = language === 'es' ? headers : translateHeaders(headers)
  const finalValues = language === 'es' ? values : translateValues(values)
  return (
    <div className="TablaLotes">
      <div
        className="TablaLotes__tabla"
        style={{
          gridTemplate: `3rem 1fr / repeat(${headers.length} , 1fr)`,
        }}
      >
        <div
          className="TablaLotes__encabezados"
          style={{ gridTemplateColumns: `1.5fr repeat(${headers.length - 3}, 1fr) 1.5fr 1.5fr` }}
        >
          {finalHeaders.map((col, i) => (
            <div key={`TablaLotes-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        <div
          key={`TablaLotes-fila-1}`}
          className="TablaLotes__fila"
          style={{ gridTemplateColumns: `1.5fr repeat(${headers.length - 3}, 1fr) 1.5fr 1.5fr` }}
        >
          {finalValues.map((v, i) => (
            <div key={`TablaLotes-valores-${i}`}>{v}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaLotesUI;
