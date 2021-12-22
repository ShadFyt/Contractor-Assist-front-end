import React from "react";
import { Link as ReactLink } from "react-router-dom";

import { Box, Spinner, Text, Button } from "@chakra-ui/react";

import { useGetEmployeesQuery } from "../../features/api/apiSlice";
import { AddEmployeeForm } from "./addNewEmployeeForm";

const DisplayEmployee = ({ employee }) => {
  return (
    <Box>
      <Text>{employee.firstName}</Text>
      <Text>{employee.lastName}</Text>
      <Text>{employee.birthDate}</Text>
      <Text>{employee.payRate}</Text>
    </Box>
  );
};

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
      <DisplayEmployee key={employee.id} employee={employee} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <h2>Employees</h2>
      <Box>{content}</Box>
      <Box w="50%">
        <AddEmployeeForm />
      </Box>
    </section>
  );
};

export default ListEmployees;
