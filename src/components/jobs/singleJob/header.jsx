import React from "react";
import {
  Box,
  Heading,
  Spacer,
  Flex,
  Spinner,
  Link,
  Icon,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMapPin, FiPhone } from "react-icons/fi";

import { Link as ReactLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { MdEmail } from "react-icons/md";

import { Address } from "../JobComponent";
import { useGetClientByIdQuery } from "../../../features/api/apiSlice";
import { formatPhoneNumber } from "../JobComponent";

const ClientInfo = ({ client, address }) => {
  return (
    <Box>
      <Heading>{client.firstName}</Heading>
      <Text>
        <Icon as={FiMapPin} /> {address}
      </Text>
      <Text>
        <Icon as={FiPhone} /> {formatPhoneNumber(client.phoneNumber)}
      </Text>
      <Text>
        <Icon as={MdEmail} /> {client.email}
      </Text>
    </Box>
  );
};

const Header = ({ job }) => {
  const isLarge = useBreakpointValue({ lg: true });
  const {
    data: client,
    isFetching,
    isSuccess,
  } = useGetClientByIdQuery(job.clientId);

  let info;

  if (isFetching) {
    info = <Spinner />;
  } else if (isSuccess) {
    info = <ClientInfo address={job.location} client={client} jobId={job.id} />;
  }

  return (
    <Flex bg="teal.600" borderLeftRadius="2xl" h={["280px", "250px"]} p={2}>
      <Link marginLeft={2} as={ReactLink} to={"/jobs"}>
        <Icon
          color={"white"}
          fontSize={"3xl"}
          as={TiArrowBack}
          marginBottom={1}
          _hover={{ color: "gray.400" }}
        />
      </Link>

      <Box
        marginLeft={2}
        alignSelf={["center", "center", "center", "flex-end"]}
      >
        {info}
      </Box>
      <Spacer />
      <Box alignSelf="flex-start">
        <Heading m={2} p={3} rounded="sm" bgColor="teal.400" size="2xl">
          {job.jobName}
        </Heading>

        {isLarge ? null : (
          <Address address={job.location} width={"fit-content"} />
        )}
      </Box>
      {isLarge ? (
        <>
          <Spacer />
          <Box alignSelf="flex-end">
            <Address address={job.location} width={"fit-content"} />
          </Box>{" "}
        </>
      ) : null}
    </Flex>
  );
};

export default Header;
