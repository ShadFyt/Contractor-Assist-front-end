import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Job from "./JobComponent";
import jobs from "./job_board.json";

console.log(jobs[1].jobName);
// Fake job

function ListJobs(props) {
  return (
    <>
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
