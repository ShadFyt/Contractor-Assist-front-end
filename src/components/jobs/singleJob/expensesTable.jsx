import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import ExpenseForm from "./expenseForm";

const RenderExpensesTable = () => {
  return (
    <Table variant="striped" size={{ base: "sm", md: "lg" }}>
      <TableCaption>
        <ExpenseForm />
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Store</Th>
          <Th>Date</Th>
          <Th>Location</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Rona</Td>
          <Td>10-10-2021</Td>
          <Td>24 hardware Dr</Td>
          <Td>$10</Td>
        </Tr>
        <Tr>
          <Td>Rona</Td>
          <Td>10-10-2021</Td>
          <Td>24 hardware Dr</Td>
          <Td>$10</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default RenderExpensesTable;
