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

import { useDeleteJobMutation } from "../../features/api/apiSlice";

export const DeleteJob = ({ jobId, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const [deleteJob] = useDeleteJobMutation();

  const handleDelete = async () => {
    await deleteJob({ id: jobId });
  };
  return (
    <>
      <Button
        colorScheme="red"
        variant="outline"
        _hover={{ bgColor: "red.600", color: "white" }}
        onClick={() => setIsOpen(true)}
        {...rest}
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
