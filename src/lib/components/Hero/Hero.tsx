import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";

import { HeroProps as Props } from "./Hero.types";

const Hero: React.FC<Props> = () => {
  return (
    <Stack
      minH={"calc(100vh - 60px)"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "purple.400",
                zIndex: -1
              }}
            >
              ¡Estar unidos
            </Text>
            <br />{" "}
            <Text color={"purple.400"} as={"span"}>
              es el progreso!
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Te damos la bienvenida a nuestra plataforma de ayuda dirigida a
            todas las comunidades vulnerables del Perú. Con tu ayuda, lograremos
            cumplir cada una de las metas y llevar muchas sonrisas.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"full"}
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "purple.500"
              }}
            >
              Ver proyectos
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Hero;
