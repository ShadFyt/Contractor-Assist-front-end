import React from "react";
import { Link as ReactLink } from "react-router-dom";

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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import { GoHome, GoTools } from "react-icons/go";
import { GrUserWorker } from "react-icons/gr";
import {
  AiOutlineContacts,
  AiFillSetting,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
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

const Content = ({ onClose, items_top, items_bottom, ...rest }) => {
  return (
    <Box
      bg={"gray.200"}
      borderRight="2px"
      borderRightColor={"gray.900"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack h="90%" justify="space-between">
        <Box>
          {" "}
          {items_top.map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              navLink={link.name.toLowerCase()}
            >
              {" "}
              {link.name}{" "}
            </NavItem>
          ))}
        </Box>
        <Box>
          {" "}
          {items_bottom.map((link) => (
            <NavItem key={link.name} icon={link.icon} navLink="#">
              {" "}
              {link.name}{" "}
            </NavItem>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, children, navLink, ...rest }) => {
  return (
    <Link as={ReactLink} to={`/${navLink}`} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.600",
          color: "white",
        }}
        {...rest}
      >
        {icon && <Icon mr="3" fontSize="20" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={"gray.100"}>
      <Content
        items_top={LinkItemsTop}
        items_bottom={LinkItemsBottom}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
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
          <Content
            items_top={LinkItemsTop}
            items_bottom={LinkItemsBottom}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

// add mobile version

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={"white"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<AiOutlineMenuUnfold />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

export default Sidebar;
