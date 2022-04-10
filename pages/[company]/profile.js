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
  useColorMode,
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
  const { colorMode, toggleColorMode } = useColorMode();
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
              size={"sm"}
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
          <Heading fontWeight={"semibold"} size={"sm"}>
            Account details: {user.companyName}
          </Heading>
        </Flex>

        <FormControl>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            Company Name
          </FormLabel>
          <Flex gap={"1rem"}>
            <Input
              size={"sm"}
              placeholder={user.companyName}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />
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
              onClick={() => updateCustomerProfile("company")}
              disabled={companyName === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            First Name
          </FormLabel>
          <Flex gap={"1rem"}>
            <Input
              size={"sm"}
              placeholder={user.firstName}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
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
              onClick={() => updateCustomerProfile("firstName")}
              disabled={firstName === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            Email
          </FormLabel>
          <Flex gap={"1rem"}>
            <Input
              size={"sm"}
              placeholder={user.email}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
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
              onClick={() => updateCustomerProfile("email")}
              disabled={email === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            Password
          </FormLabel>
          <Flex gap={"1rem"}>
            <InputGroup>
              <Input
                size={"sm"}
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
