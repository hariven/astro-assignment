import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import FavouriteCard from "./FavouriteCard";
const FavouritePage = ({ favouriteList }) => {
    //   const { favouriteList } = useChannelStore(); // Get favouriteList from the store
    const onRedirect = (id) => {
        console.log(`Redirecting to channel with id: ${id}`);
        // Perform redirect logic here
    };
    console.log(favouriteList, 'favouriteList2');
    return (_jsx(Box, { minH: { base: 'calc(100vh - 220px)', md: 'calc(100vh - 180px)' }, children: isEmpty(favouriteList) ? (_jsxs(Stack, { justify: "center", align: "center", flexDir: "column", spacing: 3, children: [_jsx(Text, { children: "No favourite channel at this moment" }), _jsx(Button, { onClick: () => { }, children: "Go to home" })] })) : (_jsxs(Box, { children: [_jsx(Heading, { children: "Favourite List" }), _jsx(SimpleGrid, { columns: [1, 1, 2, 3, 3, 3], gap: 5, mt: 10, children: favouriteList.map((channel) => (_jsx(FavouriteCard, { channel: channel, onRedirect: onRedirect, onDelete: (channel) => console.log(`Deleting channel with id: ${channel.id}`) }, channel.id))) })] })) }));
};
export default FavouritePage;
