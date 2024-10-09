import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  IconButton,
  Link,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// import logo from "./../../assets/astro-logo.png";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Header = ({...headerProps}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      sx={{
        position: "-webkit-sticky",
        top: "0",
        zIndex: "99",
      }}
      py={2}
      px={10}
      backgroundColor={useColorModeValue("blackAlpha.100", "blackAlpha.500")}
      w="100%"
      pos='fixed'
      {...headerProps}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx="auto"
        maxW={"container.lg"}
        py={5}
      >
        <HStack
          as={Link}
          spacing={4}
          alignItems={"center"}
          href="/"
          _hover={{ textDecoration: "none" }}
        >
          <Box w="100px" h="50px">
            <Image src="/astro-logo.png" alt="logo" />
          </Box>
        </HStack>

        {/* LARGE SCREEN */}
        <HStack as="nav" spacing="4" display={{ base: "none", md: "flex" }}>
          <IconButton
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode} aria-label={""}          />
        </HStack>

        {/* BASE SCREEN */}
        <HStack display={{ base: "inherit", md: "none" }} spacing={3}>
          <IconButton
            size={"md"}
            // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            onClick={isOpen ? onClose : onOpen}
          />
          <IconButton
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode} aria-label={""}          
            />
        </HStack>
      </Flex>

    </Box>
  );
};

export default Header;