import './Tratamientos.css'

export const TRATAMIENTOS_IMVIXA = 'Imvixa'
export const TRATAMIENTOS_HEXAFLUMURON = 'Hexaflumurón'

const Tratamientos = () => {

  const promedioIndustria = '7 meses'
  const promedioEmpresa = '8,8 meses'

  const datos = [
    {
      nombre: 'Pisc. 1',
      valor: 5.86,
      tratamiento: TRATAMIENTOS_IMVIXA
    },
    {
      nombre: 'Pisc. 2',
      valor: 5.66,
      tratamiento: TRATAMIENTOS_IMVIXA
    },
    {
      nombre: 'Pisc. 3',
      valor: 7.27,
      tratamiento: TRATAMIENTOS_IMVIXA
    },
    {
      nombre: 'Pisc. 4',
      valor: 8.39,
      tratamiento: TRATAMIENTOS_IMVIXA
    },
    {
      nombre: 'Pisc. 5',
      valor: 7.63,
      tratamiento: TRATAMIENTOS_IMVIXA
    },
    {
      nombre: 'Pisc. 6',
      valor: 3.72,
      tratamiento: TRATAMIENTOS_HEXAFLUMURON
    },
    {
      nombre: 'Pisc. 7',
      valor: 4.34,
      tratamiento: TRATAMIENTOS_HEXAFLUMURON
    },
    {
      nombre: 'Pisc. 8',
      valor: 4.11,
      tratamiento: TRATAMIENTOS_HEXAFLUMURON
    },
    {
      nombre: 'Pisc. 9',
      valor: 4.14,
      tratamiento: TRATAMIENTOS_HEXAFLUMURON
    },
    {
      nombre: 'Pisc. 10',
      valor: 4.84
    },
    {
      nombre: 'Pisc. 11',
      valor: 1.78
    },
    {
      nombre: 'Pisc. 12',
      valor: .99
    }
  ]

  const yMaximo = Math.ceil(Math.max(...datos.map(d => d.valor)) + 2)
  const datosImvixa = datos.filter(d => d.tratamiento === TRATAMIENTOS_IMVIXA)
  const datosHexa = datos.filter(d => d.tratamiento === TRATAMIENTOS_HEXAFLUMURON)
  const datosNada = datos.filter(d => [TRATAMIENTOS_HEXAFLUMURON, TRATAMIENTOS_IMVIXA].indexOf(d.tratamiento) < 0)

  return (
    <div className="Tratamientos">
      <div className="Tratamientos__titulo">
        Meses hasta primer Baño
      </div>
      <div className="Tratamientos__contenedor_grafico">
        <div className="Tratamientos__promedios">
          <p>Promedio Industria: {promedioIndustria}</p>
          <p>Promedio Empresa: {promedioEmpresa}</p>
        </div>
        <div className="Tratamientos__lineas_grafico">
          {Array(yMaximo + 1).fill(0).map((_, i) => (
            <div valor={yMaximo - i} key={`linea-grafico-tratamientos-${i}`} className="Tratamientos__linea_grafico" />
          ))}
        </div>
        <div className="Tratamientos__barras_grafico">
          {datosImvixa.map((d, i) => (
            <div
              key={`barra-tratamientos-${i}`}
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--imvixa"
            >
              <div className="Tratamientos__valor_barra">{d.valor}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          ))}
          <div className="Tratamientos__separador_grupo_barras" />
          {datosHexa.map((d, i) => (
            <div
              key={`separador-tratamientos-${i}`}
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--hexa"
            >
              <div className="Tratamientos__valor_barra">{d.valor}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          ))}
          <div className="Tratamientos__separador_grupo_barras" />
          {datosNada.map(d => (
            <div
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--nada"
            >
              <div className="Tratamientos__valor_barra">{d.valor}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tratamientos