import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  taskAdded,
  taskIsCompleteUpdate,
} from "../../../features/job/jobSlice";

import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Center,
  SimpleGrid,
  Text,
  Spacer,
  StackDivider,
  Heading,
  useToast,
} from "@chakra-ui/react";

const DisplayTasks = ({ jobTasks }) => {
  const dispatch = useDispatch();

  const onUpdateTask = (jobId, taskId, isComplete) => {
    console.log("from dispatch", isComplete.toString(), jobId, taskId);
    dispatch(taskIsCompleteUpdate({ jobId, taskId, isComplete }));
  };

  return (
    <VStack
      alignItems="stretch"
      w="100%"
      border="1px"
      rounded="lg"
      marginBottom={3}
      p={4}
      divider={<StackDivider colorScheme="gray" color="gray.300" />}
    >
      <Center>
        <Heading as="h3" fontSize="xl">
          Task to complete
        </Heading>
      </Center>
      {jobTasks.map((task) => (
        <HStack key={task.id}>
          <Text marginLeft={2} fontSize="xl">
            {task.task}
          </Text>
          <Spacer />
          <Button
            onClick={() => onUpdateTask(task.jobId, task.id, task.isComplete)}
            size="sm"
          >
            complete
          </Button>
          <Button colorScheme="red" size="sm">
            Delete
          </Button>
        </HStack>
      ))}
    </VStack>
  );
};

const TaskComponent = ({ jobId, jobTasks }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [task, setTask] = useState("");
  const onTaskChanged = (e) => setTask(e.target.value);

  const onAddTask = () => {
    console.log("add task");
    dispatch(taskAdded(jobId, task));
    setTask("");
  };

  const handleSubmit = () => {
    toast({
      title: "Task added",
      description: task,
      status: "success",
      duration: 1500,
      isClosable: true,
    });
    onAddTask();
  };

  return (
    <>
      <DisplayTasks jobTasks={jobTasks} />
      <HStack width="sm" marginX="auto">
        <FormControl>
          <Input
            type="text"
            id="task"
            name="task"
            value={task}
            onChange={onTaskChanged}
          />
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="pink" rounded="lg">
          ADD TASK
        </Button>
      </HStack>
    </>
  );
};

export default TaskComponent;
