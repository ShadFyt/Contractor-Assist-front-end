import { Button } from "@chakra-ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { jobDeleted } from "../../features/job/jobSlice";

export const DeleteJob = ({ jobId, ...rest }) => {
  const job = useSelector((state) =>
    state.job.listOfJobs.find((job) => job.id === jobId)
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(jobDeleted({ id: jobId }));
  };
  return (
    <Button
      colorScheme="red"
      variant="outline"
      _hover={{ bgColor: "red.600", color: "white" }}
      {...rest}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};
