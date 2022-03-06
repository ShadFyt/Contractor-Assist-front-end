import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { EmployeesHoursChart } from "./charts/employeesHoursChart";
import { WeeklyTimeSheetTable } from "./weeklyTimeSheetTable";

export const TimeSheetTab = ({ dateRange, timeEntries }) => {
  return (
    <Tabs isFitted variant={"solid-rounded"} m={4}>
      <TabList>
        <Tab>Chart</Tab>
        <Tab>Table</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <EmployeesHoursChart
            dateRange={dateRange}
            timeEntries={timeEntries}
          />
        </TabPanel>
        <TabPanel>
          <WeeklyTimeSheetTable timeEntries={timeEntries} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
