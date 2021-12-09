import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import ExpenseForm from "./expenseForm";

const RenderExpensesTable = ({ expenses, jobId }) => {
  return (
    <Table variant="striped" size={{ base: "sm", md: "lg" }}>
      <TableCaption>
        <ExpenseForm jobId={jobId} />
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
        {expenses.map((item) => (
          <Tr key={item.id}>
            <Td>{item.store}</Td>
            <Td>{item.date}</Td>
            <Td>{item.location}</Td>
            <Td>$ {item.price}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RenderExpensesTable;
