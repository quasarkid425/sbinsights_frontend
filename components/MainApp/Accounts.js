import React, { useEffect, useState } from "react";
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
  useColorMode,
  Heading,
  Box,
  Text,
  Grid,
} from "@chakra-ui/react";
import { retrieveAccounts } from "../../actions/accounts";
import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { accountActions } from "../../store/accountSlice";
import AddAccount from "./accounts/modals/AddAccount";
import { taxActions } from "../../store/taxSlice";

const Accounts = () => {
  const { user } = useSelector((state) => state.user);
  const { accounts } = useSelector((state) => state.accounts);
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

  const sortAsc = (type) => {
    dispatch(accountActions.sortCollectionAsc(type));
  };
  const sortDesc = (type) => {
    dispatch(accountActions.sortCollectionDesc(type));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await retrieveAccounts(user._id);
      dispatch(accountActions.setAccounts({ accounts: data }));
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Stack spacing={accounts.length === 0 ? "" : "1rem"}>
        <Flex
          mt={accounts.length === 0 ? "10rem" : "0"}
          mb={".5rem"}
          align={"center"}
          justifyContent={accounts.length === 0 ? "center" : "space-between"}
        >
          {accounts.length > 0 && (
            <>
              <AddAccount />
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
              <AddAccount />
              <Box mt={"1rem"}>
                <BsArrowUp size={45} />
              </Box>
              <Text fontSize={"md"} mt={"1rem"}>
                Add your first account by clicking 'Add Account'
              </Text>
            </Grid>
          </>
        ) : (
          <Table variant={"simple"} fontSize={"sm"}>
            <Thead>
              <Tr>
                {headings.map((heading, index) => (
                  <Th key={index}>
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
                      key={uuidv4()}
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
