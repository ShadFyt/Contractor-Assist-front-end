import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { employeesAdded } from "../../../features/job/jobSlice";

import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import TaskComponent from "./taskComponent";

const ClockInForm = ({ jobId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const onEmployeeChanged = (e) => setEmployee(e.target.value);
  const onStartTimeChanged = (e) => setStartTime(e.target.value);
  const onEndTimeChanged = (e) => setEndTime(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);

  const onAddWorker = () => {
    console.log("clicked");
    const data = { name: employee, date, startTime, endTime };
    onClose();
    dispatch(employeesAdded(jobId, data));
    setEmployee("");
  };

  const employees = useSelector((state) => state.employees);

  const employeesOptions = employees.map((employee) => (
    <option key={employee.id} value={employee.name}>
      {employee.name}
    </option>
  ));
  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        Clock In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Clock In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Employee</FormLabel>
                <Select
                  id="employee"
                  name="employee"
                  value={employee}
                  onChange={onEmployeeChanged}
                  placeholder="Select an employee"
                >
                  {employeesOptions}
                </Select>
              </FormControl>
              <HStack w="full">
                <FormControl>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    id="startTime"
                    name="startTime"
                    value={startTime}
                    onChange={onStartTimeChanged}
                    type="time"
                    textAlign="center"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    id="endTime"
                    name="endTime"
                    value={endTime}
                    onChange={onEndTimeChanged}
                    type="time"
                    textAlign="center"
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  id="date"
                  name="date"
                  value={date}
                  onChange={onDateChanged}
                  type="date"
                  textAlign="center"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onAddWorker} colorScheme="green" mr={1}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

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
          {job.workers.map((data) => (
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

export const SingleJobPage = ({ match }) => {
  const { jobId } = match.params;

  const job = useSelector((state) => {
    return state.job.listOfJobs.find((job) => job.id === parseInt(jobId));
  });

  if (!job) {
    return (
      <section>
        <h2>Job not found</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>{job.jobName}</h2>
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={4}>
        <Box marginY={2} padding={2} border="1px" rounded="lg" h="fit-content">
          <RenderClockInTable job={job} />
        </Box>
        <Box marginY={2} marginRight={2} h="fit-content">
          <TaskComponent jobId={jobId} jobTasks={job.tasks} />
        </Box>
      </SimpleGrid>
    </section>
  );
};
