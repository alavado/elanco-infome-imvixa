import './Sandalias.css'
import imagenHealthy from '../../../assets/images/forever-healthy.jpg'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { generalTexts } from '../generalTexts'

const Sandalias = ({ pagina, language }) => {

  const { comentarios } = useSelector(state => state.comentarios)
  const { graficos } = useSelector(state => state.graficos)
  const mostrarGraficoTratamientos = graficos.find(g => g.id === 'GRAFICO_EFICACIA').visible
  const mostrarMapaMacrozonas = graficos.find(g => g.id === 'GRAFICO_MACROZONAS').visible
  const nPalabras = comentarios.reduce((acc, curr) => acc + curr.length, 0)
  const hayComentarios = comentarios.length > 0 && (nPalabras > 500 || comentarios.length > 2)
  const hayGraficos = mostrarGraficoTratamientos || mostrarMapaMacrozonas
  const texto = generalTexts.gt_Sandalias[language]

  return (
    <div className="Sandalias">
      {pagina === 2 && (!hayComentarios || !hayGraficos) && <img src={imagenHealthy} className="Sandalias__imagen" alt="imagen pie de pagina"/>}
      <p
        className={classNames({
          "Sandalias__texto": true,
          "Sandalias__texto--blanco": !hayComentarios && pagina === 2
        })}
      >
        {texto}
      </p>
      <p className="Sandalias__numero_pagina">{pagina}</p>
    </div>
  )
}

export default Sandalias