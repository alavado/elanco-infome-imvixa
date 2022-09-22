import React from "react";
import "./TablaLotes.css";

const TablaLotesUI = ({ headers, values }) => {
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
          {headers.map((col, i) => (
            <div key={`TablaLotes-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        <div
          key={`TablaLotes-fila-1}`}
          className="TablaLotes__fila"
          style={{ gridTemplateColumns: `1.5fr repeat(${headers.length - 3}, 1fr) 1.5fr 1.5fr` }}
        >
          {values.map((v, i) => (
            <div key={`TablaLotes-valores-${i}`}>{v}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaLotesUI;
