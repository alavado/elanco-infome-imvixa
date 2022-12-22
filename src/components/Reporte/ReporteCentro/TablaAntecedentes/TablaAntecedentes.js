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
import { formatDistanceStrict } from 'date-fns'
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
  const lengthColumn = datosAntecedentes.length > 3 ? `${ 54 / (datosAntecedentes.length) }rem` : '16rem'
  const inputLenght = datosAntecedentes.length > 3 ? `${ (54 / (datosAntecedentes.length))-1 }rem` : '15rem'

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
          width: inputLenght
        }}
        value={grupo[i]}
        onChange={(e) => {
          const copiaGrupo = [...grupo];
          copiaGrupo[i] = e.target.value;
          dispatch(guardarGrupos(copiaGrupo));
        }}
      />,
      informe[colEstanquePeces].toLocaleString(language === 'es' ? 'de-DE' : 'en') ,
      fechas[i] && informe[colFechaTerminoTrat] ? formatDistanceStrict(fechas[i], new Date(informe[colFechaTerminoTrat]), language === 'es' ? {locale: es, unit: 'day'} : {unit: 'day'}) : language === 'es'? "Sin información" : 'No info',
      <DatePicker
        locale= {language}
        customInput={<ExampleCustomInput />}
        selected={fechas[i]}
        onChange={(date) => {
          const copiaFechas = [...fechas];
          copiaFechas[i] = date
          dispatch(guardarFechas(copiaFechas))
        }}
        maxDate={fechaVisita}
        dateFormat="dd-MMM-yyyy"
        className="FormParametros__datepicker"
      />,
      fechas[i] ? formatDistanceStrict(fechas[i], fechaVisita, language === 'es' ? {locale:es, unit: 'day'} : {unit: 'day'}) : language === 'es'? "Sin información" : 'No info',
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
            }, ${lengthColumn})`,
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
