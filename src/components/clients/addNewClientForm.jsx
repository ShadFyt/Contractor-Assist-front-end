import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FiPhone } from "react-icons/fi";

import { useAddNewClientMutation } from "../../features/api/apiSlice";

import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
} from "@chakra-ui/react";

export const AddNewClientForm = forwardRef((props, ref) => {
  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const resetContactForm = () =>
    setContactFormData({
      ...contactFormData,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      onSaveClient();
    },
  }));

  const handleChange = (e) =>
    setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });

  const [addNewClient, { isLoading }] = useAddNewClientMutation();

  const canSave = [contactFormData].every(Boolean) && !isLoading;

  const onSaveClient = async () => {
    if (canSave) {
      try {
        await addNewClient({
          ...contactFormData,
        }).unwrap();
        resetContactForm();
      } catch (err) {
        console.log("failed to save client info", err);
      }
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
            value={contactFormData.firstName}
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
      <HStack marginTop={2}>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              children={<Icon as={FiPhone} color="gray.600" />}
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              value={contactFormData.number}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
      </HStack>
    </>
  );
});
