import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import RenderClockInTable from "./renderClockInTable";

const TrackingTabs = ({ job }) => {
  return (
    <>
      <Tabs isFitted variant="soft-rounded">
        <TabList>
          <Tab>Time Sheet</Tab>
          <Tab>Expenses</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {" "}
            <RenderClockInTable job={job} />
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TrackingTabs;