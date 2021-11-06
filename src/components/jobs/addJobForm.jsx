import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { FiPhone } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";

import { jobAdded } from "../../features/job/jobSlice";

import {
  FormControl,
  FormLabel,
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

const ContactInfo = ({ contactFormData, setContactFormData }) => {
  const handleChange = (e) =>
    setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });

  return (
    <>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="owner">First Name</FormLabel>
          <Input
            type="text"
            id="owner"
            name="owner"
            value={contactFormData.owner}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={contactFormData.lastName}
            onChange={handleChange}
          />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={contactFormData.email}
          onChange={handleChange}
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
              id="number"
              name="number"
              value={contactFormData.number}
              onChange={handleChange}
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
              value={contactFormData.address}
              onChange={handleChange}
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

  const [contactFormData, setContactFormData] = useState({
    owner: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
  });

  const details = {
    summary: "some fake content",
    startDate: "12/28/2020",
    endDate: "7/9/2021",
    jobType: "Both",
  };

  const resetForm = () =>
    setContactFormData({
      ...contactFormData,
      owner: "",
      lastName: "",
      email: "",
      number: "",
      address: "",
    });
  const dispatch = useDispatch();
  const AddJob = () => {
    if (contactFormData.owner) {
      console.log("is working");
      dispatch(
        jobAdded({
          id: nanoid(),
          isComplete: false,
          jobName: "test",
          contact: { ...contactFormData },
          detail: { ...details },
        })
      );
      console.log(contactFormData.number);
      resetForm();
    }
  };

  const handleSubmit = () => {
    AddJob();
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
              <ContactInfo
                contactFormData={contactFormData}
                setContactFormData={setContactFormData}
              />
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
