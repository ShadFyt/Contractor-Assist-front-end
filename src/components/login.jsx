import React, { useState } from "react";
import {
  HStack,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";

import { useGetTokenMutation } from "../features/api/apiSlice";

const Login = () => {
  const [getToken, { isLoading }] = useGetTokenMutation();

  const onSubmit = async () => {
    getToken({
      username: "johndoe",
      password: "secret",
    });
  };
  return <Button onClick={onSubmit}>GET TOKEN</Button>;
};

export default Login;
