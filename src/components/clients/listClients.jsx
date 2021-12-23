import React from "react";
import { Box } from "@chakra-ui/react";
import { useGetClientsQuery } from "../../features/api/apiSlice";

const ListClients = () => {
  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClientsQuery();

  return (
    <>
      <Box></Box>
    </>
  );
};

export default ListClients;
