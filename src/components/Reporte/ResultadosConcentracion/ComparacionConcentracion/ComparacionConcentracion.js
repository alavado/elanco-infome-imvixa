import './ComparacionConcentracion.css'

const ComparacionConcentracion = () => {

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
      <div
        className="ComparacionConcentracion__contenedor_grafico"
        style={{
          '--filas': datos.length,
          '--columnas': separaciones
        }}
      >
        {datos.map(d => (
          <div key={`etiqueta-${d.nombre}`}>
            {d.nombre}
          </div>
        ))}
        {Array(separaciones * datos.length).fill('').map((_, i) => (
          <div className="ComparacionConcentracion__celda" key={`celda-comcon-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default ComparacionConcentracion