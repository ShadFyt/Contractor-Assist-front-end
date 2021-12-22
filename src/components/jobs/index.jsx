import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Job from "./JobComponent";
import JobFormModal from "./addJobForm";

import { selectAllJobs, fetchJobs } from "../../features/job/jobSlice";

function ListJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectAllJobs);

  const jobStatus = useSelector((state) => state.job.status);
  const error = useSelector((state) => state.job.error);

  useEffect(() => {
    if (jobStatus === "idle") {
      console.log(jobStatus);
      dispatch(fetchJobs());
    }
  }, [jobStatus, dispatch]);

  let content;

  if (jobStatus === "loading") {
    content = <p>Loading....</p>;
  } else if (jobStatus === "succeeded") {
    console.log("from console", jobs[0].jobName);
    content = jobs.map((job) => (
      <Box h="full" w="full" key={job.id}>
        <Job job={job} />
      </Box>
    ));
  } else if (jobStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <>
      <JobFormModal />
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} m={3}>
        {content}
      </SimpleGrid>
    </>
  );
}

export default ListJobs;
