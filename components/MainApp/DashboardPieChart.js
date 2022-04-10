import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPieChart = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const data = useSelector((state) => state.charts.pieData);

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
        text: "Billed Accounts - Paid vs Unpaid",
        font: {
          size: 14,
        },
      },
    },
  };

  const statusLabels = data?.map((a) =>
    a.label === true ? "Paid" : "Not Paid"
  );

  const statusData = data?.map((a) => a.value);

  const pieData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Status",
        data: statusData,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie options={options} data={pieData} />{" "}
    </>
  );
};

export default DashboardPieChart;
