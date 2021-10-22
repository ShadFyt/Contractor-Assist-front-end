import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { GoHome, GoTools } from "react-icons/go";
import { GrUserWorker } from "react-icons/gr";
import {
  AiOutlineContacts,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";

const LinkItemsTop = [
  { name: "Home", icon: GoHome },
  { name: "Employees", icon: GrUserWorker },
  { name: "Jobs", icon: AiOutlineContacts },
  { name: "Equipment", icon: GoTools },
];

const LinkItemsBottom = [
  { name: "Settings", icon: AiFillSetting },
  { name: "Logout", icon: AiOutlineLogout },
];

const Content = ({ onClose, items, ...rest }) => {
  return (
    <Box
      bg={"gray.200"}
      borderRight="2px"
      borderRightColor={"gray.900"}
      h="full"
      w={{ base: "full", md: 60 }}
      pos="fixed"
    >
      <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {items.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {" "}
          {link.name}{" "}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && <Icon mr="3" fontSize="14" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="gray.300">
      <Content
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        items={LinkItemsTop}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Content onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
