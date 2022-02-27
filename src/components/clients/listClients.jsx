import React from "react";
import { Spinner, SimpleGrid } from "@chakra-ui/react";
import { useGetClientsQuery } from "../../features/api/apiSlice";
import { ClientProfile } from "./clientProfile";
import Header from "../layout/Header";

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
      <Header />
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}>
        {listOfClients}
      </SimpleGrid>
    </section>
  );
};

export default ListClients;
