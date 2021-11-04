import React from "react";
import { FiPhone } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";

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

const ContactInfo = () => {
  return (
    <>
      <HStack>
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last Name</FormLabel>
          <Input type="text" />
        </FormControl>
      </HStack>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>
      <HStack>
        <FormControl id="phone">
          <InputGroup>
            <InputLeftElement
              pointerEvent="none"
              children={<Icon as={FiPhone} color="gray.600" />}
            />
            <Input type="tel" placeholder="Phone Number" />
          </InputGroup>
        </FormControl>
        <FormControl id="address">
          <InputGroup>
            <InputLeftElement
              pointerEvent="none"
              children={<Icon as={FaAddressCard} color="gray.600" />}
            />
            <Input type="text" placeholder="Address" />
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
              <ContactInfo />
              <Divider />
              <JobInfo />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={1}>
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
