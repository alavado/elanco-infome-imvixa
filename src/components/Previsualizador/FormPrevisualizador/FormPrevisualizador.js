import React, { useEffect } from 'react'
import Select from "react-select";
import classNames from "classnames";
import './FormPrevisualizador.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  borrarRegistros,
  seleccionarReporte,
  filtrarPorEmpresa,
  filtrarPorFecha,
  filtrarPorTipo } from '../../../redux/ducks/previsualizador';
import { colFechaAlimento } from '../../../constants';
import { localeSort } from '../../../redux/ducks/utilities';
import { reportes } from '../../../helpers/reportes';
import { cargarComentariosAlimento, cargarComentariosMusculo, cargarComentariosCentro } from '../../../redux/ducks/comentarios';
import { cargarPreViz as cargarPreVizAlimento } from '../../../redux/ducks/reporteAlimento';
import { cargarPreViz as cargarPreVizMusculo } from '../../../redux/ducks/reporteMusculo';
import { cargarPreVizCentro } from '../../../redux/ducks/reporteCentro';

const FormPrevisualizador = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { opcionesCodigos, reporte, filtroTipo, filtroEmpresa, filtroFecha, codigoSeleccionado } = useSelector(state => state.previsualizador)
  // Acciones de botones
  const goToViz = async () => {
    const datos = JSON.parse(reporte.Datos)
    switch (reporte.TipoID) {
      case 1:
        dispatch(cargarComentariosAlimento(datos[0].comentarios))
        dispatch(cargarPreVizAlimento({
          // fecha: reporte.Fecha,
          nombreEmpresa: reporte.Empresa, 
          lotes: datos
        }))
        break
      case 2:
        dispatch(cargarComentariosMusculo(datos.comentarios))
        dispatch(cargarPreVizMusculo({
          fecha: reporte.Fecha,
          nombreEmpresa: reporte.Empresa, 
          datos
        }))
        break
      default:
        dispatch(cargarComentariosCentro(datos.comentarios))
        dispatch(cargarPreVizCentro({
          fecha: reporte.Fecha,
          nombreEmpresa: reporte.Empresa, 
          datos
        }))
    }

    history.push('/visualizador')
  };

  const goBackToMenu = async () => {
    dispatch(borrarRegistros())
    history.push('/')
  };

  // Filtrar opciones de los selectores
  let codigosFinales = opcionesCodigos;
  if (filtroTipo !== null) {
    codigosFinales = opcionesCodigos.filter(v => v.tipo === filtroTipo.value)
  }
  if (filtroEmpresa !== null) {
    codigosFinales = codigosFinales.filter(v => v.empresa === filtroEmpresa.value)
  }
  if (filtroFecha !== null) {
    codigosFinales = codigosFinales.filter(v => v.fecha === filtroFecha.value)
  }

  // Armar lista de empresas, fechas, codigos, tipos 
  const empresasSet = new Set()
  const fechasSet = new Set()
  const tipoSet = new Set()
  codigosFinales.forEach(v => {
    empresasSet.add(v.empresa)
    fechasSet.add(v.fecha)
    tipoSet.add(v.tipo)
  })

  // HACER LAS OPCIONES 

  const opcionesEmpresa = localeSort([...empresasSet]).map((v) => {
    return { value: v, label: v };
  })
  const  opcionesFecha = localeSort([...fechasSet]).map((v) => {
    return { value: v, label: v };
  })
  const opcionesTipo = [...tipoSet].map((id) => {
    return { value: id, label: reportes.find(v => v.id === id).alias };
  })

  return (
    <div>
        <div className="FormParametros__seccion">
          <div className="FormParametros__seccion_label">Empresa</div>
          <Select
            value={filtroEmpresa !== null ? filtroEmpresa : null}
            options={opcionesEmpresa}
            isClearable={true}
            onChange={(nombre) => dispatch(filtrarPorEmpresa(nombre))}
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
          <div className="FormParametros__grupo">
            <div className="FormParametros__elemento">
              <div className="FormParametros__seccion_label">Tipo</div>
              <Select
                options={opcionesTipo}
                value={filtroTipo === null ? null : filtroTipo}
                isClearable={true}
                placeholder="Seleccione tipo"
                onChange={(tipo) => dispatch(filtrarPorTipo(tipo))}
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
                options={opcionesFecha}
                isClearable={true}
                value={filtroFecha === null ? "" : filtroFecha}
                onChange={(f) => dispatch(filtrarPorFecha(f))}
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
          <div className="FormParametros__seccion_label">Código</div>
          <Select
            isClearable={true}
            isSearchable={true}
            value={codigoSeleccionado}
            name="colors"
            options={codigosFinales}
            placeholder="Seleccione lotes"
            className="basic-multi-select"
            classNamePrefix="select"
            noOptionsMessage={(obj) => "No hay más opciones"}
            onChange={(l) => dispatch(seleccionarReporte(l))}
          />
        </div>
        <div className="FormPrevisualizador__botones">
          <button
            onClick={() => goBackToMenu()}
            className={classNames({
              FormPrevisualizador__boton: true,
              "FormPrevisualizador__boton--activo": true,
            })}
          >
            Volver
          </button>
          <button
            onClick={reporte === null ? null : () => goToViz()}
            className={classNames({
              FormPrevisualizador__boton: true,
              "FormPrevisualizador__boton--activo": reporte !== null
            })}
          >
            Ver reporte
          </button>
      </div>
    </div>
  )
}

export default FormPrevisualizador