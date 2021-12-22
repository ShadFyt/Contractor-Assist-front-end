import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { useAddNewJobMutation } from "../../features/api/apiSlice";

import {
  FormControl,
  FormLabel,
  Input,
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
  Text,
  Textarea,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

const AddJobForm = forwardRef((props, ref) => {
  const [detailFormData, setDetailFormData] = useState({
    jobName: "",
    startDate: "",
    finishDate: "",
    location: "",
    jobType: "both",
    summary: "",
  });

  const resetDetailForm = () => {
    setDetailFormData({
      ...detailFormData,
      jobName: "",
      startDate: "",
      finishDate: "",
      location: "",
      jobType: "both",
      summary: "",
    });
  };

  const handleChange = (e) =>
    setDetailFormData({
      ...detailFormData,
      [e.target.name]: e.target.value,
    });

  const [addNewJob, { isLoading }] = useAddNewJobMutation();

  const canSave = [detailFormData].every(Boolean) && !isLoading;

  const onSaveJob = async () => {
    if (canSave) {
      try {
        await addNewJob({
          ...detailFormData,
        }).unwrap();
        resetDetailForm();
      } catch (err) {
        console.log("failed to save job", err);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleClick() {
      onSaveJob();
    },
  }));

  return (
    <Stack spacing={4} w="full">
      <Center>
        <Text fontSize="large">Job Details</Text>
      </Center>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="jobName">Job Name</FormLabel>
          <Input
            id="jobName"
            name="jobName"
            value={detailFormData.jobName}
            onChange={handleChange}
            type="text"
            textAlign="center"
          />
        </FormControl>
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
      </HStack>
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
      <FormControl id="location">
        <FormLabel htmlFor="location">Location</FormLabel>
        <Input
          id="location"
          name="location"
          value={detailFormData.location}
          onChange={handleChange}
          type="text"
          placeholder="address of job goes here"
        />
      </FormControl>
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
});

const JobFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const childRef = useRef();
  const handleSubmit = () => {
    childRef.current.handleClick();
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
              <AddJobForm ref={childRef} />
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
