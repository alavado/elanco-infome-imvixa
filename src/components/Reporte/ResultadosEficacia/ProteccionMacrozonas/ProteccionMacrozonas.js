import mapa from '../../../../assets/images/mapa.svg'
import './ProteccionMacrozonas.css'

const ProteccionMacrozonas = () => {

  const pines = [
    {
      valor: 0.6,
      etiqueta: 'Seno Reloncaví',
      xPorcentaje: 18,
      yPorcentaje: 22
    },
    {
      valor: 1.6,
      etiqueta: 'Chiloé Centro',
      xPorcentaje: 15,
      yPorcentaje: 60
    },
    {
      valor: 2.3,
      etiqueta: 'Pto. Cisne',
      xPorcentaje: 85,
      yPorcentaje: 25
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