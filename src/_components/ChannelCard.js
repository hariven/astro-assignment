import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import dayjs from 'dayjs';
import { Box, Flex, Center, Image, Text, HStack, Badge, Divider, IconButton, useColorModeValue } from '@chakra-ui/react';
import { BiMoviePlay } from 'react-icons/bi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { isEmpty } from "lodash";
const ChannelCard = memo(({ channel, favouriteList, onRedirect, onFavourite }) => {
    const { id, title, isHd, stbNumber, imageUrl, isAstroGoExclusive, currentSchedule, } = channel || {};
    const isFavourite = favouriteList?.some(item => item.id === id);
    console.log('favouriteList', favouriteList);
    return (
    // <Link to={`/channel/${id}`}>
    _jsxs(Box, { display: "flex", flexDirection: "column", width: "300px" // Set a fixed width
        , 
        // height="200px" // Set a fixed height
        borderWidth: "1px", borderRadius: "lg", overflow: "hidden", boxShadow: "lg", bg: "gray.100", mr: 5, mb: 4, _hover: {
            transform: "scale(1.05)", // Slightly enlarge the card on hover
            boxShadow: "xl", // Add a bigger shadow
            cursor: "pointer", // Change the cursor to pointer
        }, p: 4, cursor: "pointer", backgroundColor: useColorModeValue("white", "#2d3137"), children: [_jsxs(Flex, { justify: "space-between", align: "center", height: "100%", children: [_jsxs(Flex, { flexDir: "column", flex: "1", justifyContent: "center", children: [_jsx(Center, { w: "70px", h: "60px", mr: 4, backgroundColor: useColorModeValue("white", "gray.700"), borderRadius: "8px", children: _jsx(Image, { src: imageUrl, alt: id?.toString(), fallback: _jsx(BiMoviePlay, { size: 25 }), loading: "lazy" }) }), _jsxs(Box, { mt: 2, children: [_jsx(Text, { fontSize: "12px", children: `CH ${stbNumber}` }), _jsx(Text, { fontWeight: "600", fontSize: "13px", noOfLines: 1, children: title })] })] }), _jsx(IconButton, { rounded: "full", icon: isFavourite ? _jsx(AiFillStar, { color: '#FFBF00' }) : _jsx(AiOutlineStar, {}), onClick: (e) => {
                            e.preventDefault(); // Prevent Link navigation
                            e.stopPropagation(); // Prevent event bubbling
                            onFavourite(channel);
                        }, "aria-label": "" })] }), _jsxs(HStack, { my: 2, children: [isAstroGoExclusive && (_jsx(Badge, { colorScheme: "green", children: "Astro Go Exclusive" })), isHd && _jsx(Badge, { colorScheme: "blue", children: "HD" })] }), _jsx(Divider, { color: "gray.400", my: 2 }), _jsx(Flex, { flexDir: "column", flex: "1", justifyContent: "flex-end", children: !isEmpty(currentSchedule) ? (currentSchedule?.map((schedule) => {
                    const isHappening = dayjs().diff(schedule.datetime, "m") >= 0;
                    return (_jsxs(HStack, { spacing: 2, fontWeight: isHappening ? "bold" : "normal", children: [_jsx(Text, { fontSize: "12px", flexShrink: "0", children: isHappening
                                    ? "On Now"
                                    : dayjs(schedule.datetime).format("hh:mm A") }), _jsx(Text, { fontSize: "12px", noOfLines: 1, children: schedule.title })] }, schedule.eventId));
                })) : (_jsx(Flex, { justifyContent: "center", align: "center", children: _jsx(Text, { fontSize: "12px", fontWeight: "500", children: "No Schedule at this moment." }) })) })] })
    // </Link>
    );
});
export default ChannelCard;
