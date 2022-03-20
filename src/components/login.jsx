import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Text,
} from "@chakra-ui/react";
import { FaRegUser, FaLock } from "react-icons/fa";

import { useGetTokenMutation } from "../features/api/apiSlice";

const Login = ({ setIsAuth }) => {
  let history = useHistory();
  const [getToken, { data, isSuccess, isLoading, isError, error }] =
    useGetTokenMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleShowClick = () => setShowPassword(!showPassword);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onSubmit = async () => {
    await getToken({ username: username, password: password })
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        localStorage.setItem("token", payload.access_token);
        setIsAuth(true);
        history.push("/");
        setPassword("");
        setUsername("");
      })
      .catch((error) => console.log("rejected ", error));
  };

  return (
    <Flex
      flexDirection={"column"}
      width={"100wh"}
      height={"100vh"}
      backgroundColor={"gray.300"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        flexDir={"column"}
        mb={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Avatar
          bg="cyan.800"
          icon={<FaRegUser fontSize={"2rem"} color="white" />}
        />
        <Heading color={"cyan.800"}>Welcome</Heading>
        <Box minW={{ base: "90%", md: "460px" }}>
          <form>
            <Stack
              spacing={4}
              p={"1rem"}
              backgroundColor={"whiteAlpha.900"}
              boxShadow={"inner"}
              borderRadius="lg"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<FaRegUser color="gray" />}
                  />
                  <Input
                    type={"text"}
                    id="username"
                    value={username}
                    onChange={onUsernameChanged}
                    placeholder={"Username"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<FaLock color="gray" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={onPasswordChanged}
                    placeholder={"Password"}
                  />
                  <InputRightElement width={"4rem"}>
                    <Button
                      h="1.75rem"
                      size="sm"
                      backgroundColor={"gray.300"}
                      onClick={handleShowClick}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
          </form>
        </Box>
        <Popover defaultIsOpen={true} isOpen={true}>
          <PopoverTrigger>
            <Button
              onClick={onSubmit}
              variant={"solid"}
              colorScheme={"cyan"}
              backgroundColor={"cyan.800"}
              color={"white"}
              width={"full"}
              _hover={{ background: "cyan.700" }}
            >
              Login
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Login with demo credentials!</PopoverHeader>
            <PopoverBody>
              <Text>Username: demo</Text>
              <Text>Password: password</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
    </Flex>
  );
};

export default Login;
