import { Box, HStack } from "@chakra-ui/react";
import { ExpenseChart } from "./charts/expenseChart";
import { RevenueChart } from "./charts/revenueChart";

const Home = () => {
  return (
    <>
      <HStack>
        {" "}
        <ExpenseChart />
        <RevenueChart />
      </HStack>
    </>
  );
};

export default Home;
