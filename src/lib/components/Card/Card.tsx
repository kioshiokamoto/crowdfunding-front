import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";

import { CardProps as Props } from "./Card.types";

const Card: React.FC<Props> = props => {
  const {
    img = "https://upload.wikimedia.org/wikipedia/commons/5/55/Crowdfundingescense.jpg",
    title,
    date,
    name,
    place,
    description
  } = props;
  return (
    <Center py={6}>
      <Box
        minH={"520px"}
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("gray.50", "gray.900")}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        position="relative"
        paddingBottom={{ base: 16, md: 0 }}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={img} layout={"fill"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {place}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>{description}</Text>
        </Stack>
        <Stack
          position="absolute"
          bottom={4}
          mt={6}
          direction={"row"}
          spacing={4}
          align={"center"}
        >
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{name}</Text>
            <Text color={"gray.500"}>{date}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
export default Card;
