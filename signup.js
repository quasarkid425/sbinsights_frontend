import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import RedirectUser from "../components/MainApp/RedirectUser";
import Head from "next/head";
import Link from "next/link";
import { signup } from "../actions/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const signUpHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const signUpDetails = {
      firstName,
      lastName,
      companyName,
      email,
      password,
    };

    signup(signUpDetails).then((data) => {
      if (data.error) {
        toast({
          description: `${data.error}`,
          position: "top",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setIsSubmitting(false);
      } else {
        dispatch(userActions.userDetails(data.user));
        toast({
          title: "Account created.",
          description: `Welcome, ${data.user.firstName}!`,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push(`${data.user.slug}/dashboard`);
        setIsSubmitting(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Company Name || Sign Up</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w={"30rem"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"} mb={"3rem"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign Up
              </Heading>
              <Text
                fontSize={"lg"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>

            <Stack spacing={4}>
              <form onSubmit={signUpHandler}>
                <SimpleGrid columns={{ base: "1", md: "2" }} gap={"1rem"}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
                <FormControl id="companyName" isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={(e) =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={4}>
                  <Button
                    bg={"blue.400"}
                    _hover={{
                      bg: "blue.300",
                    }}
                    color={"#fff"}
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText={"Signing up..."}
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>
              <Stack pt={4}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href={"/login"}>
                    <Text as="a" color={"blue.400"} cursor={"pointer"}>
                      Log In
                    </Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUp;
