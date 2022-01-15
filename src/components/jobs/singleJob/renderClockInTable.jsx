import React, {useMemo} from "react";

import {useGetEmployeeByIdQuery, useGetTimeEntriesByJobQuery} from "../../../features/api/apiSlice"

import ClockInForm from "./clockInForm";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Spinner
} from "@chakra-ui/react";

const RenderClockInTable = ({ job }) => {
  const RenderName = ({id}) => {
    const {data: employee, isLoading, isSuccess,
    } = useGetEmployeeByIdQuery(id)
    let content = ""
    if (isLoading) {
      content = <Spinner />
    } else if (isSuccess) {
      content = <Text>{employee.firstName}</Text>
    }
    return content
  }

  const {
    data: timeEntries = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTimeEntriesByJobQuery(job.id)

  const sortedTimeEntries = useMemo(() => {
    // sorts list by date
    const sortedTimeEntries = timeEntries.slice()
    sortedTimeEntries.sort((a,b) => b.date.localeCompare(a.date))
    return sortedTimeEntries
  }, [timeEntries])

  let content = ""

  if(isLoading){
    content = <Spinner />
  } else if (isSuccess){
    console.log(timeEntries)
    content =          
    sortedTimeEntries.map((data) => (
      <Tr key={data.id}>
        <Td>{<RenderName id ={data.employeeId} />}</Td>
        <Td>{data.date}</Td>
        <Td>{data.clockIn}</Td>
        <Td>{data.clockOut}</Td>
      </Tr>
    ))
  }  else if (isError) {
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
        <Tbody>
          {content}
        </Tbody>
      </Table>
    </>
  );
};

export default RenderClockInTable;
