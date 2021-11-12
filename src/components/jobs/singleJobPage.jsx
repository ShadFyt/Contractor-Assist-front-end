import React from "react";
import { useSelector } from "react-redux";

export const SingleJobPage = ({ match }) => {
  const { jobId } = match.params;

  const job = useSelector((state) => {
    console.log(state.job.listOfJobs.find((job) => job.id === parseInt(jobId)));
    return state.job.listOfJobs.find((job) => job.id === parseInt(jobId));
  });

  if (!job) {
    return (
      <section>
        <h2>Job not found</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>{job.jobName}</h2>
    </section>
  );
};
