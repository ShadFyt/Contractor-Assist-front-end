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
    <>
      <Center>
        <Text fontSize="large">Job Details</Text>
      </Center>
    </>
  );
};

const JobFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Add</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
