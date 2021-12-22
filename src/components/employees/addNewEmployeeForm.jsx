import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";

import { useAddNewEmployeeMutation } from "../../features/api/apiSlice";

export const AddEmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [payRate, setPayRate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [addNewEmployee, { isLoading }] = useAddNewEmployeeMutation();

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onBirthDateChanged = (e) => setBirthDate(e.target.value);
  const onPayRateChanged = (e) => setPayRate(e.target.value);
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);

  const canSave =
    [firstName, lastName, birthDate, payRate, phoneNumber, email].every(
      Boolean
    ) && !isLoading;

  const onSaveEmployee = async () => {
    if (canSave) {
      try {
        await addNewEmployee({
          firstName,
          lastName,
          birthDate,
          payRate,
          phoneNumber,
          email,
        }).unwrap();
        setFirstName("");
        setLastName("");
        setBirthDate("");
        setPayRate("");
        setPhoneNumber("");
        setEmail("");
      } catch (err) {
        console.error("failed to save employee", err);
      }
    }
  };

  return (
    <VStack>
      <HStack width="100%">
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
            name="firstName"
            value={lastName}
            onChange={onLastNameChanged}
          />
        </FormControl>
      </HStack>
      <HStack width="100%">
        <FormControl>
          <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
          <Input
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            onChange={onBirthDateChanged}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="payRate">Hourly Pay</FormLabel>
          <Input
            type="number"
            id="payRate"
            name="payRate"
            value={payRate}
            onChange={onPayRateChanged}
          />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
        <Input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onPhoneNumberChanged}
        />
      </FormControl>
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
      <Button onClick={() => onSaveEmployee()}>Add new employee</Button>
    </VStack>
  );
};
