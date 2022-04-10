import { useColorMode } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AccountStats = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { accountStats } = useSelector((state) => state.accounts);

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
        text: "Total Billed to Account By Day",
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

  const labels = accountStats.map((data) =>
    data.x ? `${data.x.month + 1}-${data.x.date}-${data.x.year}` : ""
  );
  const dataset = accountStats.map((data) => (data.y ? data.y : ""));

  const accData = {
    labels,
    datasets: [
      {
        label: "Amount total",
        data: dataset,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={accData} />;
};

export default AccountStats;
