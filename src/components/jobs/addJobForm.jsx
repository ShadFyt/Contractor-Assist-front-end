import React, { useState } from "react";
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

const JobInfo = ({ detailFormData, setDetailFormData }) => {
  const handleChange = (e) =>
    setDetailFormData({
      ...detailFormData,
      [e.target.name]: e.target.value,
    });

  return (
    <Stack spacing={4} w="full">
      <Center>
        <Text fontSize="large">Job Details</Text>
      </Center>
      <FormControl>
        <FormLabel>Job Type</FormLabel>
        <Select
          id="jobType"
          name="jobType"
          value={detailFormData.jobType}
          onChange={handleChange}
          placeholder="Select a job type"
        >
          <option value="sanding">sanding</option>
          <option value="installation">installation</option>
          <option value="both">both</option>
        </Select>
      </FormControl>
      <HStack width="full">
        <FormControl>
          <FormLabel htmlFor="startDate">Start Date</FormLabel>
          <Input
            id="startDate"
            name="startDate"
            value={detailFormData.startDate}
            onChange={handleChange}
            type="date"
            textAlign="center"
          />
        </FormControl>
        <FormControl id="endDate">
          <FormLabel htmlFor="endDate">End Date</FormLabel>
          <Input
            id="endDate"
            name="endDate"
            value={detailFormData.endDate}
            onChange={handleChange}
            type="date"
            textAlign="center"
          />
        </FormControl>
      </HStack>
      <FormControl id="summary">
        <FormLabel htmlFor="summary">Summary</FormLabel>
        <Textarea
          id="summary"
          name="summary"
          value={detailFormData.summary}
          onChange={handleChange}
          type="text"
          placeholder="details of job goes here"
        />
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

  const [detailFormData, setDetailFormData] = useState({
    summary: "",
    startDate: "",
    endDate: "",
    jobType: "both",
  });

  const resetDetailForm = () => {
    setDetailFormData({
      ...detailFormData,
      summary: "",
      startDate: "",
      endDate: "",
      jobType: "",
    });
  };

  const resetContactForm = () =>
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
          detail: { ...detailFormData },
        })
      );
      resetContactForm();
      resetDetailForm();
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
              <JobInfo
                detailFormData={detailFormData}
                setDetailFormData={setDetailFormData}
              />
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
