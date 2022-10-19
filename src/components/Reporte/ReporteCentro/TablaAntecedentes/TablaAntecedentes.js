import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  colEstanquePeces,
  colFechaTerminoTrat,
  colUTAs,
} from "../../../../constants";
import "./TablaAntecedentes.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { formatDistance } from 'date-fns'
import { generalTexts } from '../generalTexts';
import { guardarFechas, guardarGrupos } from "../../../../redux/ducks/reporteCentro";

const TablaAntecedentes = ({ language }) => {
  registerLocale("es", es);
  const { datosPorInforme: datosAntecedentes, fechaValor, fechas, grupos: grupo } = useSelector(
    (state) => state.reporteCentro
  );
  const dispatch = useDispatch()
  const { gt_TablaAntecedentes } = generalTexts
  const labels = gt_TablaAntecedentes[language].columna


  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      defaultValue={value}
      className="TablaAntecedentesCentro__button"
      onClick={onClick}
      ref={ref}
    />
  ));
  const fechaVisita = new Date(fechaValor)

  const columnas = [
    labels,
    ...datosAntecedentes.map((informe, i) => {
      return [
        informe['pisciculturasOrigen'] && informe['pisciculturasOrigen'].length > 0 ? informe['pisciculturasOrigen'].join(' / ') : language === 'es'? "Sin información" : 'No info',
      <input
        className="TablaAntecedentesCentro__input"
        style={{
          backgroundColor:
            grupo[i] !== "" ? "transparent" : "var(--color-highlight)",
        }}
        value={grupo[i]}
        onChange={(e) => {
          const copiaGrupo = [...grupo];
          copiaGrupo[i] = e.target.value;
          dispatch(guardarGrupos(copiaGrupo));
        }}
      />,
      informe[colEstanquePeces].toLocaleString(language === 'es' ? 'de-DE' : 'en') ,
      fechas[i] && informe[colFechaTerminoTrat] ? formatDistance(fechas[i], new Date(informe[colFechaTerminoTrat]), language === 'es' ? {locale: es} : {}) : language === 'es'? "Sin información" : 'No info',
      <DatePicker
        locale="es"
        customInput={<ExampleCustomInput />}
        selected={fechas[i]}
        onChange={(date) => {
          const copiaFechas = [...fechas];
          copiaFechas[i] = date
          dispatch(guardarFechas(copiaFechas))
        }}
        maxDate={fechaVisita}
        dateFormat="dd/MM/yyyy"
        className="FormParametros__datepicker"
      />,
      fechas[i] ? formatDistance(fechas[i], fechaVisita, language === 'es' ? {locale:es} : {}) : language === 'es'? "Sin información" : 'No info',
      informe[colUTAs] ? informe[colUTAs].toLocaleString(language === 'es' ? 'de-DE' : 'en') : language === 'es'? "Sin información" : 'No info'
    ]}),
  ];


  return (
    <div className="TablaAntecedentesCentro">
      <div className="TablaAntecedentesCentro__contenedor">
        <h4 className="TablaAntecedentesCentro__titulo">
          {gt_TablaAntecedentes[language].titulo}
        </h4>
        <div
          className="TablaAntecedentesCentro__tabla"
          style={{
            gridTemplate: `repeat(1, 1fr) / 20rem repeat(${
              columnas.length - 1
            }, 16rem)`,
          }}
        >
          {columnas.map((columna, j) => (
            <div
              className="TablaAntecedentesCentro__columna"
              key={`col${j}-antecedentes`}
            >
              {columna.map((fila, i) => (
                <div
                  key={`col${j}-fila-antecedentes-${i}`}
                  className="TablaAntecedentesCentro__fila"
                >
                  <div className="TablaAntecedentesCentro__valor">{fila}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaAntecedentes;
