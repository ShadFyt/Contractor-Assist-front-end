import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { expenseAdded } from "../../../features/job/jobSlice";

import {
  Button,
  FormControl,
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";

import { FaDollarSign, FaRegCalendarAlt, FaStoreAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

const ExpenseForm = ({ jobId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const onStoreChanged = (e) => setStore(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onPriceChanged = (e) => setPrice(e);

  const addExpense = () => {
    dispatch(
      expenseAdded({
        store,
        date,
        location,
        price,
        jobId,
      })
    );
    setStore("");
    setDate("");
    setLocation("");
    setPrice("");
    onClose();
    console.log("dispatch expense to store");
  };

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        Add Expense
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FaStoreAlt} />}
                  />
                  <Input
                    type="text"
                    id="store"
                    name="store"
                    placeholder="Name Of Store"
                    value={store}
                    onChange={onStoreChanged}
                  />
                </InputGroup>
              </FormControl>
              <HStack>
                <FormControl w="fit-content">
                  <InputGroup marginRight={4}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={FaDollarSign} color="green.400" />}
                    />
                    <NumberInput
                      onChange={onPriceChanged}
                      value={price}
                      precision={2}
                      marginLeft={3}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={FaRegCalendarAlt} />}
                    />
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={onDateChanged}
                    />
                  </InputGroup>
                </FormControl>
              </HStack>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FiMapPin} />}
                  />
                  <Input
                    type="text"
                    placeholder="Location"
                    id="location"
                    name="location"
                    value={location}
                    onChange={onLocationChanged}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={addExpense}>Add</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExpenseForm;
