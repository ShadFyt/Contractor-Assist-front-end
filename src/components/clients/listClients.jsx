import React from "react";
import { Box } from "@chakra-ui/react";
import { useGetClientsQuery } from "../../features/api/apiSlice";
import { AddNewClientForm } from "./addNewClientForm";

const ListClients = () => {
  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClientsQuery();

  return (
    <Box>
      <Box w={"50%"}>
        <AddNewClientForm />
      </Box>
    </Box>
  );
};

export default ListClients;
