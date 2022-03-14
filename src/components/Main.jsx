import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Stack } from "@chakra-ui/react";
import Sidebar from "./layout/Sidebar";
import ListJobs from "./jobs";
import { SingleJobPage } from "./jobs/singleJob/singleJobPage";
import ListEmployees from "./employees/index";
import ListClients from "./clients/listClients";
import Home from "./homePage/home";
import Login from "./login";
function MainComponent() {
  const token = localStorage.getItem("token");

  return (
    <Box>
      <Stack direction={{ base: "column", md: "row" }} spacing={0}>
        {token ? (
          <Box
            minH={{ sm: "100px", md: "100vh" }}
            height={"100px"}
            w={{ base: "100%", md: "255px" }}
          >
            <Sidebar />
          </Box>
        ) : null}
        <Box flex="1">
          <Switch>
            <Route exact path="/">
              {token ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/jobs">
              {token ? <ListJobs /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/employees">
              {token ? <ListEmployees /> : <Redirect to="/login" />}{" "}
            </Route>
            <Route exact path="/clients">
              {token ? <ListClients /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/jobs/:jobId">
              {token ? <SingleJobPage /> : <Redirect to="/login" />}
            </Route>
            <Redirect to={token ? "/" : "/login"} />
          </Switch>
        </Box>
      </Stack>
    </Box>
  );
}

export default MainComponent;
