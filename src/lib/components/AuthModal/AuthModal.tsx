/* eslint-disable prettier/prettier */

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AuthModalProps as Props } from "./AuthModal.types";

const AuthModal: React.FC<Props> = props => {
  const { isOpen, onClose, type, setType } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {type === "LOGIN" ? <Login setType={setType} /> : null}
          {type === "REGISTER" ? <SignUp setType={setType} /> : null}
        </ModalBody>

        {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;

const Login: React.FC<Pick<Props, "setType">> = props => {
  const { setType } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white.50", "dark")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} paddingTop={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} textAlign={"center"}>
            ¡Bienvenido otra vez!
          </Heading>
          <Text
            align="center"
            fontSize={"lg"}
            color={useColorModeValue("gray.600", "gray.50")}
          >
            Ingresa sesión para poder seguir ayudando✌️
          </Text>
          <Avatar size="2xl" src="/hand.png" bg="yellow.100" />
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
              >
                Iniciar sesión
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text align={"center"}>
                Aun no te registras?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => setType && setType("REGISTER")}
                >
                  Registro
                </Link>
              </Text>
            </Stack>
            <Stack pt={2}>
              <Text align={"center"}>
                <Link color={"blue.400"}>¿Olvidaste tu contraseña?</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

const SignUp: React.FC<Pick<Props, "setType">> = props => {
  const { setType } = props ?? {};
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleRegisterFirebaseUser = async () => {
    setStep(2);
  };

  const stepForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"} textAlign={"center"}>
                ¡Únete a nuestra comunidad!
              </Heading>
              <Text
                align="center"
                fontSize={"lg"}
                color={useColorModeValue("gray.600", "gray.50")}
              >
                Regístrate para poder publicar o colaborar
              </Text>
              <Avatar size="2xl" src="/hand2.png" bg="yellow.100" />
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500"
                    }}
                    onClick={handleRegisterFirebaseUser}
                  >
                    Registrarse
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Ya eres usuario?{" "}
                    <Link color={"blue.400"} onClick={() => setType("LOGIN")}>
                      Iniciar sesión
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"} textAlign={"center"}>
                ¿Qué tipo de perfil deseas?
              </Heading>
              <Text
                align="center"
                fontSize={"lg"}
                color={useColorModeValue("gray.600", "gray.50")}
              >
                Elige uno de los dos tipos de perfiles
              </Text>
            </Stack>
            <Flex flexDirection={{ base: "column", md: "row" }} gap={10}>
              <Flex
                minH={"352px"}
                pt={6}
                flexDirection="column"
                alignItems="center"
              >
                <Avatar size="2xl" src="/normal.png" bg="pink.50" />
                <Text align={"center"} flex={1} marginTop={5}>
                  Puedes solicitar ayuda para tu proyecto y publicar artículos
                  como medio de recaudación
                </Text>
                <Button
                  loadingText="Registrando.."
                  size="md"
                  borderRadius={6}
                  bg={"blue.700"}
                  color={"white"}
                  _hover={{
                    bg: "blue.800"
                  }}
                  marginTop={5}
                  onClick={() => {}}
                >
                  Ser beneficiante
                </Button>
              </Flex>
              <Flex
                minH={"352px"}
                pt={6}
                flexDirection="column"
                alignItems="center"
              >
                <Avatar size="2xl" src="/sponsor.png" bg="pink.50" />
                <Text align={"center"} flex={1} marginTop={5}>
                  Puedes colaborar con un proyecto adquiriendo un producto de la
                  tienda
                </Text>
                <Button
                  loadingText="Registrando.."
                  size="md"
                  borderRadius={6}
                  bg={"blue.700"}
                  color={"white"}
                  _hover={{
                    bg: "blue.800"
                  }}
                  marginTop={5}
                  onClick={() => {}}
                >
                  Ser patrocinador
                </Button>
              </Flex>
            </Flex>
          </>
        );
    }
  };
  return (
    <Flex
      // minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white.50", "dark")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
        {stepForm()}
      </Stack>
    </Flex>
  );
};
