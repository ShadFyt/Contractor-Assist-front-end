import React from "react";

import ClockInForm from "./clockInForm";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const RenderClockInTable = ({ job }) => {
  return (
    <>
      <Table variant="simple" size={{ base: "sm", md: "lg" }}>
        <TableCaption>
          Employees Clock In Table <ClockInForm jobId={job.id} />
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Employee</Th>
            <Th>Date</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {job.timeEntries.map((data) => (
            <Tr key={data.id}>
              <Td>{data.name}</Td>
              <Td>{data.date}</Td>
              <Td>{data.startTime}</Td>
              <Td>{data.endTime}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default RenderClockInTable;
