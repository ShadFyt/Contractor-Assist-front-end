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
} from "@chakra-ui/react";

import { useGetTimeEntriesByWeekQuery } from "../../features/api/apiSlice";

export const WeeklyTimeSheetTable = () => {
  const {
    data: timeEntries = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTimeEntriesByWeekQuery("2022-02-28");

  let data = "";
  if (isLoading) {
    data = null;
  } else if (isSuccess) {
    data = timeEntries.map((timeEntry) => (
      <Tr key={timeEntry.id}>
        <Td>{timeEntry.jobId}</Td>
        <Td>{timeEntry.employeeId}</Td>
        <Td>{timeEntry.date}</Td>
        <Td>{timeEntry.clockIn}</Td>
        <Td>{timeEntry.clockOut}</Td>
      </Tr>
    ));
  } else if (isError) {
    data = <p>{error.toString()}</p>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Job ID</Th>
          <Th>Employee</Th>
          <Th>Date</Th>
          <Th>Start Time</Th>
          <Th>End Time</Th>
        </Tr>
      </Thead>
      <Tbody>{data}</Tbody>
    </Table>
  );
};
