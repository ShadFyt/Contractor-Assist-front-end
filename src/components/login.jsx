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
  const [getToken, { data, isSuccess }] = useGetTokenMutation();

  const onSubmit = async () => {
    getToken({ username: "admin", password: "string" });
  };
  if (isSuccess) {
    localStorage.setItem("token", data.access_token);
    console.log("saving token", data);
  }
  return <Button onClick={onSubmit}>GET TOKEN</Button>;
};

export default Login;
