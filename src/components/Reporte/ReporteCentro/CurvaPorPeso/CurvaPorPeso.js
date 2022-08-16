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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import "./CurvaPorPeso.css";
import {
  colEstanquePeces,
  colFechaTrat,
  colInformePeces,
  colInformePecesR,
  colInformePecesRTrat,
  colInformePecesTrat,
  colPeso2,
  colPPB,
  colSampleOriginTrat,
  colUTAs,
  tipoFreshWater,
} from "../../../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend
);

const CurvaPorPeso = () => {
  const { datosPorInforme } = useSelector((state) => state.reporteCentro);
  const colorsScatter = ["#fab536", "#eb483c", "#2f436a", "#0072ce", "#218fbb"];
  let allInfo = true;
  console.log({
    datosPorInforme,
  });
  const setXValues = new Set();

  const datasetPorInforme = datosPorInforme.map((informe, i) => {
    if (informe[colUTAs] && !isNaN(informe[colUTAs])) {
      const todosLosInformes = informe["datosTratFWSW"];
      const todasLasMuestras = informe["datosFWSW"];
      const yValues = [];
      const xValues = [];
      todosLosInformes.forEach((fila) => {
          const filasInforme = todasLasMuestras.filter(
            (v) =>
              v[colInformePeces] === fila[colInformePecesTrat] ||
              v[colInformePecesR] === fila[colInformePecesRTrat]
          );
          if ((fila[colSampleOriginTrat] === tipoFreshWater) || (filasInforme[0][colEstanquePeces] === informe[colEstanquePeces])) {
            yValues.push(...filasInforme.map((v) => v[colPPB]));
            xValues.push(...filasInforme.map((v) => v[colPeso2]));
          } 
      });
      setXValues.add(Math.max(...xValues));
      return {
        label: `Jaula ${informe[colEstanquePeces]} (${informe["pisciculturasOrigen"]})`,
        fill: false,
        borderColor: colorsScatter[i],
        backgroundColor: "transparent",
        pointRadius: 4,
        pointBorderWidth: 2,
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
        <p className="CurvaPorUTAs__titulo">Curva de depleción según peso</p>
        <div className="CurvaPorUTAs__contenedor_grafico">
          <div className="CurvaPorUTAs__contenedor_grafico__error">
            Sin datos disponibles en el periodo seleccionado
          </div>
        </div>
      </div>
    );
  }

  const minXAprox = 0;
  const maxXAprox = Math.max(...setXValues) * 1.05;
  const xMiddleValues = [...Array(40).keys()].map(v => minXAprox + (25 * v))
  const xGeneralValues = [minXAprox,...xMiddleValues, maxXAprox];
  const coef = -0.001;
  // Inf
  const aInf = 4 * Math.pow(10,6)
  const coefInf = -1.47786927
  const twoPointsInf = xGeneralValues.map((x) => aInf * Math.pow(x, coefInf));
  // Est
  const aEst = 1 * Math.pow(10,7)
  const coefEst = -1.4790
  const twoPointsEst = xGeneralValues.map((x) => aEst * Math.pow(x, coefEst));
  // Sup
  const aSup = 30656311.0721;
  const coefSup = -1.4757
  const twoPointsSup = xGeneralValues.map((x) => aSup * Math.pow(x, coefSup));

  const data = {
    labels: [...Array(40).keys()].map(x => x * 100),
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
          text: "Peso (gr.)",
          font: {
            size: 16,
          },
        },
        suggestedMin: 0,
        suggestedMax: maxXAprox,
      },
      y: {
        display: true,
        type: "logarithmic",
        title: {
          display: true,
          text: "Concentración de Imvixa en músculo + piel (ppb)",
          font: {
            size: 16,
          },
        },
        suggestedMin: 0,
        suggestedMax: 100000,
      },
    },
  };
  return (
    <div className="CurvaPorPeso" style={{ marginTop: 12, position: "relative", width: "40vw", height: "33vw" }}>
      <p className="CurvaPorPeso__titulo">Curva de depleción según peso</p>
      <div className="CurvaPorPeso__contenedor_grafico">
        <Chart type="scatter" data={data} options={options}/>
      </div>
    </div>
  );
};

export default CurvaPorPeso;