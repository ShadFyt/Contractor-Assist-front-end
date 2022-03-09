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
  const [getToken, { isLoading, data }] = useGetTokenMutation();

  const onSubmit = async () => {
    getToken({
      username: "johndoe",
      password: "secret",
    });
    if (data) {
      localStorage.setItem("token", data.access_token);
    }
    console.log(localStorage.getItem("token"));
  };
  return <Button onClick={onSubmit}>GET TOKEN</Button>;
};

export default Login;
