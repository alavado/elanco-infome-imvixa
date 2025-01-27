import React from "react";
import "./FormSeleccionarProducto.css";
import classNames from "classnames";
import { productos } from "../../../helpers/productos";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarProducto, limpiarFormularioAlimento, limpiarFormularioEficacia, limpiarFormularioPeces, limpiarFormularioPecesTratados } from "../../../redux/ducks/parametrosGenerales";
import { limpiarFormRerpoteMusculo } from "../../../redux/ducks/reporteMusculo";
import { limpiarFormulario } from "../../../redux/ducks/reporteSeguimiento";

const FormSeleccionarProducto = () => {
  const dispatch = useDispatch();
  const { producto } = useSelector((state) => state.parametrosGenerales);

  const selectProductAndCleanData = (newProductID) => {
    const sameThanCurrent = producto.id === newProductID;
    console.log({
      sameThanCurrent
    })
    if (!sameThanCurrent) {
      dispatch(limpiarFormularioAlimento());
      dispatch(limpiarFormularioEficacia());
      dispatch(limpiarFormularioPecesTratados());
      dispatch(limpiarFormularioPeces());
    }
    dispatch(seleccionarProducto(newProductID));
  }

  return (
    <div>
      <div className="FormSeleccionarProducto__seccion">
        {productos.map((p) => (
          <button
            key={`reporte-${p.id}`}
            onClick={() => selectProductAndCleanData(p.id)}
            className={classNames({
              FormSeleccionarProducto_boton: true,
              "FormSeleccionarProducto_boton--inactivo":
              producto.id !== p.id,
            })}
          >
            {p.titulo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormSeleccionarProducto;
