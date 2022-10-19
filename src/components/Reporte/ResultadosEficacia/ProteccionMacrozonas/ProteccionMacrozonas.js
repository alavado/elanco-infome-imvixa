import { useSelector } from 'react-redux';
import mapa from '../../../../assets/images/mapa.svg'
import './ProteccionMacrozonas.css'
import { generalTexts } from '../../generalTexts'



const ProteccionMacrozonas = ({language}) => {
  const {macrozona, titulo, leyenda1, leyenda2} = generalTexts.ProteccionMacrozonas[language]

  const {
    datosMacrozona,
    nombreEmpresa
  } = useSelector((state) => state.reporte)

  // const indicadorGeneral = `Promedio últimos 18 meses`
  const pinesPintados = datosMacrozona.map((p, i )=> ({
    ...p,
    etiqueta: macrozona + ` ${i+1}`,
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