import { Box, Container } from "@chakra-ui/react";
import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Flex>
          <Image src="/logo.svg" alt="Crowdfunding" width={7} height={7} />
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            display={{ base: "none", md: "flex" }}
            marginLeft={4}
          >
            Crowd Help
          </Text>
        </Flex>
        <Text>FISI 2022 © Todos los derechos reservados</Text>
      </Container>
    </Box>
  );
}
