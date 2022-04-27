import React, { useEffect, useState } from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { RecentlyPostsProps as Props } from "./RecentlyPosts.types";
import Card from "../Card/Card";
import { getPost } from "lib/services/post.services";

const RecentlyPosts: React.FC<Props> = () => {
  const [recentlyPosts, setRecentlyPosts] = useState<any>();

  useEffect(() => {
    (async () => {
      const data = await getPost({ last: 10 });
      setRecentlyPosts(data.data);
    })();
  }, []);

  return (
    <Box py={4}>
      <Flex align="center" justify="center" py={4}>
        <Text
          fontSize="5xl"
          color="primary"
          align={{ base: "center", md: "unset" }}
        >
          Proyectos recientes
        </Text>
      </Flex>
      <Flex align="center" justify="center" px={10}>
        <Swiper
          slidesPerView={3}
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
                  <Card
                    title={item.title}
                    img={item.img}
                    date={item.date}
                    name={item.name}
                    place={item.place}
                    description={item.description}
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </Flex>
    </Box>
  );
};

export default RecentlyPosts;
