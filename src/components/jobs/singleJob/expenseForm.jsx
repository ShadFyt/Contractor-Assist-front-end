import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { expenseAdded } from "../../../features/job/jobSlice";

import {
  Button,
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
  VStack,
  HStack,
  Select,
} from "@chakra-ui/react";

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
  const onPriceChanged = (e) => setPrice(e.target.value);
};
