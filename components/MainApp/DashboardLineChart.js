import React from "react";
import { useColorMode } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardLineChart = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { dashboardCharts } = useSelector((state) => state.charts);

  const { title, data } = dashboardCharts;

  const labels = data?.map((d) =>
    new Date(d.x.isoyear, 0, 1 + (d.x.week - 1) * 7).toDateString().substring(4)
  );

  const profitData = data?.map((a) => a.y);

  const options = {
    responsive: true,
    color: colorMode === "dark" && "#fff",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        color: colorMode === "dark" && "#fff",
        text: title,
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: colorMode === "dark" && "#fff",
        },
      },
      x: {
        ticks: {
          color: colorMode === "dark" && "#fff",
        },
      },
    },
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Profit",
        data: profitData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <Line options={options} data={lineData} />{" "}
    </>
  );
};

export default DashboardLineChart;
