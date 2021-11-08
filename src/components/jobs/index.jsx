import React from "react";
import { useSelector } from "react-redux";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Job from "./JobComponent";
import JobFormModal from "./addJobForm";

function ListJobs() {
  const jobs = useSelector((state) => state.job.listOfJobs);
  return (
    <>
      <JobFormModal />
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} m={3}>
        {jobs.map((job) => (
          <Box h="full" w="full" key={job.id}>
            <Job job={job} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

export default ListJobs;
