import React, { useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Input,
  Button,
  Flex,
  FormLabel,
  FormControl,
  useToast,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { userActions } from "../../store/userSlice";
import { employeeActions } from "../../store/employeeSlice";
import { accountActions } from "../../store/accountSlice";
import { taxActions } from "../../store/taxSlice";
import { FiArrowLeft } from "react-icons/fi";
import { expenseActions } from "../../store/expenseSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();
  const slug = router.query.company;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const updateCustomerProfile = async (type) => {
    if (type === "email") {
      if (!email.includes("@")) {
        toast({
          description: "Invalid email",
          position: "top",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
    }
    if (type === "password") {
      if (password.length < 6) {
        toast({
          description: "Password must be at least 6 characters",
          position: "top",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
    }
    const updatedCustomer = {
      companyName: companyName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password,
    };

    updateProfile(user._id, updatedCustomer)
      .then((data) => {
        if (data.error) {
          toast({
            description: `${data.error}`,
            position: "top",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setEmail("");
          return;
        } else {
          dispatch(userActions.setUser(data.user));
          dispatch(employeeActions.setEmployees(data.employees));
          dispatch(accountActions.setAccounts(data.accounts));
          dispatch(expenseActions.setAllExpenses(data.expenses));
          dispatch(taxActions.setTax(data.taxes));
          switch (type) {
            case "company":
              setCompanyName("");
              break;
            case "firstName":
              setFirstName("");
              break;
            case "lastName":
              setLastName("");
              break;
            case "email":
              setEmail("");
              break;
            case "password":
              setPassword("");
              break;
          }
          toast({
            description: "Account updated successfully",
            position: "top",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxW="container.xl" p={5} mb={20}>
      <Stack py={"1rem"}>
        <Box pt={2} pb={4}>
          <Link href={`/${slug}/dashboard`}>
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              px={0}
              _hover={{
                bg: "",
                color: "#51cf66",
                transition: ".3s",
              }}
              _focus={{
                outline: "none",
              }}
              _active={{
                background: "",
              }}
            >
              Dashboard
            </Button>
          </Link>
        </Box>
        <Flex
          gap={"1rem"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pb={"1.5rem"}
        >
          <Heading fontWeight={"semibold"} size={"lg"}>
            Account details: {user.companyName}
          </Heading>
        </Flex>

        <FormControl>
          <FormLabel htmlFor="accBillingAddr">Company Name</FormLabel>
          <Flex gap={"1rem"}>
            <Input
              placeholder={user.companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />
            <Button
              bg={process.env.NEXT_PUBLIC_BTN}
              _hover={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _active={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              onClick={() => updateCustomerProfile("company")}
              disabled={companyName === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr">First Name</FormLabel>
          <Flex gap={"1rem"}>
            <Input
              placeholder={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <Button
              bg={process.env.NEXT_PUBLIC_BTN}
              _hover={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _active={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              onClick={() => updateCustomerProfile("firstName")}
              disabled={firstName === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr">Last Name</FormLabel>
          <Flex gap={"1rem"}>
            <Input
              placeholder={user.lastName}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <Button
              bg={process.env.NEXT_PUBLIC_BTN}
              _hover={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _active={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              onClick={() => updateCustomerProfile("lastName")}
              disabled={lastName === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr">Email</FormLabel>
          <Flex gap={"1rem"}>
            <Input
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button
              bg={process.env.NEXT_PUBLIC_BTN}
              _hover={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _active={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              onClick={() => updateCustomerProfile("email")}
              disabled={email === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr">Password</FormLabel>
          <Flex gap={"1rem"}>
            <InputGroup>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                value={password}
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

            <Button
              bg={process.env.NEXT_PUBLIC_BTN}
              _hover={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _active={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              onClick={() => updateCustomerProfile("password")}
              disabled={password == ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
      </Stack>
    </Container>
  );
};

export default Profile;
