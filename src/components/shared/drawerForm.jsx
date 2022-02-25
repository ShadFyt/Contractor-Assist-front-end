import React, { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export const RenderDrawerForm = ({ Form }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const childRef = useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Register
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Register employee</DrawerHeader>

          <DrawerBody>
            <Form ref={childRef} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                childRef.current.handleSubmit();
                onClose();
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
