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

const CurvaPorUTAs = () => {
  const { datosPorInforme, parametrosGraficoUTAs } = useSelector((state) => state.reporteCentro);
  const colorsScatter = ["#fab536", "#eb483c", "#2f436a", "#0072ce", "#218fbb"];
  let allInfo = true;
  let maxUTAS = 0;
  console.log({
    datosPorInforme,
  });
  const setXValues = new Set();

  // window.addEventListener('beforeprint', () => {
  //   myChart.resize(600, 600);
  // });
  // window.addEventListener('afterprint', () => {
  //   myChart.resize();
  // });

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

      return {
        label: `Jaula ${informe[colEstanquePeces]} (${informe["pisciculturasOrigen"]})`,
        fill: false,
        borderColor: colorsScatter[i],
        backgroundColor: "transparent",
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
        <p className="CurvaPorUTAs__titulo">Curva de depleción según UTAS</p>
        <div className="CurvaPorUTAs__contenedor_grafico">
          <div className="CurvaPorUTAs__contenedor_grafico__error">
            Sin datos disponibles en el periodo seleccionado
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

  const data = {
    // labels: [minXAprox, maxXAprox],
    datasets: [
      {
        label: "Inf",
        showLine: true,
        fill: false,
        // tension: 0.1,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        borderDash: [10, 5],
        // borderCapStyle: "butt",
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        // pointBorderColor: "#5F7D8B",
        // pointBackgroundColor: "#5F7D8B",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: "#5F7D8B",
        // pointHoverBorderColor: "#5F7D8B",
        // pointHoverBorderWidth: 2,
        pointRadius: 0,
        // pointHitRadius: 0,
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
        // tension: 0.4,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        // borderCapStyle: "butt",
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        // pointBorderColor: "#EF7B10",
        // pointBackgroundColor: "#EF7B10",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: "#EF7B10",
        // pointHoverBorderColor: "#EF7B10",
        // pointHoverBorderWidth: 2,
        pointRadius: 0,
        // pointHitRadius: 1,
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
        // tension: 0.1,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        borderDash: [10, 5],
        // borderCapStyle: "butt",
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        // pointBorderColor: "#EF7B10",
        // pointBackgroundColor: "#EF7B10",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: "#EF7B10",
        // pointHoverBorderColor: "#EF7B10",
        // pointHoverBorderWidth: 2,
        pointRadius: 0,
        // pointHitRadius: 0,
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
    // legend: {
    //   display: false,
    //   // labels: {
    //   //   boxWidth: 14,
    //   //   filter: function(item, chart) {
    //   //     // Logic to remove a particular legend item goes here
    //   //     console.log(item.text)
    //   //     return !['Sup','Inf', 'Est'].includes(item.text);
    //   // }
    //   // },
    // },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Grados días",
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
    <div className="CurvaPorUTAs" style={{ marginTop: 12, position: "relative", width: "40vw", height: "33vw" }}>
      <p className="CurvaPorUTAs__titulo">Curva de depleción según UTAS</p>
      <div className="CurvaPorUTAs__contenedor_grafico">
        <Chart type="scatter" data={data} options={options}/>
      </div>
    </div>
  );
};

export default CurvaPorUTAs;
