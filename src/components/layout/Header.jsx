import { Box, Flex, Center, Heading, Link, Icon } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import { RenderDrawerForm } from "../shared/drawerForm";
import { AddEmployeeForm } from "../employees/addNewEmployeeForm";

const Header = ({ isEmployeeHeader }) => {
  return (
    <Flex bg="gray.200" borderBottomLeftRadius="2xl" h="100px" p={2}>
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
        <Heading>
          {isEmployeeHeader ? "List of employees" : "List of clients"}
        </Heading>
      </Center>
      <Box alignSelf="flex-end">
        {isEmployeeHeader ? <RenderDrawerForm Form={AddEmployeeForm} /> : null}
      </Box>
    </Flex>
  );
};

export default Header;
