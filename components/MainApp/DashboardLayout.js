import React from "react";
import { Box, Flex, Stack, Tooltip, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  MdDashboard,
  MdSupervisorAccount,
  MdBarChart,
  MdAddReaction,
  MdBuild,
  MdLibraryBooks,
} from "react-icons/md";

const DashboardLayout = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <Stack pl={"1rem"} pt={"2rem"} pr={".5rem"}>
        <Tooltip label="Dashboard" fontSize="md" placement="right">
          <Box as="span">
            <Link href={`/${user.slug}/dashboard`}>
              <MdDashboard
                size={"21"}
                cursor={"pointer"}
                color={colorMode === "light" ? "#718096" : "#fff"}
              />
            </Link>
          </Box>
        </Tooltip>
        <Tooltip label="Sales" fontSize="md" placement="right">
          <Box as="span">
            <Link href={`/${user.slug}/sales`}>
              <MdBarChart
                size={"21"}
                cursor={"pointer"}
                color={colorMode === "light" ? "#718096" : "#fff"}
              />
            </Link>
          </Box>
        </Tooltip>

        <Tooltip label="Accounts" fontSize="md" placement="right">
          <Box as="span">
            <Link href={`/${user.slug}/accounts`}>
              <MdSupervisorAccount
                size={"21"}
                cursor={"pointer"}
                color={colorMode === "light" ? "#718096" : "#fff"}
              />
            </Link>
          </Box>
        </Tooltip>

        <Tooltip label="Employees" fontSize="md" placement="right">
          <Box as="span">
            <Link href={`/${user.slug}/employees`}>
              <MdAddReaction
                size={"21"}
                cursor={"pointer"}
                color={colorMode === "light" ? "#718096" : "#fff"}
              />
            </Link>
          </Box>
        </Tooltip>
        <Tooltip label="Expenses" fontSize="md" placement="right">
          <Box as="span">
            <Link href={`/${user.slug}/expenses`}>
              <MdBuild
                size={"21"}
                cursor={"pointer"}
                color={colorMode === "light" ? "#718096" : "#fff"}
              />
            </Link>
          </Box>
        </Tooltip>
        <Tooltip label="Reports" fontSize="md" placement="right">
          <Box as="span">
            <Link href={`/${user.slug}/reports`}>
              <MdLibraryBooks
                size={"21"}
                cursor={"pointer"}
                color={colorMode === "light" ? "#718096" : "#fff"}
              />
            </Link>
          </Box>
        </Tooltip>
      </Stack>
      <Box flex={"1"} p={"1rem"} pt={"2rem"}>
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
