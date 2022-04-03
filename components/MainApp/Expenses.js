import React, { useState, useEffect } from "react";
import ExpenseStats from "../MainApp/ExpenseStats";
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
  Heading,
  Textarea,
  Tooltip,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Grid,
} from "@chakra-ui/react";
import { BsArrowUp, BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import { expenseActions } from "../../store/expenseSlice";
import {
  addExpense,
  updateQuickExps,
  removeExpense,
  retrieveExpenseData,
} from "../../actions/expenses";
import { useSelector, useDispatch } from "react-redux";
import {
  IoIosAdd,
  IoIosCheckmark,
  IoIosClose,
  IoIosAddCircleOutline,
  IoIosStats,
} from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { getDateByYear } from "../../utils/helpers";
const Expenses = () => {
  const [amountError, setAmountError] = useState(false);
  const [descError, setDescError] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { company } = useRouter().query;

  const {
    isOpen: isExpOpen,
    onOpen: onExpOpen,
    onClose: onExpClose,
  } = useDisclosure();
  const {
    isOpen: isQuickAddOpen,
    onOpen: onQuickAddOpen,
    onClose: onQuickAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isStatsOpen,
    onOpen: onStatsOpen,
    onClose: onStatsClose,
  } = useDisclosure();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { expenses, expense, quickExpenses } = useSelector(
    (state) => state.expenses
  );
  const headings = ["Date", "Amount", "Description"];
  const [searchTerm, setSearchTerm] = useState("");

  const [removeIndex, setRemoveIndex] = useState(null);
  const [inputDropName, setInputDropName] = useState("");

  const addExpenseHandler = async () => {
    if (!expense.amount) {
      setAmountError(true);
      return;
    }
    if (expense.desc === "") {
      setDescError(true);
      return;
    }

    //Add to expenses array
    dispatch(expenseActions.addToExpenses(expense));
    //Submit expenses to db
    await addExpense(user._id, expense);

    const data = await retrieveExpenseData(company);
    dispatch(expenseActions.setExpData(data));
    //clear fields
    dispatch(expenseActions.clearFields());
    onExpClose();
  };

  const saveQuickExpHandler = async () => {
    await updateQuickExps(user._id, quickExpenses);
    onQuickAddClose();
  };

  const sortAsc = (type) => {
    dispatch(expenseActions.sortCollectionAsc(type));
  };
  const sortDesc = (type) => {
    dispatch(expenseActions.sortCollectionDesc(type));
  };

  const removeExpenseHandler = async () => {
    // remove expense from expense state
    dispatch(expenseActions.removeExpense(removeIndex));

    //remove expense from db
    await removeExpense(user._id, expenses, removeIndex);

    const data = await retrieveExpenseData(company);
    dispatch(expenseActions.setExpData(data));

    setInputDropName("");
    onEditClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveExpenseData(company);
      dispatch(expenseActions.setExpData(data));
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      {/* Expense Modal */}
      <Modal
        isOpen={isExpOpen}
        onClose={() => {
          onExpClose();
          setAmountError(false);
          setDescError(false);
          dispatch(expenseActions.clearFields());
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Expense</ModalHeader>
          <ModalCloseButton
            _focus={{ boxShadow: "none" }}
            onClick={() => {
              setAmountError(false);
              setDescError(false);
              dispatch(expenseActions.clearFields());
            }}
          />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="date" fontSize={"sm"}>
                Date
              </FormLabel>
              <Input
                id="date"
                type="date"
                size={"sm"}
                value={getDateByYear()}
                onChange={(e) => {
                  dispatch(expenseActions.setExpense(e.target.value));
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="amount" fontSize={"sm"}>
                Amount
              </FormLabel>
              <Flex align={"center"} gap={".5rem"}>
                <Input
                  id="amount"
                  type="number"
                  size={"sm"}
                  value={expense.amount === 0 ? "" : expense.amount}
                  onChange={(e) => {
                    dispatch(
                      expenseActions.setAmount(parseFloat(e.target.value))
                    );
                    setAmountError(false);
                  }}
                />

                {expenses.length > 0 && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant={"ghost"}
                      rightIcon={<IoIosAddCircleOutline />}
                      _focus={{ boxShadow: "none" }}
                      _active={{ bg: "none" }}
                      _hover={{ bg: "none" }}
                    />

                    <MenuList fontSize={"sm"}>
                      {quickExpenses.amount.length === 0 ? (
                        <Text textAlign={"center"} p={3}>
                          No amount quick note set up
                        </Text>
                      ) : (
                        <>
                          {quickExpenses.amount.map((amt) => (
                            <MenuItem
                              onClick={() =>
                                dispatch(expenseActions.quickAmt(amt))
                              }
                            >
                              {amt}
                            </MenuItem>
                          ))}
                        </>
                      )}
                    </MenuList>
                  </Menu>
                )}
              </Flex>

              {amountError && <Text color={"red.400"}>Amount required</Text>}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="desc" fontSize={"sm"}>
                Description
              </FormLabel>
              <Flex align={"center"} gap={".5rem"}>
                <Textarea
                  id="desc"
                  size={"sm"}
                  value={expense.desc}
                  onChange={(e) => {
                    dispatch(expenseActions.setDesc(e.target.value));
                    setDescError(false);
                  }}
                />

                {expenses.length > 0 && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant={"ghost"}
                      rightIcon={<IoIosAddCircleOutline />}
                      _focus={{ boxShadow: "none" }}
                      _active={{ bg: "none" }}
                      _hover={{ bg: "none" }}
                    />
                    <MenuList fontSize={"sm"}>
                      {quickExpenses.desc.length === 0 ? (
                        <Text textAlign={"center"} p={3}>
                          No description quick note set up
                        </Text>
                      ) : (
                        <>
                          {quickExpenses.desc.map((desc) => (
                            <MenuItem
                              onClick={() =>
                                dispatch(expenseActions.quickDesc(desc))
                              }
                            >
                              {desc}
                            </MenuItem>
                          ))}
                        </>
                      )}
                    </MenuList>
                  </Menu>
                )}
              </Flex>

              {descError && (
                <Text color={"red.400"}>Description is required</Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              size={"sm"}
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onExpClose();
                setAmountError(false);
                setDescError(false);
                dispatch(expenseActions.clearFields());
              }}
            >
              Close
            </Button>
            <Button onClick={addExpenseHandler} size={"sm"}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Expense Modal */}
      <Modal onClose={onEditClose} size={"xl"} isOpen={isEditOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"sm"}>Remove Expense</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Stack>
              <>
                <Box fontSize={"sm"}>
                  To remove this expense type{" "}
                  <Text display={"inline"} fontWeight={"semibold"}>
                    {user.firstName}
                  </Text>{" "}
                  in the box below. Please note this is permanent and cannot be
                  undone
                </Box>
                <Input
                  size={"sm"}
                  placeholder="Enter name"
                  value={inputDropName}
                  onChange={(e) => setInputDropName(e.target.value)}
                />
              </>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              size={"sm"}
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setInputDropName("");
                onEditClose();
              }}
            >
              Cancel
            </Button>
            <Button
              size={"sm"}
              bg={"red.400"}
              _hover={{
                bg: "red.300",
              }}
              _active={{
                bg: "red.300",
              }}
              disabled={inputDropName !== user?.firstName}
              onClick={removeExpenseHandler}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Set up quick expenses */}
      <Modal onClose={onQuickAddClose} size={"xl"} isOpen={isQuickAddOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Add Quick Expense</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Text fontWeight={"semibold"} fontSize={"sm"}>
              Amount
            </Text>
            {quickExpenses.amount?.length === 0 ? (
              <Flex align={"center"} gap={"3rem"} mb={"1rem"}>
                <Text fontSize={"sm"}>
                  No quick notes for Amount - click the plus to set up
                </Text>
                <IoIosAdd
                  size={25}
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(expenseActions.addFirstAmount());
                  }}
                />
              </Flex>
            ) : (
              quickExpenses.amount?.map((amt, index) => (
                <>
                  <Flex>
                    <Input
                      mb={"1rem"}
                      size={"sm"}
                      placeholder={amt === "" ? amt : ""}
                      value={amt}
                      onChange={(e) => {
                        dispatch(
                          expenseActions.updateService({
                            type: "amount",
                            index,
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                    <IoIosCheckmark
                      size={35}
                      cursor={"pointer"}
                      onClick={() => {
                        dispatch(expenseActions.addAmount(index));
                      }}
                    />
                    <IoIosClose
                      size={35}
                      onClick={() => {
                        dispatch(expenseActions.removeAmount(index));
                      }}
                      cursor={"pointer"}
                    />
                  </Flex>
                </>
              ))
            )}
            <Text fontWeight={"semibold"} fontSize={"sm"}>
              Description
            </Text>
            {quickExpenses.desc?.length === 0 ? (
              <Flex align={"center"} gap={"3rem"}>
                <Text fontSize={"sm"}>
                  No quick notes for Descriptions - click the plus to set up
                </Text>
                <IoIosAdd
                  size={25}
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(expenseActions.addFirstDescription());
                  }}
                />
              </Flex>
            ) : (
              quickExpenses.desc?.map((desc, index) => (
                <>
                  <Flex align={"center"}>
                    <Input
                      placeholder={desc === "" ? desc : ""}
                      value={desc}
                      onChange={(e) => {
                        dispatch(
                          expenseActions.updateService({
                            type: "desc",
                            index,
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                    <IoIosCheckmark
                      size={35}
                      cursor={"pointer"}
                      onClick={() => {
                        dispatch(expenseActions.addDescription(index));
                      }}
                    />
                    <IoIosClose
                      size={35}
                      onClick={() => {
                        dispatch(expenseActions.removeDescription(index));
                      }}
                      cursor={"pointer"}
                    />
                  </Flex>
                </>
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onQuickAddClose}
              size={"sm"}
            >
              Close
            </Button>
            <Button onClick={saveQuickExpHandler} size={"sm"}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Stats Modal*/}
      <Modal isOpen={isStatsOpen} onClose={onStatsClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Expense Stats</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <ExpenseStats />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onStatsClose}
              size={"sm"}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Stack spacing={expenses.length === 0 ? "" : "1rem"}>
        <Flex
          mt={expenses.length === 0 ? "10rem" : "0"}
          mb={".5rem"}
          align={"center"}
          justifyContent={expenses.length === 0 ? "center" : "space-between"}
        >
          <Flex gap={"1rem"} align={"center"}>
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
              onClick={onExpOpen}
              size={"sm"}
            >
              Add Expense
            </Button>
            {expenses.length > 0 && (
              <>
                <Box>
                  <Tooltip label="Quick Expenses" fontSize="md">
                    <span>
                      <IoIosAdd
                        size={25}
                        cursor={"pointer"}
                        onClick={onQuickAddOpen}
                      />
                    </span>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip label="Expense Stats" fontSize="md">
                    <span>
                      <IoIosStats
                        size={20}
                        cursor={"pointer"}
                        onClick={onStatsOpen}
                      />
                    </span>
                  </Tooltip>
                </Box>
              </>
            )}
          </Flex>

          {expenses.length > 0 && (
            <>
              <Heading size={"sm"}>Expenses</Heading>

              <InputGroup w={"25%"} size={"sm"}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Search expenses"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </InputGroup>
            </>
          )}
        </Flex>

        {expenses.length === 0 ? (
          <>
            <Grid placeItems={"center"} pt={"1rem"}>
              <Box>
                <BsArrowUp size={45} />
              </Box>
              <Text fontSize={"md"} pt={"1rem"}>
                Add your first expense by clicking 'Add Expense'
              </Text>
            </Grid>
          </>
        ) : (
          <Table variant={"simple"} fontSize={"sm"}>
            <Thead>
              <Tr>
                {headings.map((heading) => (
                  <Th key={heading}>
                    <Flex align={"center"} gap={"1rem"}>
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
              {expenses
                ?.filter((expense) => {
                  if (searchTerm === "") {
                    return expense;
                  } else if (
                    expense.empFullName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    expense.empPhoneNumber
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    expense.empEmail
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    expense.empGender
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    expense.empAddress.empStreet
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    expense.empAddress.empCity
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    expense.empAddress.empState
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    expense.empAddress.empZipCode
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return expense;
                  }
                })
                .map((expense, index) => (
                  <Tr
                    _hover={{
                      color: colorMode === "light" ? "gray.800" : "gray.800",
                      bg: "gray.200",
                    }}
                    cursor={"pointer"}
                  >
                    <Td>{expense.date}</Td>
                    <Td>${expense.amount.toFixed(2)}</Td>
                    <Td>{expense.desc}</Td>

                    <Flex align={"center"} gap={"1rem"} mt={".75rem"}>
                      <Tooltip label="Remove Expense" fontSize="md">
                        <span>
                          <IoIosClose
                            size={30}
                            onClick={() => {
                              setRemoveIndex(index);
                              onEditOpen();
                            }}
                          />
                        </span>
                      </Tooltip>
                    </Flex>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </Stack>
    </>
  );
};

export default Expenses;
