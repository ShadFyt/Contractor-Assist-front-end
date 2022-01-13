import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import {useGetEmployeesQuery, useAddNewTimeEntryMutation, useGetEmployeeByNameQuery} from "../../../features/api/apiSlice"

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

  const [name, setName] = useState("");
  const [clockIn , setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [date, setDate] = useState("");

  const onEmployeeChanged = (e) => setName(e.target.value);
  const onClockInChanged = (e) => setClockIn(e.target.value);
  const onClockOutChanged = (e) => setClockOut(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);

  const [addNewTimeEntry, {isLoading: isTimeEntryLoading}] = useAddNewTimeEntryMutation()
  const {data: employee} = useGetEmployeeByNameQuery(name)

  const canSave =
    [date, clockIn, clockOut].every(
      Boolean
    ) && !isTimeEntryLoading;

  const onClockIn = async () => {
    if(canSave) {
      try {
        console.log("adding...")
        console.log(employee.firstName)
        console.log(employee.id)
        await addNewTimeEntry({
          date,
          clockIn,
          clockOut,
          jobId,
          employeeId: employee.id
        }).unwrap();
        setName("");
        setClockIn("");
        setClockOut("");
        setDate("")
        onClose()
      } catch (err){
        console.error("failed", err)
      }
    }
  }


  const onAddWorker = () => {
    console.log("clicked");
    const data = { name: employee, date, clockIn, clockOut };
    onClose();
    dispatch(employeesAdded(jobId, data));
    setName("");
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
                  id="name"
                  name="name"
                  value={name}
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
                    id="clockIn"
                    name="clockIn"
                    value={clockIn}
                    onChange={onClockInChanged}
                    type="time"
                    textAlign="center"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    id="clockOut"
                    name="clockOut"
                    value={clockOut}
                    onChange={onClockOutChanged}
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
            <Button onClick={onClockIn} colorScheme="green" mr={1}>
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
