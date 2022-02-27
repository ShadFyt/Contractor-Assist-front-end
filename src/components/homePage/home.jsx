import { HStack } from "@chakra-ui/react";
import { ExpenseChart } from "./charts/expenseChart";
import { ProfitChart } from "./charts/profitChart";
import { RevenueChart } from "./charts/revenueChart";

const Home = () => {
  return (
    <>
      <HStack>
        {" "}
        <ExpenseChart />
        <RevenueChart />
        <ProfitChart />
      </HStack>
    </>
  );
};

export default Home;
