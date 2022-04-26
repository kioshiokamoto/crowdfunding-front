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
import useGlobal from "lib/providers/global/global.hooks";
import { createUser } from "lib/services/user.services";
import { auth } from "lib/utils/firebaseConfig";
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
          {type === "LOGIN" ? (
            <Login setType={setType} onClose={onClose} />
          ) : null}
          {type === "REGISTER" ? (
            <SignUp setType={setType} onClose={onClose} />
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;

const Login: React.FC<Pick<Props, "setType" | "onClose">> = props => {
  const { setType, onClose } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(e => {
        console.log({ e });
        onClose();
      })
      .catch(e => {
        console.log({ e });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.currentTarget.value)}
                />
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
                loadingText="Conectandose..."
                isLoading={isLoading}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                onClick={handleLogin}
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

const SignUp: React.FC<Pick<Props, "setType" | "onClose">> = props => {
  const { setType, onClose } = props ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { setUser } = useGlobal();

  const handleRegisterFirebaseUser = async () => {
    setIsLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setStep(2);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateUser = async (type: string) => {
    setIsLoading(true);
    try {
      const data = await createUser({
        email,
        name,
        role: type,
        uid: auth().currentUser?.uid ?? ""
      });
      setUser({
        ...auth().currentUser,
        ...data.data
      });
      onClose();
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
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
                  <Input
                    type="text"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      value={password}
                      onChange={e => setPassword(e.currentTarget.value)}
                      type={showPassword ? "text" : "password"}
                    />
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
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500"
                    }}
                    onClick={handleRegisterFirebaseUser}
                    loadingText="Registrando..."
                    isLoading={isLoading}
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
                  isLoading={isLoading}
                  size="md"
                  borderRadius={6}
                  bg={"blue.700"}
                  color={"white"}
                  _hover={{
                    bg: "blue.800"
                  }}
                  marginTop={5}
                  onClick={() => handleCreateUser("normal")}
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
                  isLoading={isLoading}
                  size="md"
                  borderRadius={6}
                  bg={"blue.700"}
                  color={"white"}
                  _hover={{
                    bg: "blue.800"
                  }}
                  marginTop={5}
                  onClick={() => handleCreateUser("sponsor")}
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
