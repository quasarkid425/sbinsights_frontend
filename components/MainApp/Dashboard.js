import React, { useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import DashboardPieChart from "./DashboardPieChart";
import DashboardLineChart from "./DashboardLineChart";
import {
  Heading,
  Stack,
  Grid,
  GridItem,
  Box,
  Flex,
  Button,
  Badge,
  Text,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { chartData } from "../../actions/accounts";
import {
  retrieveUserData,
  retrieveDashboardPieData,
} from "../../actions/users";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Link from "next/link";
import { accountActions } from "../../store/accountSlice";
import { employeeActions } from "../../store/employeeSlice";
import { expenseActions } from "../../store/expenseSlice";
import { chartActions } from "../../store/chartSlice";
import { userActions } from "../../store/userSlice";

const Dashboard = ({ pieDashData, lineDashData }) => {
  const { user, calledOnce } = useSelector((state) => state.user);
  const router = useRouter();
  const { accounts } = useSelector((state) => state.accounts);
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const chartHandler = async (type) => {
    const data = await chartData(user._id, type);
    dispatch(chartActions.setDashBoardChart(data));
  };

  const viewHistoryHandler = (accountId, serviceId) => {
    const { services } = accounts.find((acc) => acc._id === accountId);
    console.log(services);
    const serviceIndex = services.findIndex((serv) => serv._id === serviceId);
    //set the index of the view item
    dispatch(
      userActions.viewHistoryTrue({
        index: serviceIndex,
      })
    );
    router.push(`/${user.slug}/account/${accountId}`);
  };

  //perform this every time to get updated data
  useEffect(() => {
    const fetchData = async () => {
      //start by getting the updated billed weekly paid and unpaid data
      const data = await chartData(user._id, "billed-paid-unpaid-weekly");
      dispatch(chartActions.setDashBoardChart(data));

      //get the data for the pie chart
      const pieData = await retrieveDashboardPieData(user._id);
      dispatch(chartActions.setPieData(pieData));
    };

    fetchData().catch(console.error);
  }, []);

  //perform this action just once
  useEffect(() => {
    const fetchData = async () => {
      const { accounts, employees, expenses } = await retrieveUserData(
        user?._id
      );
      //set accounts
      dispatch(accountActions.setAccounts(accounts));
      //set employees
      dispatch(employeeActions.setEmployees(employees));
      //set expenses
      dispatch(expenseActions.setExpenses(expenses));

      dispatch(userActions.calledTrue());
    };

    setTimeout(() => {
      if (!calledOnce) {
        fetchData().catch(console.error);
      }
    }, 3000);
  }, []);

  return (
    <>
      {!calledOnce ? (
        <LoadingScreen />
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" templateRows="auto" gap={4}>
          <GridItem
            colSpan={{ base: 4, md: 3 }}
            bg={colorMode === "light" ? "gray.50" : "#272d38"}
            borderRadius={".5rem"}
            position={"relative"}
          >
            <Select
              w={"20%"}
              position={"absolute"}
              h={"30px"}
              onChange={(e) => chartHandler(e.target.value)}
              _focus={{ boxShadow: "none" }}
              fontSize={".85rem"}
            >
              <option value={"billed-paid-unpaid-weekly"}>
                Profit Billed Paid Unpaid Accounts Weekly
              </option>
              <option value={"billed-paid-weekly"}>
                Profit Billed Paid Accounts Weekly
              </option>
              <option value={"billed-unpaid-weekly"}>
                Profit Billed Unpaid Accounts Weekly
              </option>
              <option value={"billed-paid-unpaid-saved-weekly"}>
                Potential Profit Billed Paid Unpaid Saved Weekly
              </option>
            </Select>
            <DashboardLineChart data={lineDashData} />
          </GridItem>
          <GridItem
            colSpan={{ base: 4, md: 1 }}
            bg={colorMode === "light" ? "gray.50" : "#272d38"}
            borderRadius={".5rem"}
          >
            <Box w={"80%"} margin={"0 auto"}>
              <DashboardPieChart data={pieDashData} />
            </Box>
          </GridItem>
          <GridItem
            colSpan={4}
            bg={colorMode === "light" ? "gray.50" : "#272d38"}
            borderRadius={".5rem"}
            h={"20rem"}
            overflowY={"auto"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "16px",
                borderRadius: "8px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            <Flex justifyContent={"space-around"}>
              <Stack p={2}>
                <Heading size={"1.4rem"}>Recently Billed Invoices</Heading>
                <Box fontSize={"sm"}>
                  {accounts?.map((acc) =>
                    acc.services.map((service) => (
                      <>
                        <Flex
                          key={uuidv4()}
                          gap={"1rem"}
                          align={"center"}
                          mb={1}
                        >
                          <Box>{service.fullName}</Box>
                          <Box>{service.date}</Box>
                          <Box>${service.total}</Box>
                          <Flex align={"center"} gap={".2rem"}>
                            <Badge
                              bg={
                                service.paid === true ? "green.300" : "red.300"
                              }
                              color={colorMode === "dark" && "#000"}
                              px={3}
                              py={1}
                            >
                              {service.paid === true ? "Paid" : "Not Paid"}
                            </Badge>
                          </Flex>
                          <Box>
                            <Button
                              onClick={() => {
                                viewHistoryHandler(acc._id, service._id);
                              }}
                              variant={"ghost"}
                              _hover={{
                                bg: "btn_hover.100",
                                color: "#fff",
                              }}
                              _active={{
                                bg: "none",
                              }}
                              _focus={{ boxShadow: "none" }}
                            >
                              View
                            </Button>
                          </Box>
                        </Flex>
                      </>
                    ))
                  )}
                </Box>
              </Stack>
              <Stack p={2}>
                <Heading size={"1.4rem"}>Saved Pending Invoices</Heading>
                <Box fontSize={"sm"}>
                  {accounts?.map((acc) =>
                    acc.entries.map((entry, index) =>
                      entry.service === "" && entry.desc === "" ? (
                        ""
                      ) : index === 0 ? (
                        <Link
                          href={`/${user.slug}/account/${acc._id}`}
                          key={index}
                        >
                          <Text
                            key={index}
                            cursor={"pointer"}
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
                            {acc.accFullName}
                          </Text>
                        </Link>
                      ) : (
                        ""
                      )
                    )
                  )}
                </Box>
              </Stack>
            </Flex>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
