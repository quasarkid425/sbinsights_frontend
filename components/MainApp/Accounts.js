import React, { useState, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  FormControl,
  FormLabel,
  Select,
  Heading,
  Box,
  Text,
  Grid,
} from "@chakra-ui/react";
import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { accountActions } from "../../store/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import { addAccount } from "../../actions/accounts";
import { v4 as uuidv4 } from "uuid";
import { selectState } from "../../utils/helpers";
const Accounts = () => {
  const { user } = useSelector((state) => state.user);
  const { accounts } = useSelector((state) => state.accounts);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const headings = [
    "Name",
    "Phone",
    "Email",
    "Billing Name",
    "Billing Street",
    "Billing City",
    "Billing State",
    "Billing Zip",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const accountFullName = useRef();
  const accountEmail = useRef();
  const accountPhoneNumber = useRef();
  const accountBillingName = useRef();
  const accountBillingStreet = useRef();
  const accountBillingState = useRef();
  const accountBillingCity = useRef();
  const accountBillingZipCode = useRef();

  const submitAccDetails = (e) => {
    e.preventDefault();

    const newUserAccount = {
      accFullName: accountFullName.current.value,
      accEmail: accountEmail.current.value,
      accPhoneNumber: accountPhoneNumber.current.value,
      accAddress: {
        addrFullName: accountBillingName.current.value,
        addrStreet: accountBillingStreet.current.value,
        addrCity: accountBillingCity.current.value,
        addrState: accountBillingState.current.value,
        addrZipCode: accountBillingZipCode.current.value,
      },
      _id: uuidv4().split("-").join("").substring(0, 24),
    };

    addAccount(user._id, newUserAccount)
      .then((data) => {
        dispatch(accountActions.addAccount(data));
      })
      .catch((err) => {
        console.log(err);
      });

    onClose();

    accountFullName.current.value = "";
    accountEmail.current.value = "";
    accountPhoneNumber.current.value = "";
    accountBillingName.current.value = "";
    accountBillingStreet.current.value = "";
    accountBillingCity.current.value = "";
    accountBillingState.current.value = "";
    accountBillingZipCode.current.value = "";
  };

  const sortAsc = (type) => {
    dispatch(accountActions.sortCollectionAsc(type));
  };
  const sortDesc = (type) => {
    dispatch(accountActions.sortCollectionDesc(type));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Account</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="accName" fontSize={"sm"}>
                Name
              </FormLabel>
              <Input
                id="accName"
                type="text"
                ref={accountFullName}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" fontSize={"sm"}>
                Email
              </FormLabel>
              <Input id="email" type="email" ref={accountEmail} size={"sm"} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone" fontSize={"sm"}>
                Phone
              </FormLabel>
              <Input
                id="phone"
                type="text"
                ref={accountPhoneNumber}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bName" fontSize={"sm"}>
                Billing Name
              </FormLabel>
              <Input
                id="bName"
                type="text"
                ref={accountBillingName}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bStreet" fontSize={"sm"}>
                Billing Street
              </FormLabel>
              <Input
                id="bStreet"
                type="text"
                ref={accountBillingStreet}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bCity" fontSize={"sm"}>
                Billing City
              </FormLabel>
              <Input
                id="bCity"
                type="text"
                ref={accountBillingCity}
                size={"sm"}
              />
            </FormControl>

            <FormControl id="state">
              <FormLabel fontSize={"sm"}>Billing State</FormLabel>
              <Select
                name="state"
                id="state"
                ref={accountBillingState}
                size={"sm"}
              >
                {selectState()}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bZip" size={"sm"} fontSize={"sm"}>
                Billing Zip Code
              </FormLabel>
              <Input
                id="bZip"
                type="text"
                ref={accountBillingZipCode}
                size={"sm"}
              />
            </FormControl>

            <Button
              w={"100%"}
              onClick={submitAccDetails}
              mt={"1rem"}
              bg={process.env.NEXT_PUBLIC_BTN}
              _hover={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _active={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              size={"sm"}
            >
              Add Account
            </Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Stack spacing={accounts.length === 0 ? "" : "1rem"}>
        <Flex
          mt={accounts.length === 0 ? "10rem" : "0"}
          mb={".5rem"}
          align={"center"}
          justifyContent={accounts.length === 0 ? "center" : "space-between"}
        >
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
            onClick={onOpen}
            size={"sm"}
          >
            Add Account
          </Button>

          {accounts.length > 0 && (
            <>
              <Heading size={"sm"}>Accounts</Heading>

              <InputGroup w={"25%"} size={"sm"}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Search accounts"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </InputGroup>
            </>
          )}
        </Flex>

        {accounts.length === 0 ? (
          <>
            <Grid placeItems={"center"} pt={"1rem"}>
              <Box>
                <BsArrowUp size={45} />
              </Box>
              <Text fontSize={"md"} pt={"1rem"}>
                Add your first account by clicking 'Add Account'
              </Text>
            </Grid>
          </>
        ) : (
          <Table variant={"simple"} fontSize={"sm"}>
            <Thead>
              <Tr>
                {headings.map((heading) => (
                  <Th key={heading}>
                    <Flex align={"center"} gap={".5rem"}>
                      <Box fontSize={".75rem"}>{heading}</Box>
                      <Flex>
                        <BsSortAlphaDown
                          size={15}
                          cursor={"pointer"}
                          onClick={() => sortAsc(heading)}
                        />
                      </Flex>
                      <Flex>
                        <BsSortAlphaUpAlt
                          size={15}
                          cursor={"pointer"}
                          onClick={() => sortDesc(heading)}
                        />
                      </Flex>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {accounts
                ?.filter((account) => {
                  if (searchTerm === "") {
                    return account;
                  } else if (
                    account.accFullName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    account.accPhoneNumber
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    account.accEmail
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    account.accAddress.addrFullName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    account.accAddress.addrStreet
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    account.accAddress.addrCity
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    account.accAddress.addrState
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    account.accAddress.addrZipCode
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return account;
                  }
                })
                .map((account) => (
                  <Link
                    href={`/${user.slug}/account/${account._id}`}
                    key={uuidv4()}
                  >
                    <Tr
                      _hover={{
                        color: colorMode === "light" ? "gray.800" : "gray.800",
                        bg: "gray.200",
                      }}
                      cursor={"pointer"}
                    >
                      <Td key={`${account.accFullName} ` + uuidv4()}>
                        {account.accFullName ? account.accFullName : "N/A"}
                      </Td>
                      <Td>
                        {account.accPhoneNumber
                          ? account.accPhoneNumber
                          : "N/A"}
                      </Td>
                      <Td>{account.accEmail ? account.accEmail : "N/A"}</Td>
                      <Td>
                        {account.accAddress.addrFullName
                          ? account.accAddress.addrFullName
                          : "N/A"}
                      </Td>
                      <Td>
                        {account.accAddress.addrStreet
                          ? account.accAddress.addrStreet
                          : "N/A"}
                      </Td>
                      <Td>
                        {account.accAddress.addrCity
                          ? account.accAddress.addrCity
                          : "N/A"}
                      </Td>
                      <Td>
                        {account.accAddress.addrState
                          ? account.accAddress.addrState
                          : "N/A"}
                      </Td>
                      <Td>
                        {account.accAddress.addrZipCode
                          ? account.accAddress.addrZipCode
                          : "N/A"}
                      </Td>
                    </Tr>
                  </Link>
                ))}
            </Tbody>
          </Table>
        )}
      </Stack>
    </>
  );
};

export default Accounts;
