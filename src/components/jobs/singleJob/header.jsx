import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Center,
  VStack,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";

import { Address, ContactInfo } from "../JobComponent";

const Header = ({ job }) => {
  return (
    <Box bg="teal.600" borderLeftRadius="2xl">
      <HStack>
        <Box marginLeft={6}>
          <ContactInfo jobContact={job.contact} jobId={job.id} />
        </Box>
        <Spacer />

        <VStack>
          <Heading m={2}>{job.jobName}</Heading>
          <Address address={job.contact.address} width={"fit-content"} />
        </VStack>
      </HStack>
    </Box>
  );
};

export default Header;
