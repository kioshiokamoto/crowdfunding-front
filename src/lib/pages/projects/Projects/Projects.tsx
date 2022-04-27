import { Box, Flex, Text, Grid, Stack, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

import { ProjectsProps as Props } from "./Projects.types";
import Card from "lib/components/Card/Card";
import { getPost } from "lib/services/post.services";

const Projects: React.FC<Props> = () => {
  const [recentlyPosts, setRecentlyPosts] = useState<any>();

  useEffect(() => {
    (async () => {
      const data = await getPost({});
      setRecentlyPosts(data.data);
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>Proyectos | Crowdfunding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box py={{ base: "1", md: "20px" }} bg="secondary">
        {recentlyPosts ? (
          <div className="generalWrapper">
            <Flex align="center" justify="flex-start" py="2">
              <Text fontSize="3xl" className="bold500" color="primary">
                Nuestros servicios de crowdfunding
              </Text>
            </Flex>
            {recentlyPosts.length <= 3 && recentlyPosts.length > 0 && (
              <Grid templateColumns="repeat(4, 1fr)">
                {recentlyPosts.map((post: any, index: any) => (
                  <Link key={index} href={`/proyectos/${post.id}`}>
                    <a>
                      <Card
                        title={post.title}
                        img={post.img}
                        date={post.date}
                        name={post.name}
                        place={post.place}
                        description={post.description}
                      />
                    </a>
                  </Link>
                ))}
              </Grid>
            )}
            {recentlyPosts.length > 3 && (
              <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
                breakpoints={{
                  // when window width is >= 640px
                  100: {
                    slidesPerView: 1
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 2
                  },
                  1000: {
                    slidesPerView: 4
                  }
                }}
                className="mySwiperTab"
              >
                {recentlyPosts.map((post: any, index: any) => (
                  <SwiperSlide key={index}>
                    <Link key={index} href={`/proyectos/${post.id}`}>
                      <a>
                        <Card
                          title={post.title}
                          img={post.img}
                          date={post.date}
                          name={post.name}
                          place={post.place}
                          description={post.description}
                        />
                      </a>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {recentlyPosts.length === 0 && (
              <p>Aun no tenemos publicaciones para ti</p>
            )}
          </div>
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
      </Box>
    </div>
  );
};

Projects.defaultProps = {};

export default Projects;
