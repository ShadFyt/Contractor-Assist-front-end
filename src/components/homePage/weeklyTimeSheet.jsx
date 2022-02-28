import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { EmployeesHoursChart } from "./charts/employeesHoursChart";

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
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
