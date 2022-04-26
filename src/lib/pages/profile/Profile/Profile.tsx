import React, { useEffect, useState } from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { Stack, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Head from "next/head";
import Link from "next/link";

import { ProfileProps as Props } from "./Profile.types";
import { getPost } from "lib/services/post.services";
import useGlobal from "lib/providers/global/global.hooks";
import Card from "lib/components/Card/Card";

const Profile: React.FC<Props> = () => {
  const [recentlyPosts, setRecentlyPosts] = useState<any>();
  const { user } = useGlobal();

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getPost({ user: user?.uid });
      setRecentlyPosts(data.data);
    })();
  }, [user]);

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
      </main>
    </>
  );
};

Profile.defaultProps = {};

export default Profile;
