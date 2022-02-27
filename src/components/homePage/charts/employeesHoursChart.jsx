import { Box, Heading, VStack } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { hoursChartOptions } from "./baseChartOption";

export const EmployeesHoursChart = () => {
  let chartData = [
    {
      name: "Hours Worked",
      data: [21, 22, 10, 28, 16, 44, 13, 30],
    },
  ];
  return (
    <Box marginTop={3}>
      <VStack>
        <Heading>Week of: 2022-10-7</Heading>
        <Box
          height={"230px"}
          width={"95%"}
          py={2}
          bg="gray.100"
          borderRadius={"md"}
          marginLeft={2}
        >
          <Chart
            options={hoursChartOptions}
            series={chartData}
            type="bar"
            width="100%"
            height="100%"
          />
        </Box>
      </VStack>
    </Box>
  );
};
