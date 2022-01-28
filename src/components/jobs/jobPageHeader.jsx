import React, { useState } from "react";

import JobFormModal from "./addJobForm";

import {
  Box,
  Flex,
  Center,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  useBoolean,
  HStack,
} from "@chakra-ui/react";

const JobPageHeader = () => {
  const [isEditing, setIsEditing] = useBoolean();
  return (
    <Flex bg="gray.200" borderLeftRadius="2xl" h="100px" p={2} marginLeft={2}>
      <Popover
        isOpen={isEditing}
        onOpen={setIsEditing.on}
        onClose={setIsEditing.off}
        closeOnBlur={false}
        isLazy
        lazyBehavior="keepMounted"
      >
        <HStack>
          <PopoverTrigger>
            <Button h="40px" colorScheme="pink">
              {isEditing ? "Save" : "Edit"}
            </Button>
          </PopoverTrigger>
        </HStack>
      </Popover>
      <Center mx={"auto"}>
        <Heading>List of jobs</Heading>
      </Center>
      <Box alignSelf="flex-end">
        <JobFormModal />
      </Box>
    </Flex>
  );
};

export default JobPageHeader;
