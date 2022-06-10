import React from "react";
import "./FormSeleccionarReporte.css";
import classNames from "classnames";
import { reportes } from "../../../helpers/reportes";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarReporte } from "../../../redux/ducks/parametrosGenerales";

const FormSeleccionarReporte = () => {
  const dispatch = useDispatch();
  const { reporte } = useSelector((state) => state.parametrosGenerales);

  return (
    <div>
      <div className="FormSeleccionarReporte__seccion">
        {reportes.map((r) => (
          <button
            key={`reporte-${r.id}`}
            onClick={() => dispatch(seleccionarReporte(r.id))}
            className={classNames({
              FormSeleccionarReporte_boton: true,
              "FormSeleccionarReporte_boton--inactivo":
                reporte && reporte.id !== r.id,
            })}
          >
            {r.titulo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormSeleccionarReporte;
