import { useSelector } from 'react-redux';
import mapa from '../../../../assets/images/mapa.svg'
import './ProteccionMacrozonas.css'
import { extraerUltimosPeriodos, groupBy, mean } from '../../utilitiesReporte'
import { colFechaEficacia, colMacrozonaEficacia, colEficaciaEficacia } from '../../../../constants'
import { onlyUnique } from "../../../../redux/ducks/utilities"
import { generalTexts } from '../../generalTexts'

const getEficaciaMacrozona = (datos, zona) => {
  if (datos[zona]) {
    const datosDisponibles = datos[zona].map(obj => obj[colEficaciaEficacia]).filter(e => e)
    if (datosDisponibles.length === 0) return '-'
    return Math.round(mean(datosDisponibles) * 10) / 10
  }
  return '-'
}

const ProteccionMacrozonas = ({language}) => {
  const {macrozona, titulo, leyenda1, leyenda2} = generalTexts.ProteccionMacrozonas[language]

  const {
    nombreEmpresa,
    datosFiltradosEficacia,
    datosFiltradosIndustriaEficacia,
    fechaFinal
  } = useSelector((state) => state.reporte)

  // Ultimos 18 meses
  const macrozonaEmpresa = extraerUltimosPeriodos(
    'semestral', 
    datosFiltradosEficacia, 
    colFechaEficacia, 
    fechaFinal,
    3).map(
      obj => obj[colMacrozonaEficacia]
    ).filter(onlyUnique)
  
    // Ultimos 18 meses
  const datosGrafico = extraerUltimosPeriodos(
    'semestral', 
    datosFiltradosIndustriaEficacia, 
    colFechaEficacia, 
    fechaFinal,
    3)
    
  const datos = groupBy(datosGrafico, colMacrozonaEficacia)
  const pines = [
    {
      valor: getEficaciaMacrozona(datos, 1),
      perteneceEmpresa: macrozonaEmpresa.includes(1),
      etiqueta: macrozona +' 1',
      xPorcentaje: 18,
      yPorcentaje: 25
    },
    {
      valor: getEficaciaMacrozona(datos, 2),
      perteneceEmpresa: macrozonaEmpresa.includes(2),
      etiqueta: macrozona +' 2',
      xPorcentaje: 6,
      yPorcentaje: 35
    },
    {
      valor: getEficaciaMacrozona(datos, 3),
      perteneceEmpresa: macrozonaEmpresa.includes(3),
      etiqueta: macrozona +' 3',
      xPorcentaje: 15,
      yPorcentaje: 50
    },
    {
      valor: getEficaciaMacrozona(datos, 4),
      perteneceEmpresa: macrozonaEmpresa.includes(4),
      etiqueta: macrozona +' 4',
      xPorcentaje: 28,
      yPorcentaje: 50
    },
    {
      valor: getEficaciaMacrozona(datos, 5),
      perteneceEmpresa: macrozonaEmpresa.includes(5),
      etiqueta: macrozona +' 5',
      xPorcentaje: 12,
      yPorcentaje: 72
    },
    {
      valor: getEficaciaMacrozona(datos, 6),
      perteneceEmpresa: macrozonaEmpresa.includes(6),
      etiqueta: macrozona +' 6',
      xPorcentaje: 67,
      yPorcentaje: 20
    },
    {
      valor: getEficaciaMacrozona(datos, 7),
      perteneceEmpresa: macrozonaEmpresa.includes(7),
      etiqueta: macrozona +' 7',
      xPorcentaje: 87,
      yPorcentaje: 25
    },
    {
      valor: getEficaciaMacrozona(datos, 8),
      perteneceEmpresa: macrozonaEmpresa.includes(8),
      etiqueta: macrozona +' 8',
      xPorcentaje: 75,
      yPorcentaje: 65
    }
  ]
  // const indicadorGeneral = `Promedio últimos 18 meses`
  const pinesPintados = pines.map(p => ({
    ...p,
    color: `var(--color-${p.perteneceEmpresa ? 'azul' : 'gris-4' }`
  }))

  return (
    <div className="ProteccionMacrozonas">
      <p className="ProteccionMacrozonas__titulo">
       {titulo} 
      </p>
      <div className="ProteccionMacrozonas__contenedor_mapa">
        <div className="ProteccionMacrozonas__leyenda">
          <div
            className="ProteccionMacrozonas__pin ProteccionMacrozonas__pin--leyenda"
            style={{ '--fondo': 'var(--color-gris-4)' }}
          />{leyenda1(nombreEmpresa)}
          <div
            className="ProteccionMacrozonas__pin ProteccionMacrozonas__pin--leyenda"
            style={{ '--fondo': 'var(--color-azul)' }}
          /> {leyenda2(nombreEmpresa)}
        </div>
        {/* <div className="ProteccionMacrozonas__indicador_general">
          {indicadorGeneral}
        </div> */}
        {/* {
        pines.every(v => v.valor !== '-')
        ? null
        : (<div className="ProteccionMacrozonas__indicador_general_2">
            - indica macrozona sin datos disponibles
          </div>)
        } */}
        <img className="ProteccionMacrozonas__mapa" src={mapa} alt="Mapa" />
        <div className="ProteccionMacrozonas__separador_mapa" />
        {pinesPintados.map(pin => (
          <div
            key={`pin-mapa-${pin.etiqueta}`}
            className="ProteccionMacrozonas__pin"
            style={{
              left: `${pin.xPorcentaje}%`,
              top: `${pin.yPorcentaje}%`,
              '--fondo': pin.color
            }}
          >
            {pin.valor.toLocaleString(language === 'es' ? 'de-DE' : 'en')}
            <div className="ProteccionMacrozonas__pin_etiqueta">
              {pin.etiqueta}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProteccionMacrozonas