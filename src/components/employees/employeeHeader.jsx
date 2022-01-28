import {
  Box,
  Flex,
  Center,
  Heading,
  Button,
  HStack,
  Link,
  Icon,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import { RenderEmployeeForm } from "./addNewEmployeeForm";

const EmployeeHeader = () => {
  return (
    <Flex bg="gray.200" borderLeftRadius="2xl" h="100px" p={2} marginLeft={2}>
      <Link as={ReactLink} to={"/home"}>
        <Icon
          color={"black"}
          fontSize={"3xl"}
          as={TiArrowBack}
          marginBottom={1}
          _hover={{ color: "gray.400" }}
        />
      </Link>
      <Center mx={"auto"}>
        <Heading>List of employees</Heading>
      </Center>
      <Box alignSelf="flex-end">
        <RenderEmployeeForm />
      </Box>
    </Flex>
  );
};

export default EmployeeHeader;
