import mapa from '../../../../assets/images/mapa.svg'
import './ProteccionMacrozonas.css'

const ProteccionMacrozonas = () => {

  const pines = [
    {
      valor: 0.6,
      etiqueta: 'Seno Reloncaví',
      xPorcentaje: 18,
      yPorcentaje: 25
    },
    {
      valor: 0.6,
      etiqueta: 'MZ 2',
      xPorcentaje: 6,
      yPorcentaje: 35
    },
    {
      valor: 1.6,
      etiqueta: 'Chiloé Centro',
      xPorcentaje: 15,
      yPorcentaje: 50
    },
    {
      valor: 0.6,
      etiqueta: 'MZ 4',
      xPorcentaje: 28,
      yPorcentaje: 50
    },
    {
      valor: 0.6,
      etiqueta: 'MZ 5',
      xPorcentaje: 12,
      yPorcentaje: 72
    },
    {
      valor: 2.3,
      etiqueta: 'MZ 6',
      xPorcentaje: 67,
      yPorcentaje: 20
    },
    {
      valor: 2.3,
      etiqueta: 'Pto. Cisne',
      xPorcentaje: 87,
      yPorcentaje: 25
    },
    {
      valor: 2.3,
      etiqueta: 'MZ 8',
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
        <img className="ProteccionMacrozonas__mapa" src={mapa} alt="Mapa" />
        <div className="ProteccionMacrozonas__separador_mapa" />
        {pinesPintados.map((pin, i) => (
          <div
            key={`pin-mapa-${i}`}
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