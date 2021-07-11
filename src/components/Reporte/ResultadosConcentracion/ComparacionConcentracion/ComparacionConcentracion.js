import './ComparacionConcentracion.css'

const ComparacionConcentracion = () => {

  const inicio = 'Abril \'21', fin = 'Mayo \'21'
  const periodo = 'últimos 5Q'

  const datos = [
    {
      nombre: 'Industria',
      promedio: 18,
      iqr: 5,
      max: 34.9,
      min: 2.5
    },
    {
      nombre: 'Empresa',
      promedio: 20,
      iqr: 5,
      max: 34.9,
      min: 2.5
    },
    {
      nombre: 'Río del Este',
      promedio: 12,
      iqr: 4,
      max: 25,
      min: 2.5
    },
    {
      nombre: 'UPS',
      promedio: 19,
      iqr: 2,
      max: 25.5,
      min: 12.5
    },
    {
      nombre: 'Río Plata',
      promedio: 24,
      iqr: 3,
      max: 33,
      min: 14
    }
  ]

  const xMax = datos.reduce((max, d) => {
    return d.max > max ? (5 * Math.floor((d.max + 5) / 5)) : max
  }, 0)
  const separaciones = xMax / 5

  return (
    <div className="ComparacionConcentracion">
      <p className="ComparacionConcentracion__titulo">
        Comparación concentración (ppb) 
        en músculo
      </p>
      <div className="ComparacionConcentracion__contenedor_grafico">
        {[...datos, { nombre: '' }].map(d => (
          <div className="ComparacionConcentracion__categoria">
            <div className="ComparacionConcentracion__etiqueta_categoria">{d.nombre}</div>
            {d.nombre &&
              <div
                className="ComparacionConcentracion__contenedor_caja"
                style={{
                  left: `calc(19% + ${100 * d.min / xMax}%)`,
                  right: `calc(2% + ${100 * (xMax- d.max) / xMax}%)`,
                }}
              >
                <div
                  className="ComparacionConcentracion__bigote_inferior"
                  style={{ width: `${100 * (d.promedio - d.iqr - d.min) / xMax}%` }}
                />
                <div
                  className="ComparacionConcentracion__caja"
                >
                  {d.promedio}
                </div>
                <div
                  className="ComparacionConcentracion__bigote_superior"
                  style={{ width: `${100 * (d.max - d.iqr - d.promedio) / xMax}%` }}
                />
              </div>
            }
            {Array(separaciones).fill(0).map(s => (
              <div className="ComparacionConcentracion__separacion" />
            ))}
          </div>
        ))}
        <div className="ComparacionConcentracion__valores">
          <div className="ComparacionConcentracion__etiqueta_categoria" />
          {Array(separaciones).fill(0).map((_, i) => (
            <div className="ComparacionConcentracion__valor">
              {i % 2 > 0 ? '' : i}
            </div>
          ))}
        </div>
      </div>
      <div className="ComparacionConcentracion__bajada">
        <p>Industria y Empresa: promedio {periodo}</p>
        <p>Pisciculturas: promedio {inicio} - {fin}</p>
      </div>
    </div>
  )
}

export default ComparacionConcentracion