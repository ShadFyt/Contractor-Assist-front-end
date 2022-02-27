import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

import { chartOptions } from "./baseChartOption";

export const RevenueChart = () => {
  let chartData = [
    {
      name: "Amount",
      data: [4000, 2000, 7000, 1000, 3000, 6000],
    },
  ];
  return (
    <Box
      height={"230px"}
      width={"100%"}
      py={2}
      bg="green.400"
      borderRadius={"md"}
      marginLeft={2}
    >
      <Chart
        options={{
          ...chartOptions,
          subtitle: {
            text: "Revenue",
            align: "left",
            offsetX: 50,
            style: {
              fontSize: "16px",
            },
          },
          title: {
            text: "$80,000",
            align: "left",
            offsetX: 50,
            style: {
              fontSize: "30px",
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
