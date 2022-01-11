import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useGetEmployeesQuery} from "../../../features/api/apiSlice"

import { employeesAdded } from "../../../features/job/jobSlice";

import {
  Button,
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
  Spinner
} from "@chakra-ui/react";

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
      <option key={employee.id} value={employee.firstName}>
        {employee.firstName}
      </option>
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

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
                  {content}
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

export default ClockInForm;
