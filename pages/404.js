import React from "react";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const Error = () => {
  return (
    <Container maxW="container.xl" p={5} my={20}>
      <VStack>
        <Heading size={"lg"}>Ooops! This page was not found</Heading>
        <Text>
          Please follow this link to return to the home page:
          <Link href={process.env.NEXT_PUBLIC_CLIENT_URL}>
            <a className="link-hover">Home</a>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Error;
