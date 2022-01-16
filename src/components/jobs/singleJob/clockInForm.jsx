import React, { useState } from "react";
import {
  useGetEmployeesQuery,
  useAddNewTimeEntryMutation,
  useGetEmployeeByNameQuery,
  useUpdateTimeEntryMutation,
} from "../../../features/api/apiSlice"


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
  Spinner,
  Heading,
} from "@chakra-ui/react";

const ClockInForm = ({ jobId, timeEntry, employeeName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(timeEntry ? employeeName : "");
  const [clockIn, setClockIn] = useState(timeEntry ? timeEntry.clockIn : "");
  const [clockOut, setClockOut] = useState(timeEntry ? timeEntry.clockOut : "");
  const [date, setDate] = useState(timeEntry ? timeEntry.date : "");
  const onEmployeeChanged = (e) => setName(e.target.value);
  const onClockInChanged = (e) => setClockIn(e.target.value);
  const onClockOutChanged = (e) => setClockOut(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);

  const [updateTimeEntry] = useUpdateTimeEntryMutation()
  const [addNewTimeEntry, { isLoading: isTimeEntryLoading }] = useAddNewTimeEntryMutation()
  const { data: employee } = useGetEmployeeByNameQuery(name)

  const canSave =
    [date, clockIn, clockOut].every(
      Boolean
    ) && !isTimeEntryLoading;

  const onClockIn = async () => {
    if (canSave) {
      try {
        console.log("adding...")
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
      } catch (err) {
        console.error("failed", err)
      }
    }
  }

  const onUpdate = async () => {
    await updateTimeEntry({
      id: timeEntry.id,
      date,
      clockIn,
      clockOut
    })
  }

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
        {timeEntry ? "x" : "Clock In"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Clock In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              {timeEntry ? <Heading>{employeeName}</Heading> :
                <FormControl>
                  <FormLabel>Employee</FormLabel>
                  <Select
                    id="name"
                    name="name"
                    value={name}
                    onChange={onEmployeeChanged}
                    placeholder={timeEntry ? employeeName : "Select an employee"}
                  >
                    {content}
                  </Select>
                </FormControl>
              }

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
            <Button onClick={timeEntry ? onUpdate : onClockIn} colorScheme="green" mr={1}>
              {timeEntry ? "Update" : "Submit"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClockInForm;
