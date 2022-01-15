import {
  Button,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux" 
import { useDeleteTaskMutation } from "../../../features/api/apiSlice"

const DeleteTask = ({ jobId, taskId, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);
  const [deleteTask] = useDeleteTaskMutation()

  const handleDelete = async () => {
    await deleteTask(taskId)
  };

  return (
    <>
      <IconButton
        aria-label="Delete task"
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
        {...rest}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Task</AlertDialogHeader>
            <AlertDialogBody>
              Confirm you wish to delete this task from the records
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

export default DeleteTask;
