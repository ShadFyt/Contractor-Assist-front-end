import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  taskAdded,
  taskEdited,
  taskIsCompleteUpdate,
} from "../../../features/job/jobSlice";

import {
  Button,
  Box,
  FormControl,
  Input,
  VStack,
  HStack,
  Center,
  Text,
  Spacer,
  StackDivider,
  Heading,
  useToast,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

import DeleteTask from "./deleteTask";

const DisplayTasks = ({ jobTasks }) => {
  const dispatch = useDispatch();
  const [editTask, setEditTask] = useState("");
  const completiontoast = useToast();

  const onTaskChanged = (e) => setEditTask(e.target.value);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Box justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Box>
    );
  }

  const onEditClick = (jobId, taskId, editTask) => {
    console.log("from onEdit", editTask);
    dispatch(taskEdited({ jobId, taskId, value: editTask }));
  };

  const onComplete = (jobId, taskId, isComplete, task) => {
    console.log("from dispatch", isComplete.toString(), jobId, taskId);
    completiontoast({
      title: "Task completed",
      description: task,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
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
      divider={<StackDivider color="gray.300" />}
    >
      <Center>
        <Heading as="h3" fontSize="xl">
          Task to complete
        </Heading>
      </Center>
      {jobTasks.map((task) => (
        <HStack key={task.id}>
          <Text marginLeft={2} fontSize="xl">
            <Editable
              defaultValue={task.task}
              isPreviewFocusable={false}
              onSubmit={() => onEditClick(task.jobId, task.id, editTask)}
            >
              <HStack>
                <EditableControls task={task} />
                <EditablePreview
                  textDecoration={task.isComplete ? "line-through" : "none"}
                />
                <EditableInput onChange={onTaskChanged} />
              </HStack>
            </Editable>
          </Text>
          <Spacer />
          <IconButton
            onClick={() =>
              onComplete(task.jobId, task.id, task.isComplete, task.task)
            }
            icon={
              task.isComplete ? (
                <GiCancel />
              ) : (
                <FaCheck colorScheme="green" color="green" fontSize="25px" />
              )
            }
          />
          <DeleteTask jobId={task.jobId} taskId={task.id} colorScheme="red" />
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
            boxShadow="dark-lg"
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
