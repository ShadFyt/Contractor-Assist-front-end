import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

export const WeeklyTimeSheetTable = ({ timeEntries }) => {
  let data = "";
  if (timeEntries) {
    data = timeEntries.map((timeEntry) => (
      <Tr key={timeEntry.id}>
        <Td>
          <Link as={ReactLink} to={`/jobs/${timeEntry.jobId}`}>
            {timeEntry.jobId}
          </Link>
        </Td>
        <Td>{timeEntry.employeeName}</Td>
        <Td>{timeEntry.date}</Td>
        <Td>{timeEntry.clockIn}</Td>
        <Td>{timeEntry.clockOut}</Td>
        <Td>{timeEntry.hours}</Td>
      </Tr>
    ));
  }

  return (
    <Table size={{ base: "sm", lg: "md" }}>
      <Thead>
        <Tr>
          <Th>Job ID</Th>
          <Th>Employee</Th>
          <Th>Date</Th>
          <Th>Start Time</Th>
          <Th>End Time</Th>
          <Th>Hours</Th>
        </Tr>
      </Thead>
      <Tbody>{data}</Tbody>
    </Table>
  );
};
