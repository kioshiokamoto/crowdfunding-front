import React, { useEffect, useState } from "react";
import {
  Text,
  Flex,
  Box,
  useDisclosure,
  useColorModeValue,
  Heading,
  Avatar,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { Stack, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Head from "next/head";
import Link from "next/link";

import { ProfileProps as Props } from "./Profile.types";
import { createPost, getPost } from "lib/services/post.services";
import useGlobal from "lib/providers/global/global.hooks";
import Card from "lib/components/Card/Card";

const Profile: React.FC<Props> = () => {
  const [recentlyPosts, setRecentlyPosts] = useState<any>();
  const { user } = useGlobal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [place, setPlace] = useState("");
  const [expiration, setExpiration] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getPost({ user: user?.uid });
      setRecentlyPosts(data.data);
    })();
  }, [user]);

  const handleCreatePost = async () => {
    setIsLoading(true);
    const expirationData = expiration.split("-");
    try {
      await createPost({
        description,
        expiration: new Date(
          +expirationData[2],
          +expirationData[1] - 1,
          +expirationData[0]
        ).toISOString(),
        place,
        title,
        uid: user?.uid,
        contact,
        goals: JSON.stringify({ goals: goals.split(",") }),
        largeDescription: longDescription
      });
      const data = await getPost({ user: user?.uid });
      setRecentlyPosts(data.data);
      onClose();
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Perfil | Crowdfunding </title>
      </Head>
      <header className="Profile__header" />
      <main className="Profile__main">
        <Flex
          w={"full"}
          h={"calc(100vh - 60px)"}
          backgroundImage={
            "url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2029&q=80)"
          }
          backgroundSize={"cover"}
          backgroundPosition={"center center"}
        >
          <VStack
            w={"full"}
            justify={"center"}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
              >
                ¡Bienvenido a tu perfil! Aquí podrás crear tus anuncios para
                poder seguir contribuyendo con la comunidad y alcanzar metas
              </Text>
              <Stack direction={"row"}>
                <Button
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                  onClick={() => onOpen()}
                >
                  Crear Aqui
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Flex>
        <Box py={4}>
          <Flex align="center" justify="center" py={4}>
            <Text
              fontSize="5xl"
              color="primary"
              align={{ base: "center", md: "unset" }}
            >
              Mis proyectos
            </Text>
          </Flex>
          <Flex align="center" justify="center" px={10}>
            <Swiper
              slidesPerView={2}
              spaceBetween={50}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              breakpoints={{
                100: {
                  slidesPerView: 1
                },
                768: {
                  slidesPerView: 2
                },
                1000: {
                  slidesPerView: 3
                }
              }}
            >
              {recentlyPosts
                ? recentlyPosts.map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                      <Link key={index} href={`/proyectos/${item.id}`}>
                        <a>
                          <Card
                            title={item.title}
                            img={item.img}
                            date={item.date}
                            name={item.name}
                            place={item.place}
                            description={item.description}
                          />
                        </a>
                      </Link>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
          </Flex>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("white.50", "dark")}
              >
                <Stack
                  spacing={8}
                  mx={"auto"}
                  maxW={"lg"}
                  paddingTop={12}
                  px={6}
                >
                  <Stack align={"center"}>
                    <Heading fontSize={"3xl"} textAlign={"center"}>
                      ¡Crea tu proyecto!
                    </Heading>
                    <Text
                      align="center"
                      fontSize={"lg"}
                      color={useColorModeValue("gray.600", "gray.50")}
                    >
                      Ayuda a la comunidad a conseguir sus metas ✌️
                    </Text>
                    <Avatar size="2xl" src="/hand.png" bg="yellow.100" />
                  </Stack>
                  <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <FormControl id="email" isRequired>
                        <FormLabel>Titulo</FormLabel>
                        <Input
                          type="text"
                          value={title}
                          onChange={e => setTitle(e.currentTarget.value)}
                        />
                      </FormControl>
                      <FormControl id="description" isRequired>
                        <FormLabel>Descripcion</FormLabel>
                        <Input
                          type="text"
                          value={description}
                          onChange={e => setDescription(e.currentTarget.value)}
                        />
                      </FormControl>
                      <FormControl id="largeDescription" isRequired>
                        <FormLabel>Descripcion larga</FormLabel>
                        <Input
                          type="text"
                          value={longDescription}
                          onChange={e =>
                            setLongDescription(e.currentTarget.value)
                          }
                        />
                      </FormControl>

                      <FormControl id="goals" isRequired>
                        <FormLabel>Metas</FormLabel>
                        <Input
                          type="text"
                          value={goals}
                          onChange={e => setGoals(e.currentTarget.value)}
                        />
                      </FormControl>

                      <FormControl id="place" isRequired>
                        <FormLabel>Lugar</FormLabel>
                        <Input
                          type="text"
                          value={place}
                          onChange={e => setPlace(e.currentTarget.value)}
                        />
                      </FormControl>

                      <FormControl id="date" isRequired>
                        <FormLabel>Fecha</FormLabel>
                        <Input
                          type="text"
                          value={expiration}
                          onChange={e => setExpiration(e.currentTarget.value)}
                        />
                      </FormControl>
                      <FormControl id="contact" isRequired>
                        <FormLabel>Contacto</FormLabel>
                        <Input
                          type="text"
                          value={contact}
                          onChange={e => setContact(e.currentTarget.value)}
                        />
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Creando..."
                          isLoading={isLoading}
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500"
                          }}
                          onClick={handleCreatePost}
                        >
                          Crear Post
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
    </>
  );
};

Profile.defaultProps = {};

export default Profile;
