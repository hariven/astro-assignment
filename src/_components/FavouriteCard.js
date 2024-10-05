import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Box, Center, Divider, Flex, HStack, IconButton, Image, Text, useColorModeValue, } from "@chakra-ui/react";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { BiMoviePlay } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
const FavouriteCard = ({ channel, onRedirect, onDelete, }) => {
    const { id, title, isHd, stbNumber, imageUrl, isAstroGoExclusive, currentSchedule, } = channel || {};
    return (_jsxs("div", { onClick: () => onRedirect(Number(id)), children: [_jsxs(Flex, { justify: "space-between", align: "center", children: [_jsxs(Flex, { flexDir: "row", align: "center", children: [_jsx(Center, { w: "70px", h: "60px", mr: 4, backgroundColor: useColorModeValue("white", "gray.700"), borderRadius: "8px", p: 2, children: _jsx(Image, { src: imageUrl, alt: id.toString(), fallback: _jsx(BiMoviePlay, { size: 25 }) }) }), _jsxs(Box, { children: [_jsx(Text, { fontSize: "12px", children: `CH ${stbNumber}` }), _jsx(Text, { fontWeight: "600", fontSize: "13px", children: title })] })] }), _jsx(IconButton, { rounded: "full", icon: _jsx(AiFillStar, { color: "#FFBF00" }), onClick: (e) => {
                            e.stopPropagation();
                            onDelete(channel);
                        }, "aria-label": "" })] }), _jsxs(HStack, { my: 2, children: [isAstroGoExclusive && _jsx(Badge, { colorScheme: "green", children: "Astro Go Exclusive" }), isHd && _jsx(Badge, { colorScheme: "blue", children: "HD" })] }), _jsx(Divider, { color: "gray.400", my: 2 }), !isEmpty(currentSchedule) ? (currentSchedule.map((schedule) => {
                const isHappening = dayjs().diff(schedule.datetime, "m") >= 0;
                return (_jsxs(HStack, { spacing: 2, fontWeight: isHappening ? "bold" : "normal", children: [_jsx(Text, { fontSize: "12px", children: isHappening
                                ? "On Now"
                                : dayjs(schedule.datetime).format("hh:mm A") }), _jsx(Text, { fontSize: "12px", noOfLines: 1, children: schedule.title })] }, schedule.eventId));
            })) : (_jsx(Flex, { justifyContent: "center", align: "center", children: _jsx(Text, { fontSize: "12px", fontWeight: "500", children: "No Schedule at this moment." }) }))] }));
};
export default FavouriteCard;
