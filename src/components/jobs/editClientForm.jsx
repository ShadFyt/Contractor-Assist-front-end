import {
  Button,
  Center,
  VStack,
  HStack,
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { clientUpdated } from "../../features/job/jobSlice";

export const EditClientForm = ({ jobId, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const job = useSelector((state) =>
    state.job.listOfJobs.find((job) => job.id === jobId)
  );

  const [address, setAddress] = useState(job.contact.address);
  const [email, setEmail] = useState(job.contact.email);
  const [number, setNumber] = useState(job.contact.number);

  const dispatch = useDispatch();
  const history = useHistory();

  const onAddressChanged = (e) => setAddress(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onNumberChanged = (e) => setNumber(e.target.value);

  const handleEditSubmit = () => {
    console.log(job.contact);
    dispatch(clientUpdated({ id: jobId, address, email, number }));
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="gray"
        bgColor="gray.500"
        mt={3}
        _hover={{ bgColor: "gray.700", boxShadow: "lg" }}
        {...rest}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Edit {job.contact.owner} Info</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onEmailChanged}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="Address:">address</FormLabel>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={onAddressChanged}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="number">Phone number:</FormLabel>
                <Input
                  type="text"
                  id="number"
                  name="number"
                  value={number}
                  onChange={onNumberChanged}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleEditSubmit} colorScheme="green">
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};