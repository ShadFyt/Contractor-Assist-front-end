import React from "react";
import { useSelector } from "react-redux";
import Header from "./header";

import { Box, SimpleGrid } from "@chakra-ui/react";

import TaskComponent from "./taskComponent";
import TrackingTabs from "./trackingTabs";

import { useGetJobByIdQuery } from "../../../features/api/apiSlice";

export const SingleJobPage = ({ match }) => {
  const { jobId } = match.params;

  const { data: job, isFetching, isSuccess } = useGetJobByIdQuery(jobId);

  if (!job) {
    return (
      <section>
        <h2>Job not found</h2>
      </section>
    );
  }

  return (
    <section>
      <Header job={job} />
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={4}>
        <Box marginY={2} padding={2} border="1px" rounded="lg" h="fit-content">
          <TrackingTabs job={job} />
        </Box>
        <Box marginY={2} marginRight={2} h="fit-content">
          <TaskComponent jobId={jobId} jobTasks={job.tasks} />
        </Box>
      </SimpleGrid>
    </section>
  );
};
