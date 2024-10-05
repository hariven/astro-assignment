import { FC, memo } from 'react';
import dayjs from 'dayjs';
import { Box, Flex, Center, Image, Text, HStack, Badge, Divider, IconButton, useColorModeValue } from '@chakra-ui/react';
import { BiMoviePlay } from 'react-icons/bi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { isEmpty } from "lodash";
// import { useChannelCardStore } from './store';
// import { Channel } from './store'; // Import the Channel type

interface Channel {
  id?: string;
  title: string;
  description?: string;
  isHd?: boolean;
  stbNumber?: number;
  language?: string;
  category?: string;
  imageUrl?: string;
  isAstroGoExclusive?: boolean;
  filters?: string[];
  detailUrl?: string;
  currentSchedule?: { eventId: string; datetime: string; title: string }[];
}

interface ChannelCardProps {
  channel: Channel;
  favouriteList: Channel[];
  onRedirect: (id: string) => void;
  onFavourite: (channel: any) => void;
}

const ChannelCard: FC<ChannelCardProps> = memo(({ channel, favouriteList, onRedirect, onFavourite }) => {
  const {
    id,
    title,
    isHd,
    stbNumber,
    imageUrl,
    isAstroGoExclusive,
    currentSchedule,
  } = channel || {};

  const isFavourite = favouriteList?.some(item => item.id === id);

  // console.log('favouriteList', favouriteList);
  return (
    // <Link to={`/channel/${id}`}>
  <Box
    display={"flex"}
    flexDirection={"column"}
    width="300px" // Set a fixed width
    // height="200px" // Set a fixed height
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="lg"
    bg="gray.100"
    mr={5}
    mb={4}
    _hover={{
      transform: "scale(1.05)", // Slightly enlarge the card on hover
      boxShadow: "xl", // Add a bigger shadow
      cursor: "pointer", // Change the cursor to pointer
    }}
    p={4}
    cursor="pointer"
    backgroundColor={useColorModeValue("white", "#2d3137")}
  >
    <Flex justify="space-between" align="center" height="100%">
      <Flex flexDir={"column"} flex="1" justifyContent="center">
        <Center
          w="70px"
          h="60px"
          mr={4}
          backgroundColor={useColorModeValue("white", "gray.700")}
          borderRadius="8px"
          // p={2}
        >
          <Image
            src={imageUrl}
            alt={id?.toString()}
            fallback={<BiMoviePlay size={25} />}
            loading="lazy"
          />
        </Center>

        <Box mt={2}>
          <Text fontSize="12px">{`CH ${stbNumber}`}</Text>
          <Text fontWeight="600" fontSize="13px" noOfLines={1}>
            {title}
          </Text>
        </Box>
      </Flex>

      <IconButton
        rounded="full"
        icon={isFavourite ? <AiFillStar color='#FFBF00' /> : <AiOutlineStar />}
        onClick={(e) => {
          e.preventDefault(); // Prevent Link navigation
              e.stopPropagation(); // Prevent event bubbling
              onFavourite(channel);
        }}
        aria-label=""
      />
    </Flex>

    <HStack my={2}>
      {isAstroGoExclusive && (
        <Badge colorScheme="green">Astro Go Exclusive</Badge>
      )}
      {isHd && <Badge colorScheme="blue">HD</Badge>}
    </HStack>

    <Divider color={"gray.400"} my={2} />

    <Flex flexDir="column" flex="1" justifyContent="flex-end">
      {!isEmpty(currentSchedule) ? (
        currentSchedule?.map((schedule) => {
          const isHappening = dayjs().diff(schedule.datetime, "m") >= 0;
          return (
            <HStack
              key={schedule.eventId}
              spacing={2}
              fontWeight={isHappening ? "bold" : "normal"}
            >
              <Text fontSize="12px" flexShrink={"0"}>
                {isHappening
                  ? "On Now"
                  : dayjs(schedule.datetime).format("hh:mm A")}
              </Text>
              <Text fontSize="12px" noOfLines={1}>
                {schedule.title}
              </Text>
            </HStack>
          );
        })
      ) : (
        <Flex justifyContent="center" align="center">
          <Text fontSize="12px" fontWeight="500">
            No Schedule at this moment.
          </Text>
        </Flex>
      )}
    </Flex>
  </Box>
// </Link>

  );
});

export default ChannelCard;

