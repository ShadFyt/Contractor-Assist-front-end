import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";

import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";

export const AddNewClientForm = () => {
  const [contactFormData, setContactFormData] = useState({
    owner: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
  });

  const resetContactForm = () =>
    setContactFormData({
      ...contactFormData,
      owner: "",
      lastName: "",
      email: "",
      number: "",
      address: "",
    });

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
