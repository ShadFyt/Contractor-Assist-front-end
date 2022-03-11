import React, { useState } from "react";
import {
  HStack,
  Box,
  Center,
  FormControl,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { ExpenseChart } from "./charts/expenseChart";
import { ProfitChart } from "./charts/profitChart";
import { RevenueChart } from "./charts/revenueChart";
import { TimeSheetTab } from "./weeklyTimeSheetTab";
import { useGetTimeEntriesByWeekQuery } from "../../features/api/apiSlice";

const Home = () => {
  const getDate = () => {
    let date = new Date();
    let day = "" + date.getDate();
    if (day < 10) {
      day = 0 + day;
    }
    let month = "" + (date.getMonth() + 1);
    if (month < 10) {
      month = "0" + month;
    }
    let year = date.getFullYear();
    console.log("month: ", month);
    return `${year}-${month}-${day}`;
  };

  const [dateRange, setDateRange] = useState(() => getDate());

  const { data: timeEntries = [] } = useGetTimeEntriesByWeekQuery(dateRange);

  const handleDateChange = (e) => setDateRange(e.target.value);

  console.log(timeEntries);
  return (
    <>
      <SimpleGrid columns={{ sm: 1, lg: 3 }}>
        {" "}
        <ExpenseChart />
        <RevenueChart />
        <ProfitChart />
      </SimpleGrid>
      <Box border={"1px"} m={2} borderRadius="2xl">
        <TimeSheetTab timeEntries={timeEntries} dateRange={dateRange} />
        <Center>
          <Box w={"15rem"} boxShadow="base">
            <FormControl>
              <Input
                id="dateRange"
                name="dateRange"
                value={dateRange}
                onChange={handleDateChange}
                type="date"
                textAlign={"center"}
              />
            </FormControl>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Home;
