import React, { useState } from "react";
import {
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
import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { accountActions } from "../../store/accountSlice";
import AddAccount from "./accounts/modals/AddAccount";

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

  return (
    <>
      <Stack spacing={accounts.length === 0 ? "" : "1rem"}>
        <Flex
          mt={accounts.length === 0 ? "10rem" : "0"}
          mb={".5rem"}
          align={"center"}
          justifyContent={accounts.length === 0 ? "center" : "space-between"}
          direction={{ base: "column-reverse", md: "row" }}
          gap={{ base: "1rem", md: "0" }}
        >
          {accounts.length > 0 && (
            <>
              <AddAccount />
              <Heading size={"sm"}>Accounts</Heading>

              <InputGroup size={"sm"} w={{ base: "75%", md: "25%" }}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon
                    color={colorMode === "light" ? "gray.300" : "#e4e4e4"}
                  />
                </InputLeftElement>
                <Input
                  type="text"
                  style={{
                    border:
                      colorMode === "dark"
                        ? "1px solid #fff"
                        : "0.1rem solid #e4e4e4",
                  }}
                  _hover={{ borderColor: colorMode === "dark" && "#e4e4e4" }}
                  _placeholder={{ color: colorMode === "dark" && "#e4e4e4" }}
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
                Add your first account by clicking &lsquo;Add Account&rsquo;
              </Text>
            </Grid>
          </>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {headings.map((heading, index) => (
                  <th key={index}>
                    <Flex justify={"center"} align={"center"} gap={".5rem"}>
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
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
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
                    <tr key={uuidv4()} className="table-hover">
                      <td
                        key={`${account.accFullName} ` + uuidv4()}
                        data-label="Name"
                      >
                        {account.accFullName ? account.accFullName : "N/A"}
                      </td>
                      <td data-label="Phone">
                        {account.accPhoneNumber
                          ? account.accPhoneNumber
                          : "N/A"}
                      </td>
                      <td data-label="Email">
                        {account.accEmail ? account.accEmail : "N/A"}
                      </td>
                      <td data-label="Billing Name">
                        {account.accAddress.addrFullName
                          ? account.accAddress.addrFullName
                          : "N/A"}
                      </td>
                      <td data-label="Billing Street">
                        {account.accAddress.addrStreet
                          ? account.accAddress.addrStreet
                          : "N/A"}
                      </td>
                      <td data-label="Billing City">
                        {account.accAddress.addrCity
                          ? account.accAddress.addrCity
                          : "N/A"}
                      </td>
                      <td data-label="Billing State">
                        {account.accAddress.addrState
                          ? account.accAddress.addrState
                          : "N/A"}
                      </td>
                      <td data-label="Billing Zip">
                        {account.accAddress.addrZipCode
                          ? account.accAddress.addrZipCode
                          : "N/A"}
                      </td>
                    </tr>
                  </Link>
                ))}
            </tbody>
          </table>
        )}
      </Stack>
    </>
  );
};

export default Accounts;
