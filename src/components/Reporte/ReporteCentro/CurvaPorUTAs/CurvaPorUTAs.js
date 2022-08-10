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
import "./CurvaPorUTAs.css";

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
  const { datosPorInforme, fecha } = useSelector(
    (state) => state.reporteCentro
  );

  const minXAprox = 24;
  const maxXAprox = 4485;
  // Inf
  const mInf = -0.326644465;	
  const nInf = 1467.210147;
  const twoPointsInf = [minXAprox,  maxXAprox].map((x) => x * mInf + nInf);
  // Est
  const mEst = -1.718169964;	
  const nEst = 7718.079898;
  const twoPointsEst = [minXAprox, maxXAprox].map((x) => x * mEst + nEst);
  // Sup
  const mSup = -9.683122914;
  const nSup = 43494.92791;
  const twoPointsSup = [minXAprox, maxXAprox].map((x) => x * mSup + nSup);
  const data = {
    labels: [minXAprox, maxXAprox],
    datasets: [
      {
        label: 'Inf',
        fill: false,
        tension: 0.1,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        // borderCapStyle: "butt",
        // borderDash: [],
        borderDash: [10,5],
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
        data: twoPointsInf,
      },
      {
        label: 'Est',
        fill: false,
        tension: 0.4,
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
        data: twoPointsEst,
      },
      {
        label: 'Sup',
        fill: false,
        tension: 0.1,
        backgroundColor: "#5F7D8B",
        borderColor: "#5F7D8B",
        borderDash: [10,5],
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
        data: twoPointsSup,
      },
    ],
  };

  console.log({
    twoPointsInf,
    twoPointsSup,
    twoPointsEst,
    data
  })

  const options = {
    plugins: {
      legend: {
          display: false,
          labels: {
              color: 'rgb(255, 99, 132)'
          }
      }
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
          text: 'Grados días'
        },
        suggestedMin: 0,
        suggestedMax: 3000
      },
      y: {
        display: true,
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Concentración de activo en filete (ppb)'
        },
        suggestedMin: 0,
        suggestedMax: 100000
      }
    },
  };
  return (
    <div>
      CurvaPorUTAs
      <div style={{ marginTop: 12, width: 640, height: 360 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CurvaPorUTAs;
