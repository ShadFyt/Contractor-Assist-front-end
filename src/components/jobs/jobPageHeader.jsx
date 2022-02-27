import React from "react";

import JobFormModal from "./addJobForm";

import { Box, Flex, Center, Heading } from "@chakra-ui/react";

const JobPageHeader = () => {
  return (
    <Flex bg="gray.200" borderLeftRadius="2xl" h="100px" p={2} marginLeft={2}>
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
