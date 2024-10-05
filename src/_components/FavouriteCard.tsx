import {
    Badge,
    Box,
    Center,
    Divider,
    Flex,
    HStack,
    IconButton,
    Image,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import dayjs from "dayjs";
  import React from "react";
  import { isEmpty } from "lodash";
  import { BiMoviePlay } from "react-icons/bi";
  import { AiFillStar } from "react-icons/ai";
  
  // Define types for the channel's schedule and main channel props
  interface Schedule {
    eventId: string;
    datetime: string;
    title: string;
  }
  
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
    currentSchedule?: Schedule[];
  }
  
  interface FavouriteCardProps {
    channel: Channel;
    onRedirect: (id: number) => void;
    onDelete: (channel: Channel) => void;
  }
  
  const FavouriteCard: React.FC<FavouriteCardProps> = ({
    channel,
    onRedirect,
    onDelete,
  }) => {
    const {
      id,
      title,
      isHd,
      stbNumber,
      imageUrl,
      isAstroGoExclusive,
      currentSchedule,
    } = channel || {};
  
    return (
      <div
        onClick={() => onRedirect(Number(id))}
      >
        <Flex justify="space-between" align="center">
          <Flex flexDir={"row"} align="center">
            <Center
              w="70px"
              h="60px"
              mr={4}
              backgroundColor={useColorModeValue("white", "gray.700")}
              borderRadius="8px"
              p={2}
            >
              <Image src={imageUrl} alt={id.toString()} fallback={<BiMoviePlay size={25} />} />
            </Center>
  
            <Box>
              <Text fontSize="12px">{`CH ${stbNumber}`}</Text>
              <Text fontWeight="600" fontSize="13px">
                {title}
              </Text>
            </Box>
          </Flex>
  
          <IconButton
                    rounded="full"
                    icon={<AiFillStar color="#FFBF00" />}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(channel);
                    } } aria-label={""}          
                    />
        </Flex>
  
        <HStack my={2}>
          {isAstroGoExclusive && <Badge colorScheme="green">Astro Go Exclusive</Badge>}
          {isHd && <Badge colorScheme="blue">HD</Badge>}
        </HStack>
  
        <Divider color={"gray.400"} my={2} />
  
        {!isEmpty(currentSchedule) ? (
          currentSchedule.map((schedule) => {
            const isHappening = dayjs().diff(schedule.datetime, "m") >= 0;
            return (
              <HStack
                key={schedule.eventId}
                spacing={2}
                fontWeight={isHappening ? "bold" : "normal"}
              >
                <Text fontSize="12px">
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
      </div>
    );
  };
  
  export default FavouriteCard;
  