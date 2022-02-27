import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

import { chartOptions } from "./baseChartOption";

export const ProfitChart = () => {
  let chartData = [
    {
      name: "Amount",
      data: [2000, 2000, 5000, 1000, 2000, 4000],
    },
  ];
  return (
    <Box
      height={"230px"}
      width={"100%"}
      py={2}
      bg="green.100"
      borderRadius={"md"}
      marginLeft={2}
    >
      <Chart
        options={{
          ...chartOptions,
          subtitle: {
            text: "Profits",
            align: "left",
            offsetX: 50,
            style: {
              fontSize: "16px",
            },
          },
          title: {
            text: "$30,000",
            align: "left",
            offsetX: 50,
            style: {
              fontSize: "30px",
              color: "green",
            },
          },
        }}
        series={chartData}
        type="area"
        width="100%"
        height="100%"
      />
    </Box>
  );
};
