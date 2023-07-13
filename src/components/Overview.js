"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import randomColor from "randomcolor";
ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (count) => {
  const uniqueColors = new Set();
  const colors = [];

  while (colors.length < count) {
    const color = randomColor({
      luminosity: "bright",
      format: "rgb",
    });

    if (!uniqueColors.has(color)) {
      uniqueColors.add(color);
      colors.push(color);
    }
  }

  return colors;
};


const Overview = ({ emissions }) => {
  const labels = Object.keys(emissions);
  const dataset = Object.values(emissions);
  const colors = generateColors(labels.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pounds of CO2 Emission",
        data: dataset,
        backgroundColor: colors,
        borderColor: "rgba(255, 255, 255)",
        borderWidth: 3,
      },
    ],
  };
  return (
    <div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
        >
          <path
            d="M5.36033 8.15198C3.66699 10.392 2.66699 13.1786 2.66699 16.192C2.66699 23.552 8.64033 29.5253 16.0003 29.5253C23.3603 29.5253 29.3337 23.552 29.3337 16.192C29.3337 8.83198 23.3603 2.85864 16.0003 2.85864"
            stroke="darkgreen"
            stroke-width="3.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.66699 16.1922C6.66699 21.3522 10.8403 25.5256 16.0003 25.5256C21.1603 25.5256 25.3337 21.3522 25.3337 16.1922C25.3337 11.0322 21.1603 6.85889 16.0003 6.85889"
            stroke="darkgreen"
            stroke-width="3.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.0005 21.5256C18.9472 21.5256 21.3338 19.1389 21.3338 16.1922C21.3338 13.2456 18.9472 10.8589 16.0005 10.8589"
            stroke="darkgreen"
            stroke-width="3.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="ml-2 text-green-900 font-semibold text-2xl leading-tight my-3">
          Overview
        </span>
      </div>
      <div style={{ width: "110%", height: "auto" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Overview;
