import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, HStack, useDisclosure, IconButton, Link, Image, useColorMode, useColorModeValue, } from "@chakra-ui/react";
// import logo from "./../../assets/astro-logo.png";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
const Header = ({ ...headerProps }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    return (_jsx(Box, { sx: {
            position: "-webkit-sticky",
            top: "0",
            zIndex: "99",
        }, py: 2, px: 10, backgroundColor: useColorModeValue("blackAlpha.100", "blackAlpha.500"), backdropFilter: "saturate(180%) blur(5px)", w: "100%", pos: 'fixed', ...headerProps, children: _jsxs(Flex, { h: 16, alignItems: "center", justifyContent: "space-between", mx: "auto", maxW: "container.lg", py: 5, children: [_jsx(HStack, { as: Link, spacing: 4, alignItems: "center", href: "/", _hover: { textDecoration: "none" }, children: _jsx(Box, { w: "100px", h: "50px", children: _jsx(Image, { src: "/astro-logo.png", alt: "logo" }) }) }), _jsx(HStack, { as: "nav", spacing: "4", display: { base: "none", md: "flex" }, children: _jsx(IconButton, { icon: colorMode === "light" ? _jsx(SunIcon, {}) : _jsx(MoonIcon, {}), onClick: toggleColorMode, "aria-label": "" }) }), _jsxs(HStack, { display: { base: "inherit", md: "none" }, spacing: 3, children: [_jsx(IconButton, { size: "md", icon: isOpen ? _jsx(CloseIcon, {}) : _jsx(HamburgerIcon, {}), "aria-label": "Open Menu", onClick: isOpen ? onClose : onOpen }), _jsx(IconButton, { icon: colorMode === "light" ? _jsx(SunIcon, {}) : _jsx(MoonIcon, {}), onClick: toggleColorMode, "aria-label": "" })] })] }) }));
};
export default Header;
