import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
  LineController,
  ScatterController
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "./CurvaPorUTAs.css";
import {
  colEstanquePeces,
  colInformePeces,
  colInformePecesR,
  colInformePecesRTrat,
  colInformePecesTrat,
  colPPB,
  colSampleOriginTrat,
  colUTAs,
  tipoFreshWater,
} from "../../../../constants";
import { generalTexts } from '../generalTexts'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend,
  LineController,
  ScatterController
);

const CurvaPorUTAs = ({language}) => {
  const { datosPorInforme, parametrosGraficoUTAs, parametrosGraficoPeso } = useSelector((state) => state.reporteCentro);
  const colorsScatter = ["#fab536", "#eb483c", "#2f436a", "#0072ce", "#218fbb"];
  let allInfo = true;
  let maxUTAS = 0;

  const setXValues = new Set();
  const setYValues = new Set();
  const { gt_curvauta } = generalTexts
  const { titulo, sindatos, xaxis, yaxis, jaula } = gt_curvauta[language]
  const datasetPorInforme = datosPorInforme.map((informe, i) => {
    if (informe[colUTAs] && !isNaN(informe[colUTAs])) {
      const todosLosInformes = informe["datosTratFWSW"];
      const todasLasMuestras = informe["datosFWSW"];
      const yValues = [];
      const xValues = [];
      todosLosInformes.forEach((fila) => {
        if (fila[colUTAs] && !isNaN(fila[colUTAs])) {
          const filasInforme = todasLasMuestras.filter(
            (v) =>
              v[colInformePeces] === fila[colInformePecesTrat] ||
              v[colInformePecesR] === fila[colInformePecesRTrat]
          );
          if (
            fila[colSampleOriginTrat] === tipoFreshWater ||
            filasInforme[0][colEstanquePeces] === informe[colEstanquePeces]
          ) {
            setXValues.add(fila[colUTAs]);
            

            maxUTAS = Math.max(maxUTAS, fila[colUTAs]);
            yValues.push(...filasInforme.map((m) => m[colPPB]));
            xValues.push(...filasInforme.map((v) => fila[colUTAs]));
          }
        } else {
          allInfo = false;
        }
      });

      setYValues.add(Math.max(...yValues))

      return {
        label: `${jaula} ${informe[colEstanquePeces]} (${informe["pisciculturasOrigen"]})`,
        fill: false,
        borderColor: colorsScatter[i],
        backgroundColor: "transparent",
        pointBorderWidth: 2,
        pointRadius: 4,
        data: yValues.map((yv, j) => {
          return {
            x: xValues[j],
            y: yv,
          };
        }),
      };
    }
    allInfo = false;
    return {};
  });

  if (!allInfo) {
    return (
      <div className="CurvaPorUTAs">
        <p className="CurvaPorUTAs__titulo">{titulo}</p>
        <div className="CurvaPorUTAs__contenedor_grafico">
          <div className="CurvaPorUTAs__contenedor_grafico__error">
            {sindatos}
          </div>
        </div>
      </div>
    );
  }

  const minXAprox = 0;
  const maxXAprox = Math.max(...setXValues) * 1.1;
  const xGeneralValues = [minXAprox, maxXAprox];
  const {aInf, aEst, aSup, coef} = parametrosGraficoUTAs
  // Inf
  const twoPointsInf = xGeneralValues.map((x) => aInf * Math.exp(coef * x));
  // Est
  const twoPointsEst = xGeneralValues.map((x) => aEst * Math.exp(coef * x));
  // Sup
  const twoPointsSup = xGeneralValues.map((x) => aSup * Math.exp(coef * x));

  // Grafico Peso
  const {aSup: aSupPeso, coefSup} = parametrosGraficoPeso
  const SupPeso = aSupPeso * Math.pow(25, coefSup)
  const maxGrafico = Math.max(SupPeso,twoPointsSup[0], ...setYValues);

  const data = {
    // labels: [minXAprox, maxXAprox],
    datasets: [
      {
        label: "Inf",
        showLine: true,
        fill: false,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        borderDash: [10, 5],
        pointRadius: 0,
        data: twoPointsInf.map((v, i) => {
          return {
            x: xGeneralValues[i],
            y: v,
          };
        }),
      },
      {
        label: "Est",
        showLine: true,
        fill: false,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        pointRadius: 0,
        data: twoPointsEst.map((v, i) => {
          return {
            x: xGeneralValues[i],
            y: v,
          };
        }),
      },
      {
        label: "Sup",
        fill: false,
        showLine: true,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        borderDash: [10, 5],
        pointRadius: 0,
        data: twoPointsSup.map((v, i) => {
          return {
            x: xGeneralValues[i],
            y: v,
          };
        }),
      },
      ...datasetPorInforme,
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          filter: function (legendItem, data) {
            return !["Inf", "Est", "Sup"].includes(legendItem.text);
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: xaxis,
          font: {
            size: 16,
          },
        },
        suggestedMin: 0,
        suggestedMax: maxXAprox,
      },
      y: {
        min: 10,
        max: maxGrafico,
        type: "logarithmic",
        title: {
          display: true,
          text: yaxis,
          font: {
            size: 16,
          },
        },
      },
      // yAxes: [{
      //   ticks: {
      //     beginAtZero: true,
      //     min: 0
      //   },
      //   min: 0.1,
      //   max: maxGrafico,
      //   type: "logarithmic",
      //   title: {
      //     display: true,
      //     text: "Concentración de Imvixa en músculo + piel (ppb)",
      //     font: {
      //       size: 16,
      //     },
      //   },
      // },]
    },
  };
  return (
    <div className="CurvaPorUTAs" style={{ marginTop: 12, position: "relative", width: "40vw", height: "35vw" }}>
      <p className="CurvaPorUTAs__titulo">{titulo}</p>
      <div className="CurvaPorUTAs__contenedor_grafico">
        <Chart type="scatter" data={data} options={options}/>
      </div>
    </div>
  );
};

export default CurvaPorUTAs;
