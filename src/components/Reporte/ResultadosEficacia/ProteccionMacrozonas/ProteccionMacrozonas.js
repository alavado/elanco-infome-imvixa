import { useSelector } from 'react-redux';
import mapa from '../../../../assets/images/mapa.svg'
import './ProteccionMacrozonas.css'
import { extraerUltimosPeriodos, groupBy, mean, divisionTemporalALetra } from '../../utilitiesReporte'
import { colFechaEficacia, colMacrozonaEficacia, colEficaciaEficacia } from '../../../../constants'
import { onlyUnique } from "../../../../redux/ducks/utilities"

const getEficaciaMacrozona = (datos, zona) => {
  if (datos[zona]) return Math.round(mean(datos[zona].map(obj => obj[colEficaciaEficacia])) * 10) / 10
  return '-'
}

const ProteccionMacrozonas = () => {
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
      etiqueta: 'Macrozona 1',
      xPorcentaje: 18,
      yPorcentaje: 25
    },
    {
      valor: getEficaciaMacrozona(datos, 2),
      perteneceEmpresa: macrozonaEmpresa.includes(2),
      etiqueta: 'Macrozona 2',
      xPorcentaje: 6,
      yPorcentaje: 35
    },
    {
      valor: getEficaciaMacrozona(datos, 3),
      perteneceEmpresa: macrozonaEmpresa.includes(3),
      etiqueta: 'Macrozona 3',
      xPorcentaje: 15,
      yPorcentaje: 50
    },
    {
      valor: getEficaciaMacrozona(datos, 4),
      perteneceEmpresa: macrozonaEmpresa.includes(4),
      etiqueta: 'Macrozona 4',
      xPorcentaje: 28,
      yPorcentaje: 50
    },
    {
      valor: getEficaciaMacrozona(datos, 5),
      perteneceEmpresa: macrozonaEmpresa.includes(5),
      etiqueta: 'Macrozona 5',
      xPorcentaje: 12,
      yPorcentaje: 72
    },
    {
      valor: getEficaciaMacrozona(datos, 6),
      perteneceEmpresa: macrozonaEmpresa.includes(6),
      etiqueta: 'Macrozona 6',
      xPorcentaje: 67,
      yPorcentaje: 20
    },
    {
      valor: getEficaciaMacrozona(datos, 7),
      perteneceEmpresa: macrozonaEmpresa.includes(7),
      etiqueta: 'Macrozona 7',
      xPorcentaje: 87,
      yPorcentaje: 25
    },
    {
      valor: getEficaciaMacrozona(datos, 8),
      perteneceEmpresa: macrozonaEmpresa.includes(8),
      etiqueta: 'Macrozona 8',
      xPorcentaje: 75,
      yPorcentaje: 65
    }
  ]
  const indicadorGeneral = `*Promedio últimos 18 meses`
  const pinesPintados = pines.map(p => ({
    ...p,
    color: `var(--color-${p.perteneceEmpresa ? 'amarillo' : 'gris-4' }`
  }))

  return (
    <div className="ProteccionMacrozonas">
      <p className="ProteccionMacrozonas__titulo">
        Protección promedio industria registrada por<br />
        IMVIXA en cada macrozona X y XI regiones
      </p>
      <div className="ProteccionMacrozonas__contenedor_mapa">
        <div className="ProteccionMacrozonas__leyenda">
          <div
            className="ProteccionMacrozonas__pin ProteccionMacrozonas__pin--leyenda"
            style={{ '--fondo': 'var(--color-gris-4)' }}
          /> Macrozona sin centros de {nombreEmpresa}
          <div
            className="ProteccionMacrozonas__pin ProteccionMacrozonas__pin--leyenda"
            style={{ '--fondo': 'var(--color-amarillo)' }}
          /> Macrozona con centros de {nombreEmpresa}
        </div>
        <div className="ProteccionMacrozonas__indicador_general">
          {indicadorGeneral}
        </div>
        {
        pines.every(v => v.valor !== '-')
        ? null
        : (<div className="ProteccionMacrozonas__indicador_general_2">
             ** - indica macrozona sin datos disponibles
          </div>)
        }
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
            {pin.valor.toLocaleString('de-DE')}
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