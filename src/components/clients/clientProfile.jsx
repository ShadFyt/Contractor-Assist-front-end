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
  Button,
} from "@chakra-ui/react";

import { FiPhone } from "react-icons/fi";

export const ClientProfile = ({ client }) => {
  const formatPhoneNumber = (number) => {
    let input = number.toString();
    return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  return (
    <Center m={1} py={5}>
      <Box
        maxW={"380px"}
        w={{ sm: "250px", md: "350px", lg: "400px", "2xl": "full" }}
        bg="white"
        boxShadow={"2xl"}
        rounded={"lg"}
        p={5}
        textAlign={"center"}
        m={1}
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
          {client.firstName} {client.lastName}
        </Heading>
        <Text fontWeight={"500"} color={"gray.400"} mb={4}>
          {client.email}
        </Text>
        <HStack marginLeft={8}>
          <Tag>
            <TagLeftIcon as={FiPhone} />
            <TagLabel>{formatPhoneNumber(client.phoneNumber)}</TagLabel>
          </Tag>
          <Button size={"xs"}>add job</Button>
        </HStack>
      </Box>
    </Center>
  );
};
