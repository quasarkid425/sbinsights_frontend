import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import LightLogo from "../../assets/logo/logo_light.png";
import DarkLogo from "../../assets/logo/logo_dark.png";
// import Logo from "../../assets/logo.png";

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box borderTop="1px solid">
        <Container maxW="container.lg" p={10}>
          <SimpleGrid
            columns={{ base: 1, md: 3, lg: 5 }}
            spacingX="40px"
            spacingY="35px"
          >
            <VStack align="center" spacing={4}>
              <Heading size="md">
                <Link
                  href="/"
                  cursor={"pointer"}
                  _focus={{ boxShadow: "none" }}
                >
                  <Image
                    src={colorMode === "light" ? LightLogo : DarkLogo}
                    alt={"SBInsights Logo"}
                    height={"40px"}
                    width={"140px"}
                  />
                </Link>
              </Heading>
              <VStack align="center">
                <Flex w="full" justify="center" style={{ gap: ".5rem" }}>
                  <Link href="/">
                    <a target="_blank" className="link-icon">
                      <FiInstagram size={22} />
                    </a>
                  </Link>
                  <Link href="/">
                    <a target="_blank" className="link-icon">
                      <FiFacebook size={22} />
                    </a>
                  </Link>
                </Flex>
                <Text align="center" fontSize={"sm"}>
                  Copyright &copy;{" "}
                  <span className="year">{new Date().getFullYear()}</span> All
                  rights reserved.
                </Text>
              </VStack>
            </VStack>

            <VStack align="center" spacing={4}>
              <Heading size="sm">Contact Us</Heading>
              <VStack align="center">
                {/* <Link href="mailto:Melissa@frommyroots.life" target="_blank">
                  <a className="link-hover">Melissa@frommyroots.life</a>
                </Link> */}
              </VStack>
            </VStack>

            <VStack align="center" spacing={4}>
              <Heading size="sm">Account</Heading>
              <VStack align="center" fontSize={"sm"}>
                <Link href="/signup">
                  <a className="link-hover">Create an account</a>
                </Link>
                <Link href="/login">
                  <a className="link-hover">Login</a>
                </Link>
              </VStack>
            </VStack>

            <VStack align="center" spacing={4}>
              <Heading size="sm">Company</Heading>
              <VStack align="center" fontSize={"sm"}>
                <Link href="/maintenance">
                  <a className="link-hover">For Business</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Cooking Partners</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Careers</a>
                </Link>
              </VStack>
            </VStack>

            <VStack align="center" spacing={4}>
              <Heading size="sm">Resources</Heading>
              <VStack align="center" fontSize={"sm"}>
                <Link href="/shop">
                  <a className="link-hover">Shop</a>
                </Link>
                <Link href="/lookup">
                  <a className="link-hover">Gift Card Lookup</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Help Center</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Privacy & Terms</a>
                </Link>
              </VStack>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
