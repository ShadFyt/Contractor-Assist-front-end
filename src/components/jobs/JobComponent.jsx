import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { useGetClientByIdQuery } from "../../features/api/apiSlice";

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
  StackDivider,
  Spacer,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { EditClientForm } from "./editClientForm";
import { DeleteJob } from "./deleteJob";

export const Address = ({ address, ...rest }) => {
  const { hasCopied, onCopy } = useClipboard(address);
  return (
    <VStack p={2} boxShadow="base" _hover={{ boxShadow: "dark-lg" }} {...rest}>
      <Link isExternal>
        <iframe
          title={address}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11535.988402242036!2d-79.27491817896484!3d43.7106093246573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4ce7b488e5fcd%3A0xad322c8c32ab7f01!2sWarden!5e0!3m2!1sen!2sca!4v1634930038310!5m2!1sen!2sca"
          width="250"
          height="100px"
          style={{ border: 0 }}
          loading="lazy"
        />
        <HStack>
          <Text>{address}</Text>
          <Button
            onClick={onCopy}
            ml={2}
            variant="solid"
            _hover={{ boxShadow: "lg" }}
            color="gray.900"
            size="xs"
          >
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </HStack>
      </Link>
    </VStack>
  );
};

export const formatPhoneNumber = (number) => {
  let input = number.toString();
  return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
};

export const ContactInfo = ({ address, jobId, client, isHeader }) => {
  return (
    <Box>
      {isHeader ? (
        <Heading as="h3" size="lg">
          {client.firstName}
        </Heading>
      ) : (
        <Text>
          <Text as="span" fontWeight="bold">
            CUSTOMER
          </Text>{" "}
          : {client.firstName}
        </Text>
      )}
      <Text>
        <Text as="span" fontWeight="bold">
          ADDRESS
        </Text>
        : {address}
      </Text>
      <Text>
        <Text as="span" fontWeight="bold">
          TELEPHONE
        </Text>
        : {formatPhoneNumber(client.phoneNumber)}
      </Text>
      <Text>
        <Text as="span" fontWeight="bold">
          EMAIL
        </Text>
        : {client.email}
      </Text>
      <EditClientForm jobId={jobId} width="50%" />
    </Box>
  );
};

const TaskTab = ({ jobTasks }) => {
  if (jobTasks.length <= 0) {
    return <Text>No tasks</Text>;
  }
  return (
    <VStack
      alignItems="stretch"
      w="100%"
      border="1px"
      rounded="lg"
      marginBottom={3}
      p={4}
      divider={<StackDivider color="gray.300" />}
    >
      <HStack>
        <Heading as="h4" color="black">
          Task
        </Heading>
        <Spacer />
        <Text color="black">Status</Text>
      </HStack>
      {jobTasks.map((task) => (
        <HStack key={task.id}>
          <Text textDecoration={task.isComplete ? "line-through" : "none"}>
            {task.task}
          </Text>
          <Spacer />
          {task.isComplete ? (
            <Icon as={AiOutlineCheckCircle} color="green.700" fontSize="lg" />
          ) : (
            <Icon as={MdOutlineCancelPresentation} color="red" fontSize="lg" />
          )}
        </HStack>
      ))}
    </VStack>
  );
};

const InfoTabs = ({ job, client, isFetching, isSuccess }) => {
  let content;

  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <ContactInfo
        address={job.location}
        jobId={job.id}
        client={client}
        isHeader={true}
      />
    );
  }

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
          <TabPanel>{content}</TabPanel>
          <TabPanel>
            <DetailTab jobDetail={job} />
          </TabPanel>
          <TabPanel>
            {" "}
            <TaskTab jobTasks={job.tasks} />
          </TabPanel>
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
function Job({ job, ...rest }) {
  const {
    data: client,
    isFetching,
    isSuccess,
  } = useGetClientByIdQuery(job.clientId);

  let name;
  if (isFetching) {
    name = <Spinner />;
  } else if (isSuccess) {
    name = (
      <Text align="end" fontSize="2xl" fontWeight="hairline">
        {client.firstName}
      </Text>
    );
  }

  return (
    <Box bg={"teal.600"} rounded="2xl" boxShadow="base" sx={{ ...rest }}>
      <Stack p={2}>
        <HStack justify="space-between">
          <Box>
            <Heading size={"lg"} marginLeft={6} color="white">
              <Link as={ReactLink} to={`/jobs/${job.id}`}>
                <Tooltip
                  label="Click to view full detail"
                  aria-label="A tooltip"
                  fontSize="md"
                >
                  <span tabIndex="0">{job.jobName}</span>
                </Tooltip>
              </Link>
            </Heading>
            <Box>{name}</Box>
            <Badge variant="subtle" colorScheme="green" mt={8} ml={2}>
              New
            </Badge>
          </Box>
          <Address address={job.location} />
        </HStack>
        <Divider orientation="horizontal" />

        <HStack>
          <InfoTabs
            job={job}
            client={client}
            isFetching={isFetching}
            isSuccess={isSuccess}
          />
        </HStack>
        <DeleteJob jobId={job.id} />
      </Stack>
    </Box>
  );
}

export default Job;
