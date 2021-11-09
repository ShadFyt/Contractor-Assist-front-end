import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { jobDeleted } from "../../features/job/jobSlice";

export const DeleteJob = ({ jobId, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const job = useSelector((state) =>
    state.job.listOfJobs.find((job) => job.id === jobId)
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(jobDeleted({ id: jobId }));
  };
  return (
    <>
      <Button
        colorScheme="red"
        variant="outline"
        _hover={{ bgColor: "red.600", color: "white" }}
        {...rest}
        onClick={() => setIsOpen(true)}
      >
        Delete
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Job</AlertDialogHeader>
            <AlertDialogBody>
              Confirm you wish to delete this job from the records
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button mr={3} ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
