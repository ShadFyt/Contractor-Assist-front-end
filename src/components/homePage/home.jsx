import { HStack, Box, Center } from "@chakra-ui/react";
import { ExpenseChart } from "./charts/expenseChart";
import { ProfitChart } from "./charts/profitChart";
import { RevenueChart } from "./charts/revenueChart";
import { EmployeesHoursChart } from "./charts/employeesHoursChart";

const Home = () => {
  return (
    <>
      <HStack>
        {" "}
        <ExpenseChart />
        <RevenueChart />
        <ProfitChart />
      </HStack>
      <Box>
        <EmployeesHoursChart />
      </Box>
    </>
  );
};

export default Home;
