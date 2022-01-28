import React, { useMemo, useState } from "react";

import {
  useGetEmployeeByIdQuery,
  useGetTimeEntriesByJobQuery,
  useDeleteTimeEntryMutation,
} from "../../../features/api/apiSlice";

import ClockInForm from "./clockInForm";
import TimeEntryPopOver from "./timeEntryPopOver";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
} from "@chakra-ui/react";

const RenderClockInTable = ({ job }) => {
  const {
    data: timeEntries = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTimeEntriesByJobQuery(job.id);

  const sortedTimeEntries = useMemo(() => {
    // sorts list by date
    const sortedTimeEntries = timeEntries.slice();
    sortedTimeEntries.sort((a, b) => b.date.localeCompare(a.date));
    return sortedTimeEntries;
  }, [timeEntries]);

  const RenderTimeEntry = ({ timeEntry }) => {
    const {
      data: employee,
      isLoading,
      isSuccess,
    } = useGetEmployeeByIdQuery(timeEntry.employeeId);
    let firstName = "";
    if (isLoading) {
      firstName = "loading";
    } else if (isSuccess) {
      firstName = employee.firstName;
    }

    return (
      <Tr>
        <Td>{firstName}</Td>
        <Td>{timeEntry.date}</Td>
        <Td>{timeEntry.clockIn}</Td>
        <Td>
          {timeEntry.clockOut}{" "}
          <TimeEntryPopOver timeEntry={timeEntry} employeeName={firstName} />
        </Td>
      </Tr>
    );
  };

  let content = "";

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    console.log(timeEntries);
    content = sortedTimeEntries.map((data) => (
      <RenderTimeEntry key={data.id} timeEntry={data} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

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
        <Tbody>{content}</Tbody>
      </Table>
    </>
  );
};

export default RenderClockInTable;
