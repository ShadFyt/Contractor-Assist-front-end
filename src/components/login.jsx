import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
} from "@chakra-ui/react";
import { FaRegUser, FaLock } from "react-icons/fa";

import { useGetTokenMutation } from "../features/api/apiSlice";

const Login = () => {
  const [getToken, { data, isSuccess }] = useGetTokenMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleShowClick = () => setShowPassword(!showPassword);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onSubmit = async () => {
    getToken({ username: username, password: password });
    setPassword("");
    setUsername("");
  };
  if (isSuccess) {
    localStorage.setItem("token", data.access_token);
    console.log("saving token", data);
    <Redirect to="/home" />;
  }
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
      </Stack>
    </Flex>
  );
};

export default Login;
