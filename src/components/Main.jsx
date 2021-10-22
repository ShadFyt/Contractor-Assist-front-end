import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import Sidebar from "./layout/Sidebar";

function MainComponent() {
  return (
    <Box>
      <Stack direction={{ base: "column", md: "row" }} spacing={0}>
        <Box
          minH={{ sm: "100px", md: "100vh" }}
          height={"100px"}
          w={{ base: "100%", md: "255px" }}
        >
          <Sidebar />
        </Box>
        <Box flex="1" bg={"blue"}>
          a
        </Box>
      </Stack>
    </Box>
  );
}

export default MainComponent;
<Flex columns={2}>
  <Box minH="100vh" w="250px">
    <Sidebar />
  </Box>
  <Box flex="1" bg={"antiquewhite"}></Box>
</Flex>;
