import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, SimpleGrid, Heading, Flex, HStack, Input, IconButton, useDisclosure, Button, Collapse, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChannelCard from "../_components/ChannelCard";
import Header from "../_components/Layouts/Header";
import { CheckCircleIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { AiOutlineFilter, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { BsSortNumericDown, BsSortNumericUpAlt } from "react-icons/bs";
import useChannelStore, { sortSequence } from "../store/store";
import { debounce, isEmpty } from "lodash";
import FilterSection from "../_components/FilterComponent";
export const HomePage = () => {
    const { channelList, favouriteList, toggleFavourite, sortNumber, sortName, getAllChannel, 
    // getSelectedChannel,
    toggleSortNumber, toggleSortName, loadFavourites,
    // resetSelectedChannel,
     } = useChannelStore() || {};
    useEffect(() => {
        // Fetch all channels when the component mounts
        getAllChannel();
    }, [getAllChannel]);
    const [filters, setFilters] = useState({
        isHd: false,
        category: undefined,
        language: undefined,
    });
    const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();
    const { isOpen: isSearchOpen, onToggle: onSearchToggle, onClose: onSearchClose, } = useDisclosure();
    const [searchTerm, setSearchTerm] = useState("");
    // console.log(channelList, 'channelList')
    // Fetch filtered channel data
    const filteredData = useMemo(() => {
        if (!isFilterOpen && !searchTerm)
            return channelList;
        if (searchTerm) {
            return channelList.filter((channel) => channel.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        const { isHd, category, language } = filters;
        return channelList.filter((channel) => (!isHd || channel.isHd === isHd) &&
            (!category || channel.category === category) &&
            (!language || channel.language === language));
    }, [channelList, filters, isFilterOpen, searchTerm]);
    useEffect(() => {
        // Load favourites from localStorage when the component mounts
        loadFavourites();
    }, [loadFavourites]);
    // Handle adding/removing from favourites
    const handleFavourite = useCallback((channel) => {
        toggleFavourite(channel);
    }, [toggleFavourite]);
    const handleRedirect = useCallback((id) => {
        console.log("Redirect to channel:", id);
    }, []);
    const handleSearchChange = debounce((value) => {
        setSearchTerm(value);
    }, 300);
    console.log(isEmpty(filteredData), 'filteredData');
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs(Flex, { w: "90%", mx: "auto", justify: { base: "start", md: "space-between" }, flexDir: { base: "column", md: "row" }, mt: 2, children: [_jsx(Heading, { children: "Channels" }), isSearchOpen ? (_jsxs(HStack, { mt: { base: 3, md: 0 }, children: [_jsx(Input, { w: "300px", placeholder: "Type your keyword", value: searchTerm, onChange: (e) => handleSearchChange(e.target.value) }), _jsx(IconButton, { icon: _jsx(CloseIcon, {}), onClick: () => {
                                    setSearchTerm("");
                                    onSearchClose();
                                }, "aria-label": "" })] })) : (_jsxs(HStack, { mt: { base: 3, md: 0 }, children: [_jsx(IconButton, { icon: _jsx(Search2Icon, {}), onClick: onSearchToggle, "aria-label": "" }), _jsx(IconButton, { onClick: toggleSortName, icon: sortName === sortSequence.ascending ? (_jsx(AiOutlineSortAscending, {})) : (_jsx(AiOutlineSortDescending, {})), "aria-label": "" }), _jsx(IconButton, { onClick: toggleSortNumber, icon: sortNumber === sortSequence.ascending ? (_jsx(BsSortNumericDown, {})) : (_jsx(BsSortNumericUpAlt, {})), "aria-label": "" }), _jsx(Button, { leftIcon: _jsx(AiOutlineFilter, {}), rightIcon: isFilterOpen ? _jsx(CheckCircleIcon, {}) : undefined, onClick: onFilterToggle, children: "Filter" })] }))] }), _jsxs(Box, { width: "90%", mx: "auto", display: "flex", flexWrap: "wrap", justifyContent: "center", minH: { base: "calc(100vh - 220px)", md: "calc(100vh - 180px)" }, children: [isFilterOpen && (_jsxs(Box, { width: "100%", mb: 3, children: [" ", _jsx(Collapse, { in: isFilterOpen, animateOpacity: true, children: _jsx(FilterSection, { filters: filters, setFilters: setFilters }) })] })), isEmpty(filteredData) ? (_jsx(Flex, { justify: "center", align: "center", flexDir: "column", children: _jsx(Text, { children: "Loading ..." }) })) : (_jsx(SimpleGrid, { columns: [1, 1, 2, 3, 3, 3], gap: 5, mt: 10, children: filteredData?.map((channel) => (_jsx(ChannelCard, { channel: channel, favouriteList: favouriteList, onRedirect: handleRedirect, onFavourite: handleFavourite }, channel.id))) }))] })] }));
};
export default HomePage;
