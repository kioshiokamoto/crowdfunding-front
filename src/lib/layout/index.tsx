import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { Button, Stack, Collapse, Icon } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { useDisclosure, Image } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { ReactNode, useState } from "react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";
import AuthModal from "lib/components/AuthModal/AuthModal";
import useGlobal from "lib/providers/global/global.hooks";
import { auth } from "lib/utils/firebaseConfig";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure();
  const [authType, setAuthType] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const { user } = useGlobal();
  const isLogged = !!user?.uid;
  const role = user?.role;
  console.log({ user });

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            alignItems="center"
            justify={{ base: "center", md: "start" }}
          >
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

            <Flex
              display={{ base: "none", md: "flex" }}
              ml={10}
              alignItems="center"
            >
              <DesktopNav role={role} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {!isLogged ? (
              <>
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  onClick={() => {
                    setAuthType("LOGIN");
                    onModalOpen();
                  }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"purple.400"}
                  _hover={{
                    bg: "purple.300"
                  }}
                  onClick={() => {
                    setAuthType("REGISTER");
                    onModalOpen();
                  }}
                >
                  Registrarse
                </Button>
              </>
            ) : (
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                onClick={async () => {
                  await auth().signOut();
                }}
              >
                Cerrar sesión
              </Button>
            )}
            <ThemeToggle />
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav role={role} />
        </Collapse>

        {children}
        <Footer />
      </Box>
      <AuthModal
        type={authType}
        setType={setAuthType}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </>
  );
};

const DesktopNav = ({ role }: { role: string | undefined }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map(navItem =>
        navItem?.role?.includes(role ?? "") ? (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <Link href={navItem.href ?? "#"}>
                <a>
                  <PopoverTrigger>
                    <Box
                      p={2}
                      fontSize={"sm"}
                      fontWeight={500}
                      color={linkColor}
                      _hover={{
                        textDecoration: "none",
                        color: linkHoverColor
                      }}
                    >
                      {navItem.label}
                    </Box>
                  </PopoverTrigger>
                </a>
              </Link>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map(child => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ) : null
      )}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("purple.50", "gray.900") }}
    >
      <Link href={href ?? "#"}>
        <a>
          <Box>
            <Stack direction={"row"} align={"center"}>
              <Box>
                <Text
                  transition={"all .3s ease"}
                  _groupHover={{ color: "purple.400" }}
                  fontWeight={500}
                >
                  {label}
                </Text>
                <Text fontSize={"sm"}>{subLabel}</Text>
              </Box>
              <Flex
                transition={"all .3s ease"}
                transform={"translateX(-10px)"}
                opacity={0}
                _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
                justify={"flex-end"}
                align={"center"}
                flex={1}
              >
                <Icon color={"purple.400"} w={5} h={5} as={ChevronRightIcon} />
              </Flex>
            </Stack>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

const MobileNav = ({ role }: { role: string | undefined }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map(navItem =>
        navItem?.role?.includes(role ?? "") ? (
          <MobileNavItem key={navItem.label} {...navItem} />
        ) : null
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Link href={href ?? "#"}>
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none"
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </Link>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} href={child.href ?? "#"}>
                <Box py={2}>{child.label}</Box>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  role?: string[];
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inicio",
    children: [
      {
        label: "Visita nuestro inicio",
        subLabel: "Brindamos apoyo a comunidades!",
        href: "/",
        role: ["sponsor", "normal"]
      }
    ],
    role: ["sponsor", "normal"]
  },
  {
    label: "Proyectos",
    href: "/proyectos",
    role: ["sponsor", "normal"]
  },
  {
    label: "Publicacion",
    href: "/publicacion",
    role: ["sponsor"]
  }
];

export default Layout;
