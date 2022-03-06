import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { EmployeesHoursChart } from "./charts/employeesHoursChart";
import { WeeklyTimeSheetTable } from "./weeklyTimeSheetTable";

export const TimeSheetTab = () => {
  return (
    <Tabs isFitted variant={"solid-rounded"} m={4}>
      <TabList>
        <Tab>Chart</Tab>
        <Tab>Table</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <EmployeesHoursChart />
        </TabPanel>
        <TabPanel>
          <WeeklyTimeSheetTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
