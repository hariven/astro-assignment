import { Box, Stack, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import FavouriteCard from "./FavouriteCard";
import { ChannelCardProps } from "../_components/ChannelCard" 

// interface Channel {
//     id?: string;
//     title: string;
//     description?: string;
//     isHd?: boolean;
//     stbNumber?: number;
//     language?: string;
//     category?: string;
//     imageUrl?: string;
//     isAstroGoExclusive?: boolean;
//     filters?: string[];
//     detailUrl?: string;
//     currentSchedule?: { eventId: string; datetime: string; title: string }[];
//   }

// interface ChannelCardProps {
//     channel: Channel;
//     favouriteList: Channel[];
//     onRedirect: (id: string) => void;
//     onFavourite: (channel: any) => void;
//   }

const FavouritePage: React.FC<ChannelCardProps> = ({favouriteList}) => {
//   const { favouriteList } = useChannelStore(); // Get favouriteList from the store

  const onRedirect = (id: number) => {
    console.log(`Redirecting to channel with id: ${id}`);
    // Perform redirect logic here
  };

//   console.log(favouriteList, 'favouriteList2');
  return (
    <Box minH={{ base: 'calc(100vh - 220px)', md: 'calc(100vh - 180px)' }}>
      {isEmpty(favouriteList) ? (
        <Stack justify="center" align="center" flexDir="column" spacing={3}>
          <Text>No favourite channel at this moment</Text>
          <Button onClick={() => {/* Navigate to Home */}}>Go to home</Button>
        </Stack>
      ) : (
        <Box>
          <Heading>Favourite List</Heading>
          <SimpleGrid columns={[1, 1, 2, 3, 3, 3]} gap={5} mt={10}>
            {favouriteList.map((channel) => (
              <FavouriteCard
                channel={channel}
                key={channel.id}
                onRedirect={onRedirect}
                onDelete={(channel) => console.log(`Deleting channel with id: ${channel.id}`)}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default FavouritePage;
