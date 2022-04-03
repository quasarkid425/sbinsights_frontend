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

const ExpenseStats = () => {
  const { expenseStats } = useSelector((state) => state.expenses);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Amount Spent By Expense",
      },
    },
  };

  const labels = expenseStats.map((data) => (data.x ? data.x : ""));
  const dataset = expenseStats.map((data) => (data.y ? data.y : ""));

  const expData = {
    labels,
    datasets: [
      {
        label: "Amount total",
        data: dataset,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={expData} />;
};

export default ExpenseStats;
