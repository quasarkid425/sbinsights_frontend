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
import { employeeActions } from "../store/employeeSlice";
import { accountActions } from "../store/accountSlice";
import { taxActions } from "../store/taxSlice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { expenseActions } from "../store/expenseSlice";

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
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
      password: password.trim(),
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
        return;
      } else {
        dispatch(userActions.setUser(data.newUser));
        dispatch(taxActions.setTax(data.taxes));
        toast({
          title: "Account created.",
          description: `Welcome, ${data.newUser.firstName}!`,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push(`${data.newUser.slug}/dashboard`);
        setIsSubmitting(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>SBInsights || Sign Up</title>
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
              <Heading fontSize={"2xl"} textAlign={"center"}>
                Sign Up
              </Heading>
              <Text
                fontSize={"md"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>

            <Stack spacing={4}>
              <form onSubmit={signUpHandler}>
                <SimpleGrid columns={{ base: "1", md: "2" }} gap={"1rem"}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel fontSize={"sm"}>First name</FormLabel>
                    <Input
                      size={"sm"}
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl id="lastName" isRequired>
                    <FormLabel fontSize={"sm"}>Last name</FormLabel>
                    <Input
                      size={"sm"}
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
                <FormControl id="companyName" isRequired>
                  <FormLabel fontSize={"sm"}>Company Name</FormLabel>
                  <Input
                    size={"sm"}
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel fontSize={"sm"}>Email</FormLabel>
                  <Input
                    size={"sm"}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel fontSize={"sm"}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      size={"sm"}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        size={"sm"}
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
                    size={"sm"}
                    bg={"btn.100"}
                    _hover={{
                      bg: "btn_hover.100",
                    }}
                    _active={{
                      bg: "btn_hover.100",
                    }}
                    _focus={{ boxShadow: "none" }}
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
                <Text align={"center"} fontSize={"sm"}>
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
