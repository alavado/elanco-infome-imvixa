import React from "react";
import "./FormSeleccionarProducto.css";
import classNames from "classnames";
import { productos } from "../../../helpers/productos";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarProducto } from "../../../redux/ducks/parametrosGenerales";

const FormSeleccionarProducto = () => {
  const dispatch = useDispatch();
  const { producto } = useSelector((state) => state.parametrosGenerales);

  return (
    <div>
      <div className="FormSeleccionarProducto__seccion">
        {productos.map((p) => (
          <button
            key={`reporte-${p.id}`}
            onClick={() => dispatch(seleccionarProducto(p.id))}
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
