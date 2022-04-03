import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Sales = ({ count }) => {
  const citylabels = count.map((a) => a.label);
  const cityData = count.map((a) => a.value);

  const data = {
    labels: citylabels,
    datasets: [
      {
        label: "# of Cities",
        data: cityData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Heading textAlign={"center"} fontWeight={"semibold"} size={"lg"}>
        Count by City
      </Heading>
      <Box w={"40%"} m={"0 auto"} pt={"2rem"}>
        <Doughnut data={data} />;
      </Box>
    </>
  );
};

export default Sales;
