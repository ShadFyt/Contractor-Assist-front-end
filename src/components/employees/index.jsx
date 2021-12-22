import React from "react";
import { Box, Spinner, Text, Button, SimpleGrid } from "@chakra-ui/react";

import { useGetEmployeesQuery } from "../../features/api/apiSlice";
import { AddEmployeeForm } from "./addNewEmployeeForm";
import { EmployeeProfile } from "./employeeProfile";

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
      <h2>Employees</h2>
      <SimpleGrid columns={3}>{content}</SimpleGrid>
      <Box w="50%">
        <AddEmployeeForm />
      </Box>
    </section>
  );
};

export default ListEmployees;
