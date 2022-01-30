import React from "react";
import { Box } from "@chakra-ui/react";
import { AddNewClientForm } from "./addNewClientForm";

const ListClients = () => {
  return (
    <Box>
      <Box w={"100%"}>
        <AddNewClientForm />
      </Box>
    </Box>
  );
};

export default ListClients;
