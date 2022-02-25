import React from "react";
import { Spinner, SimpleGrid } from "@chakra-ui/react";

import { useGetEmployeesQuery } from "../../features/api/apiSlice";
import { EmployeeProfile } from "./employeeProfile";
import Header from "../layout/Header";

const ListEmployees = () => {
  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeesQuery();

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = employees.map((employee) => (
      <EmployeeProfile key={employee.id} employee={employee} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <Header isEmployeeHeader={true} />
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}>
        {content}
      </SimpleGrid>
    </section>
  );
};

export default ListEmployees;
