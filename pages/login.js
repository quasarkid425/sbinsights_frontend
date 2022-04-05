import { useState } from "react";
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
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import RedirectUser from "../components/MainApp/RedirectUser";
import Head from "next/head";
import Link from "next/link";
import { login } from "../actions/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { employeeActions } from "../store/employeeSlice";
import { accountActions } from "../store/accountSlice";
import { taxActions } from "../store/taxSlice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { expenseActions } from "../store/expenseSlice";
import { getDateByYear } from "../utils/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    const loginDetails = {
      email: email.trim(),
      password: password.trim(),
    };

    login(loginDetails).then((data) => {
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
        dispatch(userActions.setUser(data.user));
        dispatch(taxActions.setTax(data.taxes));
        toast({
          title: `We've missed you, ${data.user.firstName}!`,
          description: `Welcome back`,
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
        <title>Company Name || Login</title>
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
                Log In
              </Heading>
              <Text
                fontSize={"md"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>

            <Stack spacing={4}>
              <form onSubmit={loginHandler}>
                <FormControl id="email" isRequired>
                  <FormLabel fontSize={"sm"}>Email</FormLabel>
                  <Input
                    size={"sm"}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(false);
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
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                    mt={4}
                  >
                    <Box></Box>
                    <Link href={"forgot"}>
                      <Text
                        as="a"
                        color={"blue.400"}
                        cursor={"pointer"}
                        fontSize={"sm"}
                      >
                        Forgot password?
                      </Text>
                    </Link>
                  </Stack>
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
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText={"Logging in..."}
                  >
                    Log In
                  </Button>
                </Stack>
              </form>

              <Stack pt={4}>
                <Text align={"center"} fontSize={"sm"}>
                  Need an account?{" "}
                  <Link href={"/signup"}>
                    <Text as="a" color={"blue.400"} cursor={"pointer"}>
                      Sign Up
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

export default Login;
