import { Box, SimpleGrid, Heading, Flex, HStack, Input, IconButton, useDisclosure, Button, Collapse, Text } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import ChannelCard from "../_components/ChannelCard";
import Header from "../_components/Layouts/Header";
import { CheckCircleIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { AiOutlineFilter, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { BsSortNumericDown, BsSortNumericUpAlt } from "react-icons/bs";
import useChannelStore, { sortSequence } from "../store/store";
import { debounce, isEmpty } from "lodash";
import FilterSection from "../_components/FilterComponent";
// import { set } from "lodash";

interface Channel {
  id: string;
  title: string;
  description?: string;
  isHd?: boolean;
  stbNumber: number; // Make stbNumber required
  language?: string;
  category?: string;
  imageUrl?: string;
  isAstroGoExclusive?: boolean;
  filters?: string[];
  detailUrl?: string;
  currentSchedule?: { eventId: string; datetime: string; title: string }[];
}

interface ChannelProps {
  channel: Channel;
  favouriteList: Channel[];
  onRedirect: (id: string) => void;
  onFavourite: (channel: Channel) => void;
}

export const HomePage: FC<ChannelProps> = () => {
  
  const {
    channelList,
    favouriteList,
    toggleFavourite,
    sortNumber,
    sortName,
    getAllChannel,
    // getSelectedChannel,
    toggleSortNumber,
    toggleSortName,
    loadFavourites,
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
  })
  const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onToggle: onSearchToggle,
    onClose: onSearchClose,
  } = useDisclosure();
    const [searchTerm, setSearchTerm] = useState("")

    // console.log(channelList, 'channelList')
  // Fetch filtered channel data
  const filteredData = useMemo(() => {
  if (!isFilterOpen && !searchTerm) return channelList;

  if (searchTerm) {
    return channelList.filter((channel: { title: string; }) =>
      channel.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const { isHd, category, language } = filters;

    return channelList.filter(
      (channel) =>
        (!isHd || channel.isHd === isHd) &&
        (!category || channel.category === category) &&
        (!language || channel.language === language)
    );
  }, [channelList, filters, isFilterOpen, searchTerm]);

  useEffect(() => {
    // Load favourites from localStorage when the component mounts
    loadFavourites();
  }, [loadFavourites])

  // Handle adding/removing from favourites
  const handleFavourite = useCallback(
    (channel: Channel) => {
      toggleFavourite(channel);
    },
    [toggleFavourite]
  );

  const handleRedirect = useCallback((id: string) => {
    console.log("Redirect to channel:", id);
  }, []);

  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  console.log(isEmpty(filteredData), 'filteredData')

  return (
    <>
      <Header />
      <Flex
      w={"90%"}
      mx={"auto"}
        justify={{ base: "start", md: "space-between" }}
        flexDir={{ base: "column", md: "row" }}
        mt={2}
      >
        <Heading>Channels</Heading>
        {isSearchOpen ? (
          <HStack mt={{ base: 3, md: 0 }}>
            <Input
              w="300px"
              placeholder="Type your keyword"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <IconButton
              icon={<CloseIcon />}
              onClick={() => {
                setSearchTerm("");
                onSearchClose();
              } } aria-label={""}            
              />
          </HStack>
        ) : (
          <HStack mt={{ base: 3, md: 0 }}>
            <IconButton icon={<Search2Icon />} onClick={onSearchToggle} aria-label={""} />
            <IconButton
            onClick={toggleSortName}
                icon={sortName === sortSequence.ascending ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )} aria-label={""}              // onClick={() => {
              //   dispatch.channelModel.toggleSortName();
              // }}
            />
            <IconButton
            onClick={toggleSortNumber}
                icon={sortNumber === sortSequence.ascending ? (
                  <BsSortNumericDown />
                ) : (
                  <BsSortNumericUpAlt />
                )} aria-label={""}              // onClick={() => dispatch.channelModel.toggleSortNumber()}
            />
            <Button
              leftIcon={<AiOutlineFilter />}
              rightIcon={isFilterOpen ? <CheckCircleIcon /> : undefined}
              onClick={onFilterToggle}
            >
              Filter
            </Button>
          </HStack>
        )}
      </Flex>
      {/* </SimpleGrid> */}
      <Box
      width={"90%"}
      mx={"auto"}
        display={"flex"}
        flexWrap="wrap"
        justifyContent="center"
        minH={{ base: "calc(100vh - 220px)", md: "calc(100vh - 180px)" }}
      >

{isFilterOpen && (
    <Box width="100%" mb={3}> {/* New Box to isolate the FilterSection */}
      <Collapse in={isFilterOpen} animateOpacity>
        <FilterSection filters={filters} setFilters={setFilters} />
      </Collapse>
    </Box>
  )}
      
      {isEmpty(filteredData) ? (
        <Flex
          justify="center"
          align="center"
          flexDir="column"
          // h={{ base: "calc(100vh - 350px)", md: "calc(100vh - 290px)" }}
        >
          <Text>Loading ...</Text>
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3, 3, 3]} gap={5} mt={10}>
          {filteredData?.map((channel) => (
            <ChannelCard
              channel={channel}
              favouriteList={favouriteList}
              key={channel.id}
              onRedirect={handleRedirect}
              onFavourite={handleFavourite}
            />
          ))}
        </SimpleGrid>
      )}

      </Box>
    </>
  );
};

export default HomePage;

