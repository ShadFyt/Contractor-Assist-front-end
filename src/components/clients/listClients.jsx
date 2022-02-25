import React from "react";
import { Box, Spinner, SimpleGrid } from "@chakra-ui/react";
import { AddNewClientForm } from "./addNewClientForm";
import { useGetClientsQuery } from "../../features/api/apiSlice";
import { ClientProfile } from "./clientProfile";

const ListClients = () => {
  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClientsQuery();

  let listOfClients;

  if (isLoading) {
    listOfClients = <Spinner />;
  } else if (isSuccess) {
    listOfClients = clients.map((client) => (
      <ClientProfile key={client.id} client={client} />
    ));
  } else if (isError) {
    listOfClients = <div>{error.toString()}</div>;
  }

  return (
    <section>
      {/* <EmployeeHeader /> */}
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}>
        {listOfClients}
      </SimpleGrid>
      <AddNewClientForm />
    </section>
  );
};

export default ListClients;
