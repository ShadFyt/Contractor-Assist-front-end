import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { FiPhone } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";

import { jobAdded } from "../../features/job/jobSlice";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  VStack,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
  Text,
  Textarea,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

const ContactInfo = ({ handleJobInputs }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const onFirstNameChanged = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPhoneNumChanged = (e) => {
    setPhoneNum(e.target.value);
    console.log(phoneNum);
  };
  const onAddressChanged = (e) => setAddress(e.target.value);

  useEffect(() => {
    handleJobInputs.current = addJob;
  });

  const addJob = () => {
    if (firstName && lastName) {
      console.log("is working");
      dispatch(
        jobAdded({
          id: nanoid(),
          isComplete: false,
          jobName: "test",
          contact: {
            firstName,
            lastName,
            email,
            phoneNum,
            address,
          },
          detail: {
            summary: "some fake content",
            startDate: "12/28/2020",
            endDate: "7/9/2021",
            jobType: "Both",
          },
        })
      );
      console.log("submitted");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNum("");
      setAddress("");
    }
  };

  return (
    <>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onFirstNameChanged}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={onLastNameChanged}
          />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onEmailChanged}
        />
      </FormControl>
      <HStack>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvent="none"
              children={<Icon as={FiPhone} color="gray.600" />}
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              id="phone"
              name="name"
              value={phoneNum}
              onChange={onPhoneNumChanged}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvent="none"
              children={<Icon as={FaAddressCard} color="gray.600" />}
            />
            <Input
              type="text"
              placeholder="Address"
              id="address"
              name="address"
              value={address}
              onChange={onAddressChanged}
            />
          </InputGroup>
        </FormControl>
      </HStack>
    </>
  );
};

const JobInfo = () => {
  return (
    <Stack spacing={4} w="full">
      <Center>
        <Text fontSize="large">Job Details</Text>
      </Center>
      <FormControl id="jobType">
        <FormLabel>Job Type</FormLabel>
        <Select placeholder="Select a job type">
          <option>Sanding</option>
          <option>Installation</option>
          <option>Both</option>
        </Select>
      </FormControl>
      <HStack width="full">
        <FormControl id="startDate">
          <FormLabel>Start Date</FormLabel>
          <Input type="date" textAlign="center" />
        </FormControl>
        <FormControl id="endDate">
          <FormLabel>End Date</FormLabel>
          <Input type="date" textAlign="center" />
        </FormControl>
      </HStack>
      <FormControl id="summary">
        <FormLabel>Summary</FormLabel>
        <Textarea type="text" placeholder="details of job goes here" />
      </FormControl>
    </Stack>
  );
};

const JobFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleJobInputs = useRef(null);

  const handleSubmit = () => {
    handleJobInputs.current();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Add</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.500">
          <ModalHeader>
            <Center>Add New Job</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <ContactInfo handleJobInputs={handleJobInputs} />
              <Divider />
              <JobInfo />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleSubmit()} colorScheme="green" mr={1}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobFormModal;
