import React from "react";
import { Box, Heading, Spacer, Flex } from "@chakra-ui/react";

import { Address, ContactInfo } from "../JobComponent";

const Header = ({ job }) => {
  return (
    <Flex bg="teal.600" borderLeftRadius="2xl" h="200px" p={2}>
      <Box marginLeft={6} alignSelf="flex-end">
        <ContactInfo jobContact={job.contact} jobId={job.id} />
      </Box>
      <Spacer />
      <Box alignSelf="flex-start">
        <Heading m={2} p={3} rounded="sm" bgColor="teal.400" size="2xl">
          {job.jobName}
        </Heading>
      </Box>
      <Spacer />
      <Box alignSelf="flex-end">
        <Address address={job.contact.address} width={"fit-content"} />
      </Box>
    </Flex>
  );
};

export default Header;
