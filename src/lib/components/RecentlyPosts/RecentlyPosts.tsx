import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { RecentlyPostsProps as Props } from "./RecentlyPosts.types";
import Card from "../Card/Card";
import { CardProps } from "../Card/Card.types";

const data: CardProps[] = [
  {
    title: "Caritas de Ángel",
    place: "LIMA",
    date: "Enero 22, 2022",
    name: "Jorge López",
    img: "/crowdfunding.jpg",
    description:
      "Proyecto de ayuda a la olla común “Caritas de Ángel”. Necesitamos abastecer a más de 100 personas dentro de la comunidad ya que muchos de ellos ya no cuentan con trabajo."
  },
  {
    title: "Siempre adelante",
    place: "ICA",
    date: "Febrero 24, 2022",
    name: "Diego Souza",
    img: "/crowdfunding.jpg",
    description:
      "Necesitamos fondos para la familia Rodriguez Mesas quienes han sufrido un terrible incendio y lo han perdido todo."
  },
  {
    title: "Juntos por ti",
    place: "PIURA",
    date: "Febrero 24, 2022",
    name: "Luisa Aguirre",
    img: "/crowdfunding.jpg",
    description:
      "Necesitamos fondos para que los niños del colegio San Luis Gonzaga puedan acudir a sus clases presenciales con todas las medidas y protocolos que necesitan."
  }
];

const RecentlyPosts: React.FC<Props> = () => {
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
          {data.map((item, index) => (
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
          ))}
        </Swiper>
      </Flex>
    </Box>
  );
};

export default RecentlyPosts;
