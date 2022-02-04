import React from "react";

import ClockInForm from "./clockInForm";
import { useDeleteTimeEntryMutation } from "../../../features/api/apiSlice";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  IconButton,
  useBoolean,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";

import { AiOutlineEdit } from "react-icons/ai";

const TimeEntryPopOver = ({ timeEntry, employeeName }) => {
  const [deleteTimeEntry] = useDeleteTimeEntryMutation();
  const [isDeleting, setIsDeleting] = useBoolean();
  const toast = useToast();
  const handleDelete = async (id) => {
    toast({
      title: `Time entry : ${timeEntry.id} - Deleted`,
      description: `${employeeName} - ${timeEntry.date}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    await deleteTimeEntry(id);
  };

  return (
    <Popover onClose={() => setTimeout(setIsDeleting.off, 500)}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton size={"lg"} bg={"white"} icon={<AiOutlineEdit />} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              {isDeleting ? (
                <Text fontWeight={"bold"} color={"red"}>
                  Confirm Delete
                </Text>
              ) : (
                "Edit or Delete"
              )}
            </PopoverHeader>
            <PopoverBody>
              {isDeleting ? (
                <Box>
                  <Button
                    color={"white"}
                    bgColor={"red.600"}
                    _hover={{ bgColor: "red.400" }}
                    onClick={() => handleDelete(timeEntry.id)}
                  >
                    Delete
                  </Button>
                  <Button bgColor={"gray.400"} ml={2} onClick={onClose}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <>
                  <ClockInForm
                    timeEntry={timeEntry}
                    employeeName={employeeName}
                    bgColor={"gray.300"}
                    mr={2}
                  />
                  <Button
                    bgColor={"red.500"}
                    onClick={setIsDeleting.on}
                    _hover={{ bgColor: "red.400" }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default TimeEntryPopOver;
