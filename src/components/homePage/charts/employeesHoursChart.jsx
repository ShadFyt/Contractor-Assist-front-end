import { Box, Heading, VStack } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { hoursChartOptions } from "./baseChartOption";

export const EmployeesHoursChart = ({ timeEntries, dateRange }) => {
  let listEmployees = [];
  console.log("data loaded :", timeEntries);

  timeEntries.forEach((item) => {
    if (!listEmployees.includes(item.employeeName)) {
      listEmployees.push(item.employeeName);
    }
  });

  console.log(listEmployees);
  let extraOptions = {
    xaxis: {
      // TODO: make this data driven
      categories: listEmployees,
      labels: {
        style: {
          colors: ["black"],
          fontSize: "12px",
        },
      },
    },
  };
  let chartData = [
    {
      name: "Hours Worked",
      data: [21, 22, 10, 28],
    },
  ];
  return (
    <Box marginTop={3}>
      <VStack>
        <Heading>Week of: {dateRange}</Heading>
        <Box
          height={"230px"}
          width={"95%"}
          py={2}
          bg="gray.100"
          borderRadius={"md"}
          marginLeft={2}
        >
          <Chart
            options={{ ...hoursChartOptions, ...extraOptions }}
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
