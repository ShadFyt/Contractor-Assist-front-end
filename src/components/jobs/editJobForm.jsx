import { Button } from "@chakra-ui/button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { jobUpdated } from "../../features/job/jobSlice";

export const EditJobForm = ({ jobId, ...rest }) => {
  const job = useSelector((state) =>
    state.job.listOfJobs.find((job) => job.id === jobId)
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditSubmit = () => {
    console.log(job);
  };

  return (
    <Button {...rest} onClick={handleEditSubmit}>
      Edit
    </Button>
  );
};
