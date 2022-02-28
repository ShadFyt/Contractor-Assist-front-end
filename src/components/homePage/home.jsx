import React from "react";
import { HStack, Box } from "@chakra-ui/react";
import { ExpenseChart } from "./charts/expenseChart";
import { ProfitChart } from "./charts/profitChart";
import { RevenueChart } from "./charts/revenueChart";
import { TimeSheetTab } from "./weeklyTimeSheet";

const Home = () => {
  return (
    <>
      <HStack>
        {" "}
        <ExpenseChart />
        <RevenueChart />
        <ProfitChart />
      </HStack>
      <Box border={"1px"} m={2} borderRadius="2xl">
        <TimeSheetTab />
      </Box>
    </>
  );
};

export default Home;
