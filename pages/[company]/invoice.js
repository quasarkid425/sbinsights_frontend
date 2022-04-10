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
  Box,
  Alert,
  AlertIcon,
  Textarea,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { updateInvoice } from "../../actions/users";
import { useRouter } from "next/router";
import { userActions } from "../../store/userSlice";
import { FiArrowLeft } from "react-icons/fi";
import { selectState } from "../../utils/helpers";

const InvoiceSettings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useSelector((state) => state.user);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(user?.invoiceInfo.state);
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [signature, setSignature] = useState("");
  const router = useRouter();
  const toast = useToast();
  const slug = router.query.company;
  const dispatch = useDispatch();

  const updateInvoiceDetails = async (type) => {
    const updatedInvoice = {
      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      signature: signature,
    };

    updateInvoice(user._id, updatedInvoice)
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
          //   dispatch(employeeActions.setEmployees(data.employees));
          //   dispatch(accountActions.setAccounts(data.accounts));
          //   dispatch(expenseActions.setAllExpenses(data.expenses));
          //   dispatch(taxActions.setTax(data.taxes));
          switch (type) {
            case "address":
              setAddress("");
              break;
            case "city":
              setCity("");
              break;
            case "state":
              setState(state);
              break;
            case "zip":
              setZip("");
              break;
            case "phone":
              setPhone("");
              break;
            case "signature":
              setSignature("");
              break;
          }
          toast({
            description: "Invoice details updated successfully",
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
            Invoice details: {user.companyName}
          </Heading>
        </Flex>
        <Box color={"#000"}>
          <Alert
            status="info"
            bg={colorMode === "dark" ? "blue.200" : "blue.200"}
          >
            <AlertIcon color={"blue.500"} />
            These will be on generated invoice
          </Alert>
        </Box>

        <FormControl isRequired>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            Address
          </FormLabel>
          <Flex gap={"1rem"}>
            <Input
              size={"sm"}
              placeholder={user.invoiceInfo.address}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
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
              onClick={() => updateInvoiceDetails("address")}
              disabled={address === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            City
          </FormLabel>
          <Flex gap={"1rem"}>
            <Input
              size={"sm"}
              placeholder={user.invoiceInfo.city}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
              onChange={(e) => setCity(e.target.value)}
              value={city}
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
              onClick={() => updateInvoiceDetails("city")}
              disabled={city === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            State
          </FormLabel>
          <Flex gap={"1rem"}>
            <Select
              size={"sm"}
              value={state}
              onChange={(e) => setState(e.target.value)}
              color={colorMode === "dark" ? "gray.300" : "gray.400"}
            >
              {selectState()}
            </Select>
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
              onClick={() => updateInvoiceDetails("state")}
              disabled={state === user?.invoiceInfo.state}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            Zip Code
          </FormLabel>
          <Flex gap={"1rem"}>
            <Input
              size={"sm"}
              placeholder={user.invoiceInfo.zip}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
              onChange={(e) => setZip(e.target.value)}
              value={zip}
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
              onClick={() => updateInvoiceDetails("zip")}
              disabled={zip === ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            Phone
          </FormLabel>
          <Flex gap={"1rem"}>
            <Input
              size={"sm"}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder={user.invoiceInfo.phone}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
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
              onClick={() => updateInvoiceDetails("phone")}
              disabled={phone == ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
            Signature
          </FormLabel>
          <Flex gap={"1rem"}>
            <Textarea
              size={"sm"}
              placeholder={user.invoiceInfo.signature}
              _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
              onChange={(e) => setSignature(e.target.value)}
              value={signature}
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
              onClick={() => updateInvoiceDetails("signature")}
              disabled={signature == ""}
            >
              Update
            </Button>
          </Flex>
        </FormControl>
      </Stack>
    </Container>
  );
};

export default InvoiceSettings;
