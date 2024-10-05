import { create } from 'zustand';
import { sortBy } from "lodash";
import { createStandaloneToast } from "@chakra-ui/react";
const apiUrl = import.meta.env.VITE_API_KEY;
const { toast } = createStandaloneToast();
export const sortSequence = {
    ascending: "ascending",
    desending: "descending",
};
const useChannelStore = create((set, get) => ({
    // Initial state
    channelList: [],
    favouriteList: [],
    selectedChannel: undefined,
    sortNumber: sortSequence.ascending,
    sortName: sortSequence.ascending,
    // Synchronous actions (reducers)
    updateChannelList: (channelList) => set({ channelList }),
    loadFavourites: () => {
        const storedFavourites = localStorage.getItem("favouriteChannels");
        if (storedFavourites) {
            set({ favouriteList: JSON.parse(storedFavourites) });
        }
    },
    // Toggle the favourite status of a channel and persist it to localStorage
    toggleFavourite: (channel) => {
        set((state) => {
            const isFavourite = state.favouriteList.some((favourite) => favourite.id === channel.id);
            let updatedFavouriteList;
            if (isFavourite) {
                // Remove from favourites
                updatedFavouriteList = state.favouriteList.filter((favourite) => favourite.id !== channel.id);
            }
            else {
                // Add to favourites
                updatedFavouriteList = [...state.favouriteList, channel];
            }
            // Save the updated list to localStorage
            localStorage.setItem("favouriteChannels", JSON.stringify(updatedFavouriteList));
            return { favouriteList: updatedFavouriteList };
        });
    },
    addFavourite: (channel) => set((state) => ({
        favouriteList: [...state.favouriteList, channel],
    })),
    removeFavourite: (channelId) => set((state) => ({
        favouriteList: state.favouriteList.filter((fav) => fav.id !== channelId),
    })),
    deleteFavourite: (id) => {
        const { favouriteList } = get();
        const newList = favouriteList.filter((item) => item.id !== id);
        set({ favouriteList: newList });
        toast({
            title: "Removed from Favourites",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    },
    toggleSortNumber: () => {
        const { channelList, sortNumber } = get();
        const seq = sortNumber === sortSequence.ascending
            ? sortSequence.desending
            : sortSequence.ascending;
        const sortedChannelList = sortNumber === sortSequence.ascending
            ? sortBy(channelList, "stbNumber").reverse()
            : sortBy(channelList, "stbNumber");
        set({ channelList: sortedChannelList, sortNumber: seq });
    },
    toggleSortName: () => {
        const { channelList, sortName } = get();
        const seq = sortName === sortSequence.ascending
            ? sortSequence.desending
            : sortSequence.ascending;
        const sortedChannelList = sortName === sortSequence.ascending
            ? sortBy(channelList, "title").reverse()
            : sortBy(channelList, "title");
        set({ channelList: sortedChannelList, sortName: seq });
    },
    updateSelectedChannel: (selectedChannel) => set({ selectedChannel }),
    resetSelectedChannel: () => set({ selectedChannel: undefined }),
    // Asynchronous actions (effects)
    getAllChannel: async () => {
        try {
            const res = await fetch(`${apiUrl}/channel/all.json`);
            const status = res.status;
            const data = await res.json();
            if (status === 200) {
                const { response } = data || {};
                if (response) {
                    get().updateChannelList(response);
                }
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch channels",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    },
    getSelectedChannel: async (id) => {
        try {
            const res = await fetch(`${apiUrl}/channel/${id}.json`);
            const status = res.status;
            const data = await res.json();
            if (status === 200) {
                const { response } = data || {};
                if (response) {
                    get().updateSelectedChannel(response);
                }
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch selected channel",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    },
}));
export default useChannelStore;
