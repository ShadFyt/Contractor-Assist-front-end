import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Stack } from "@chakra-ui/react";
import Sidebar from "./layout/Sidebar";
import ListJobs from "./jobs";
import { SingleJobPage } from "./jobs/singleJob/singleJobPage";
import ListEmployees from "./employees/index";
import ListClients from "./clients/listClients";
import Home from "./homePage/home";

function MainComponent() {
  return (
    <Box>
      <Stack direction={{ base: "column", md: "row" }} spacing={0}>
        <Box
          minH={{ sm: "100px", md: "100vh" }}
          height={"100px"}
          w={{ base: "100%", md: "255px" }}
        >
          <Sidebar />
        </Box>
        <Box flex="1">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/jobs" component={ListJobs} />
            <Route exact path="/employees" component={ListEmployees} />
            <Route exact path="/clients" component={ListClients} />
            <Route exact path="/jobs/:jobId" component={SingleJobPage} />
            <Redirect to="/" />
          </Switch>
        </Box>
      </Stack>
    </Box>
  );
}

export default MainComponent;
