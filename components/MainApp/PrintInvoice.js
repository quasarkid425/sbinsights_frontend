import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const PrintInvoice = (props, ref) => {
  const { user } = useSelector((state) => state.user);
  const { printInfo } = useSelector((state) => state.accounts);

  return (
    <Box p={"2rem"} ref={ref} fontSize={"sm"}>
      <Flex direction={"column"} gap={"3rem"}>
        <Flex justifyContent={"space-between"}>
          <Stack>
            <Heading size={"md"}>{user.companyName}</Heading>
            {/* Need to ask the user to fill out this */}
            <Stack>
              <Text>{user.invoiceInfo?.address}</Text>
              <Text>
                {user.invoiceInfo?.city}, {user.invoiceInfo?.state},{" "}
                {user.invoiceInfo?.zip}
              </Text>
              <Text>{user.invoiceInfo?.phone}</Text>
            </Stack>
          </Stack>
          <Stack>
            <Box
              border="1px solid"
              borderColor="gray.100"
              borderRadius="md"
              w={"250px"}
            >
              <Table w={"250px"}>
                <Thead>
                  <Tr>
                    <Th textAlign={"center"}>Date</Th>
                    <Th textAlign={"center"}>Invoice #</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign={"center"}>{printInfo.service?.date}</Td>
                    <Td textAlign={"center"}>{printInfo.service?._id}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Stack>
        </Flex>
        <Box
          border="1px solid"
          borderColor="gray.100"
          borderRadius="md"
          w={"250px"}
        >
          <Table w={"250px"}>
            <Thead>
              <Tr>
                <Th>Bill To</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Stack>
                    <Text>{printInfo.account.accAddress.addrFullName}</Text>
                    <Text>{printInfo.account.accAddress.addrStreet}</Text>
                    <Text>
                      {printInfo.account.accAddress.addrCity},{" "}
                      {printInfo.account.accAddress.addrState}{" "}
                      {printInfo.account.accAddress.addrZipCode}
                    </Text>
                  </Stack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Box
          borderTop={"1px solid"}
          borderRight={"1px solid"}
          borderLeft={"1px solid"}
          borderColor="gray.100"
          borderRadius="md"
        >
          <Table>
            <Thead>
              <Tr>
                <Th>Quantity</Th>
                <Th>Description</Th>
                <Th textAlign={"right"}>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {printInfo.service?.services?.map((acc, index) => (
                <Tr key={index}>
                  <Td>{acc.qty}</Td>
                  <Td>{acc.desc}</Td>
                  <Td textAlign={"right"}>${acc.total.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box
            borderRight={"1px solid"}
            borderLeft={"1px solid"}
            borderBottom={"1px solid"}
            borderColor="gray.100"
            borderRadius="md"
            p={5}
            mt={"2rem"}
          >
            <Flex justify={"space-between"}>
              <Text>{user.invoiceInfo?.signature}</Text>
              <Flex gap={"1rem"}>
                <Text fontWeight={"semibold"}>Total:</Text>
                <Box>${printInfo.service?.total?.toFixed(2)}</Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box mt={"1rem"} pr={5}>
        <Flex justify={"end"} gap={"1rem"}>
          <Text fontWeight={"semibold"}>Balance Due:</Text>$
          {printInfo.service?.total?.toFixed(2)}
        </Flex>
      </Box>
      <Text
        textAlign={"center"}
        mt={"10rem"}
        position={"fixed"}
        bottom={0}
        right={10}
      >
        Recorded with sbinsights.io
      </Text>
    </Box>
  );
};

export default React.forwardRef(PrintInvoice);
