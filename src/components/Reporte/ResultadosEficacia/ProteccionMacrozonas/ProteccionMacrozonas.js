import { useSelector } from 'react-redux';
import mapa from '../../../../assets/images/mapa.svg'
import './ProteccionMacrozonas.css'

const ProteccionMacrozonas = () => {
  const {
    nombreEmpresa
  } = useSelector((state) => state.reporte);
  const indicadorGeneral = 'IPromedio últimos 5Q o X semestres'

  const pines = [
    {
      valor: 0.6,
      etiqueta: 'Macrozona 1',
      xPorcentaje: 18,
      yPorcentaje: 25
    },
    {
      valor: 0.6,
      etiqueta: 'Macrozona 2',
      xPorcentaje: 6,
      yPorcentaje: 35
    },
    {
      valor: 1.6,
      etiqueta: 'Macrozona 3',
      xPorcentaje: 15,
      yPorcentaje: 50
    },
    {
      valor: 0.6,
      etiqueta: 'Macrozona 4',
      xPorcentaje: 28,
      yPorcentaje: 50
    },
    {
      valor: 0.6,
      etiqueta: 'Macrozona 5',
      xPorcentaje: 12,
      yPorcentaje: 72
    },
    {
      valor: 2.3,
      etiqueta: 'Macrozona 6',
      xPorcentaje: 67,
      yPorcentaje: 20
    },
    {
      valor: 2.3,
      etiqueta: 'Macrozona 7',
      xPorcentaje: 87,
      yPorcentaje: 25
    },
    {
      valor: 2.3,
      etiqueta: 'Macrozona 8',
      xPorcentaje: 75,
      yPorcentaje: 65
    }
  ]

  const umbralAmarillo = 1.5
  const pinesPintados = pines.map(p => ({
    ...p,
    color: `var(--color-${p.valor < umbralAmarillo ? 'gris-4' : 'amarillo'}`
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