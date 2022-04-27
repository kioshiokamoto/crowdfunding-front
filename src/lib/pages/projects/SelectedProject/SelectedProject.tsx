import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Spinner
} from "@chakra-ui/react";

import { SelectedProjectProps as Props } from "./SelectedProject.types";
import { getPost } from "lib/services/post.services";

const SelectedProject: React.FC<Props> = () => {
  const router = useRouter();
  const postId = router.query.id;
  const [postData, setPostData] = useState<any>();
  useEffect(() => {
    (async () => {
      const data = await getPost({ id: postId });
      setPostData(data.data[0]);
    })();
  }, []);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        {postData ? (
          <>
            <Flex>
              <Image
                rounded={"md"}
                alt={"image"}
                src={
                  postData.image
                    ? postData.image
                    : "https://upload.wikimedia.org/wikipedia/commons/5/55/Crowdfundingescense.jpg"
                }
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {postData.title}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  Recolecta hasta el:{" "}
                  {new Date(postData.expiration).toISOString().split("T")[0]}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                  >
                    {postData.description}
                  </Text>
                  <Text fontSize={"lg"}>{postData.largeDescription}</Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    {postData.place}
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Organizado por:</ListItem>
                      <ListItem>Numero de contacto:</ListItem>{" "}
                      <ListItem>Correo electronico: </ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>{postData.userId.name}</ListItem>
                      <ListItem>{postData.contact}</ListItem>
                      <ListItem>{postData.userId.email}</ListItem>
                    </List>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Nuestras metas:
                  </Text>

                  <List spacing={2}>
                    {JSON.parse(postData.goals.replace(/'/g, '"')).goals.map(
                      (goal: any, index: number) => (
                        <ListItem key={index}>
                          <Text as={"span"} fontWeight={"bold"}>
                            {goal}
                          </Text>
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg"
                }}
              >
                Contáctanos
              </Button>
            </Stack>
          </>
        ) : (
          <Stack direction="row" spacing={4}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          </Stack>
        )}
      </SimpleGrid>
    </Container>
  );
};

SelectedProject.defaultProps = {};

export default SelectedProject;
