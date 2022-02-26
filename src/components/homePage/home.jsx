import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const Home = () => {
  let chartData = [
    {
      name: "Amount",
      data: [4000, 1000, 700, 1000, 3000, 5000],
    },
  ];
  let chartOptions = {
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
      "Dec",
    ],
    grid: {
      show: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "$50,000",
      align: "left",
      offsetX: 50,
      style: {
        fontSize: "30px",
      },
    },
    subtitle: {
      text: "Expenses",
      align: "left",
      offsetX: 50,
      style: {
        fontSize: "16px",
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  const ExpenseChart = () => {
    return (
      <Box
        height={"230px"}
        width={"500px"}
        py={2}
        bg="gray.100"
        borderRadius={"md"}
        marginLeft={2}
      >
        <Chart
          options={chartOptions}
          series={chartData}
          type="area"
          width="100%"
          height="100%"
        />
      </Box>
    );
  };

  return (
    <>
      <ExpenseChart />
    </>
  );
};

export default Home;
