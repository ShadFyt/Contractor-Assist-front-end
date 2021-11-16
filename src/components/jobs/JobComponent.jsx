import React from "react";
import { Link as ReactLink } from "react-router-dom";

import {
  Box,
  Stack,
  HStack,
  VStack,
  SimpleGrid,
  Heading,
  Text,
  Divider,
  useClipboard,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { EditClientForm } from "./editClientForm";
import { DeleteJob } from "./deleteJob";

const Address = ({ address }) => {
  const { hasCopied, onCopy } = useClipboard(address);
  return (
    <HStack>
      <Text>{address}</Text>
      <Button
        onClick={onCopy}
        ml={2}
        variant="solid"
        _hover={{ boxShadow: "lg" }}
        colorScheme="gray"
        color="gray.900"
        size="xs"
      >
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </HStack>
  );
};

const ContactInfo = ({ jobContact, jobId }) => {
  return (
    <Box>
      <Heading as="h3" size="lg">
        {jobContact.owner}
      </Heading>
      <Text>
        <Text as="span" fontWeight="bold">
          ADDRESS
        </Text>
        : {jobContact.address}
      </Text>
      <Text>
        <Text as="span" fontWeight="bold">
          TELEPHONE
        </Text>
        : {jobContact.number}
      </Text>
      <Text>
        <Text as="span" fontWeight="bold">
          EMAIL
        </Text>
        : {jobContact.email}
      </Text>
      <EditClientForm jobId={jobId} width="50%" />
    </Box>
  );
};

const InfoTabs = ({ job }) => {
  return (
    <Box w="full">
      <Tabs
        isFitted
        variant="soft-rounded"
        colorScheme="green"
        color="white"
        align="center"
        mt={4}
      >
        <TabList>
          <Tab color="green.100">CONTACT</Tab>
          <Tab color="green.100">DETAILS</Tab>
          <Tab color="green.100">TASKS</Tab>
        </TabList>
        <TabPanels p={2} alignItems="center">
          <TabPanel>
            <ContactInfo jobContact={job.contact} jobId={job.id} />
          </TabPanel>
          <TabPanel>
            <DetailTab jobDetail={job.detail} />
          </TabPanel>
          <TabPanel>some content3</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const DetailTab = ({ jobDetail }) => {
  return (
    <SimpleGrid columns={2} spacing={4}>
      <VStack>
        <Heading as="h4" size="md">
          Summary
        </Heading>
        <Text>{jobDetail.summary}</Text>
      </VStack>
      <Box></Box>
    </SimpleGrid>
  );
};
function Job({ job }) {
  return (
    <Box bg={"teal.600"} rounded="2xl" boxShadow="base">
      <Stack p={2}>
        <HStack justify="space-between">
          <Box>
            <Heading size={"lg"} marginLeft={6} color="white">
              <Link as={ReactLink} to={`/jobs/${job.id}`}>
                <Tooltip
                  label="Click to see full job page"
                  aria-label="A tooltip"
                  fontSize="md"
                >
                  <span tabIndex="0">{job.jobName}</span>
                </Tooltip>
              </Link>
            </Heading>
            <Text align="end" fontSize="2xl" fontWeight="hairline">
              {job.contact.owner}
            </Text>
            <Badge variant="subtle" colorScheme="green" mt={8} ml={2}>
              New
            </Badge>
          </Box>
          <VStack p={2} boxShadow="base" _hover={{ boxShadow: "dark-lg" }}>
            <Link isExternal>
              <iframe
                title={job.contact.address}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11535.988402242036!2d-79.27491817896484!3d43.7106093246573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4ce7b488e5fcd%3A0xad322c8c32ab7f01!2sWarden!5e0!3m2!1sen!2sca!4v1634930038310!5m2!1sen!2sca"
                width="250"
                height="100px"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Link>
            <Address address={job.contact.address} />
          </VStack>
        </HStack>
        <Divider orientation="horizontal" />

        <HStack>
          <InfoTabs job={job} />
        </HStack>
        <DeleteJob jobId={job.id} />
      </Stack>
    </Box>
  );
}

export default Job;
