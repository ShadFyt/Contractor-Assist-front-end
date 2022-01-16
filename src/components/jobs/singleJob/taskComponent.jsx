import React, { useState } from "react";
import {useGetTasksByJobQuery, useAddNewTaskMutation, useUpdateTaskMutation} from "../../../features/api/apiSlice"

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
  Spinner,
} from "@chakra-ui/react";

import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

import DeleteTask from "./deleteTask";

const DisplayTasks = ({ jobId }) => {
  const completiontoast = useToast();
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTasksByJobQuery(jobId)

  const [updateTask, {isLoading: isUpdating}] = useUpdateTaskMutation()

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

  const onEditClick = async (taskId, editTask) => {
    console.log("from onEdit", editTask);
    if(editTask){
      console.log(editTask)
      await updateTask({taskId, task: editTask})
    }
  };

  const onComplete = async (taskId, isComplete, task) => {
    await updateTask({ taskId, task, isComplete: !isComplete });
    completiontoast({
      title: !isComplete ? "Task completed" : "Task not completed",
      description: task,
      status: !isComplete ? "success" : "warning",
      duration: 4000,
      isClosable: true,
    });
  };
  
  const ListTasks = ({task}) => {
    const [editTask, setEditTask] = useState(task.task);

    const onTaskChanged = (e) => setEditTask(e);

    return (
      <HStack marginBottom={2}>
          <Text marginLeft={2} fontSize="xl">
            <Editable
              value={editTask}
              isPreviewFocusable={false}
              onChange={onTaskChanged}
              onSubmit={() => onEditClick(task.id, editTask)}
            >
              <HStack>
                <EditableControls />
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
              onComplete(task.id, task.isComplete, task.task)
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
    )
  }

  let content = ""

  if(isLoading){
    content = <Spinner />
  } else if(isSuccess){
    console.log(tasks);
    content = tasks.map((task) => ( <ListTasks key={task.id} task={task} />));
  } else if(isError) {
    content = <div>{error.toString()}</div>
  }


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
      <Box>{content}</Box>
   </VStack>
  );
};

const TaskComponent = ({ jobId }) => {
  const toast = useToast();

  const [task, setTask] = useState("");
  const onTaskChanged = (e) => setTask(e.target.value);

  const [addNewTask, {isLoading}] = useAddNewTaskMutation()

  const canSave = [task].every(Boolean) && !isLoading;
  const onSaveTask = async () => {
    if(canSave) {
      try {
        console.log("adding new task")
        await addNewTask({
          task,
          jobId
        }).unwrap();
        setTask("");
      } catch(err) {
        console.log("failed to save new task", err)
      }
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Task added",
      description: task,
      status: "success",
      duration: 1500,
      isClosable: true,
    });
    onSaveTask();
  };

  return (
    <>
      <DisplayTasks jobId={jobId} />
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
