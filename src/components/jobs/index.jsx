import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Job from "./JobComponent";
import JobFormModal from "./addJobForm";
import JobPageHeader from "./jobPageHeader";

import { useGetJobsQuery } from "../../features/api/apiSlice";

function ListJobs() {
  const {
    data: jobs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetJobsQuery();

  let content;

  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    content = jobs.map((job) => (
      <Box h="full" w="full" key={job.id}>
        <Job job={job} />
      </Box>
    ));
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <>
      <JobPageHeader />
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} m={3}>
        {content}
      </SimpleGrid>
    </>
  );
}

export default ListJobs;
