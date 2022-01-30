import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";

import { FiPhone } from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";

export const EmployeeProfile = ({ employee }) => {
  const formatPhoneNumber = (number) => {
    let input = number.toString();
    return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  return (
    <Center py={6}>
      <Box
        maxW={"380px"}
        w={{ sm: "250px", md: "350px", lg: "400px", "2xl": "full" }}
        bg="white"
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={
            "https://images.unsplash.com/photo-1595624871930-6e8537998592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          }
          alt={"Avatar Alt"}
          mb={4}
        />
        <Heading fontSize={"2xl"}>
          {employee.firstName} {employee.lastName}
        </Heading>
        <Text fontWeight={"500"} color={"gray.400"} mb={4}>
          {employee.email}
        </Text>
        <HStack>
          <Tag>
            <TagLeftIcon as={FiPhone} />
            <TagLabel>{formatPhoneNumber(employee.phoneNumber)}</TagLabel>
          </Tag>
          <Tag>
            <TagLeftIcon as={FaBirthdayCake} />
            <TagLabel>{employee.birthDate}</TagLabel>
          </Tag>
        </HStack>
      </Box>
    </Center>
  );
};
