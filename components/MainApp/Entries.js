import React, { useState, useEffect } from "react";
import {
  Tooltip,
  Flex,
  Input,
  Textarea,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Grid,
  GridItem,
  Heading,
  Stack,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoIosAdd, IoIosClose, IoIosAddCircleOutline } from "react-icons/io";
import { BsArrowUp } from "react-icons/bs";
import { IoIosCheckboxOutline, IoIosCheckbox } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "../../store/accountSlice";
import { taxActions } from "../../store/taxSlice";
import { submitServiceEntry, saveEntries } from "../../actions/entries";
import { retrieveAccountData, retrieveAccount } from "../../actions/accounts";
import { useRouter } from "next/router";
import { numberArray, getDateByMonth } from "../../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import QuickNotes from "./accounts/modals/QuickNotes";
import Tax from "./accounts/modals/Tax";

const Entries = ({ historyRef }) => {
  const router = useRouter();
  const { company: slug, accNo } = router.query;
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.accounts);

  const { accounts } = useSelector((state) => state.accounts);
  const { taxes, selectedStates } = useSelector((state) => state.taxes);
  const { user } = useSelector((state) => state.user);
  const [option, setOption] = useState("service");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
  const [quickService, setQuickService] = useState("");
  const [quickDesc, setQuickDesc] = useState("");
  const [error, setError] = useState(false);
  const toast = useToast();
  const accountIndex = accounts?.findIndex((acc) => acc._id === account?._id);

  const {
    isOpen: isQuickOpen,
    onOpen: onQuickOpen,
    onClose: onQuickClose,
  } = useDisclosure();

  const totalPrice = account?.entries?.reduce((total, item) => {
    return total + item.total;
  }, 0);

  const recordHandler = async () => {
    let flag = false;
    account?.entries?.forEach((entry) => {
      if (entry.service === "" && entry.desc === "") {
        flag = true;
      }
    });

    if (flag) {
      setError(true);
    } else {
      const entry = {
        _id: uuidv4().substring(0, 8),
        fullName: account.accFullName,
        total: parseFloat(totalPrice),
        services: account.entries,
        billed: true,
        paid: false,
        date: getDateByMonth(),
        chartDate: getDateByMonth(),
      };

      await submitServiceEntry(user._id, accNo, entry);

      dispatch(accountActions.addServices({ entry }));

      historyRef.current.click();

      dispatch(accountActions.clearEntries());

      const data = await retrieveAccountData(slug, accNo);
      dispatch(accountActions.setAccData(data));

      setError(false);

      toast({
        description: "Recorded successfully",
        position: "bottom-left",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const saveHandler = async () => {
    let flag = false;
    account?.entries?.forEach((entry) => {
      if (entry.service === "" && entry.desc === "") {
        flag = true;
      }
    });

    if (flag) {
      setError(true);
    } else {
      await saveEntries(user._id, accNo, account?.entries);
      setError(false);
      toast({
        description: "Saved successfully",
        position: "bottom-left",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, taxData } = await retrieveAccount(slug, accNo);
      dispatch(accountActions.setAccount({ account: data }));
      dispatch(taxActions.setTax(taxData));
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      {error && (
        <Alert status="error" my={"1rem"}>
          <AlertIcon />
          <AlertTitle mr={2} fontSize={"sm"}>
            At least one field is empty!
          </AlertTitle>
          <AlertDescription fontSize={"sm"}>
            Fill out the either the Product / Service field, Description field,
            or remove the row completely to continue
          </AlertDescription>
          <CloseButton
            size={"sm"}
            _hover={{ background: "none" }}
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setError(false)}
          />
        </Alert>
      )}
      {/* Quick Notes Modal */}

      {/* Add Quick Product / Desc Modal */}
      <Modal isOpen={isQuickOpen} onClose={onQuickClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>
            Add Quick{" "}
            {option === "service" ? "Product / Service" : "Description"}
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody fontSize={"sm"}>
            {option === "service" ? (
              user?.quickServices?.length === 0 ? (
                <Text>
                  Product / Service quick notes are not set up yet - Click the
                  &lsquo;Quick Notes&rsquo; icon in the top right to set up
                </Text>
              ) : (
                user?.quickServices?.map((service, index) => (
                  <Input
                    key={index}
                    size={"sm"}
                    placeholder={service}
                    mb={".5rem"}
                    cursor={"pointer"}
                    style={{
                      color: "transparent",
                      textShadow: "0 0 0",
                    }}
                    onClick={() => setQuickService(service)}
                  />
                ))
              )
            ) : user?.quickDescriptions?.length === 0 ? (
              <Text>
                Description quick notes are not set up yet - Click the
                &lsquo;Quick Notes&rsquo; icon in the top right to set up
              </Text>
            ) : (
              user?.quickDescriptions?.map((service, index) => (
                <Input
                  key={index}
                  size={"sm"}
                  placeholder={service}
                  mb={".5rem"}
                  cursor={"pointer"}
                  style={{
                    color: "transparent",
                    textShadow: "0 0 0",
                  }}
                  onClick={() => setQuickDesc(service)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onQuickClose}
              size={"sm"}
            >
              Close
            </Button>
            <Button
              size={"sm"}
              onClick={() => {
                option === "service"
                  ? dispatch(
                      accountActions.setQuickNote({
                        type: "service",
                        index: serviceIndex,
                        value: quickService,
                      })
                    )
                  : dispatch(
                      accountActions.setQuickNote({
                        type: "desc",
                        index: descIndex,
                        value: quickDesc,
                      })
                    );
                onQuickClose();
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Tax Modal */}

      <Flex justify="end" w={"100%"} gap={"1rem"} align={"center"}>
        {taxes.taxSetUp && <QuickNotes />}

        <Tax />
      </Flex>
      {taxes.taxSetUp ? (
        <>
          {" "}
          <Grid
            templateColumns={{ base: "1fr", md: "2fr 4fr repeat(6, 1fr)" }}
            gap={6}
            fontWeight={"semibold"}
            justifyContent={"center"}
          >
            {account?.entries?.map((entry, index) => (
              <>
                <GridItem colSpan={{ base: "2", md: "1", lg: "1" }} key={index}>
                  {index === 0 && (
                    <Heading
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      textAlign={"center"}
                      mb={index === 0 ? ".75rem" : ""}
                    >
                      Product / Service
                    </Heading>
                  )}

                  <Flex justify={"center"} align={"start"} gap={".2rem"}>
                    <Input
                      size={"sm"}
                      value={entry.service}
                      onChange={(e) => {
                        dispatch(
                          accountActions.recordField({
                            field: "service",
                            value: e.target.value,
                            index,
                          })
                        );
                      }}
                    />
                    <Tooltip label="Add quick note" fontSize="md">
                      <span>
                        <IoIosAddCircleOutline
                          size={17}
                          cursor={"pointer"}
                          onClick={() => {
                            setOption("service");
                            setServiceIndex(index);
                            setDescIndex(index);
                            onQuickOpen();
                          }}
                        />
                      </span>
                    </Tooltip>
                  </Flex>
                </GridItem>
                <GridItem colSpan={{ base: "2", md: "2", lg: "1" }}>
                  {index === 0 && (
                    <Heading
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      textAlign={"center"}
                      mb={index === 0 ? ".75rem" : ""}
                    >
                      Description
                    </Heading>
                  )}

                  <Flex justify={"center"} align={"start"} gap={".2rem"}>
                    <Textarea
                      size={"sm"}
                      value={entry.desc}
                      onChange={(e) => {
                        dispatch(
                          accountActions.recordField({
                            field: "description",
                            index,
                            value: e.target.value,
                          })
                        );
                      }}
                      h={"100px"}
                    />
                    <Tooltip label="Add quick note" fontSize="md">
                      <span>
                        <IoIosAddCircleOutline
                          size={17}
                          cursor={"pointer"}
                          onClick={() => {
                            setOption("desc");
                            setServiceIndex(index);
                            setDescIndex(index);
                            onQuickOpen();
                          }}
                        />
                      </span>
                    </Tooltip>
                  </Flex>
                </GridItem>
                <GridItem colSpan={{ base: "2", md: "1" }}>
                  {index === 0 && (
                    <Heading
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      textAlign={"center"}
                      mb={index === 0 ? ".75rem" : ""}
                    >
                      Qty
                    </Heading>
                  )}

                  <Flex justify={"center"}>
                    <Select
                      size={"sm"}
                      onChange={(e) => {
                        dispatch(
                          accountActions.recordField({
                            field: "qty",
                            index,
                            value: e.target.value,
                          })
                        );
                      }}
                      value={entry.qty}
                    >
                      {numberArray.map((num, index) => (
                        <option value={num} key={index}>
                          {num}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </GridItem>
                <GridItem colSpan={2}>
                  {index === 0 && (
                    <Heading
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      textAlign={"center"}
                      mb={index === 0 ? ".75rem" : ""}
                    >
                      Amount
                    </Heading>
                  )}

                  <Flex align={"center"} gap={".2rem"} justify={"center"}>
                    <Text fontSize={"sm"}>$</Text>
                    <Input
                      size={"sm"}
                      onChange={(e) => {
                        dispatch(
                          accountActions.recordField({
                            field: "amount",
                            index,
                            value: e.target.value,
                          })
                        );
                      }}
                      value={entry.amount}
                      type={"number"}
                    />
                  </Flex>
                </GridItem>
                <GridItem>
                  {index === 0 && (
                    <Heading
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      textAlign={"center"}
                      mb={index === 0 ? ".75rem" : ""}
                    >
                      Tax
                    </Heading>
                  )}

                  <Flex direction={"column"} align={"center"}>
                    <Flex align={"center"}>
                      {entry.tax ? (
                        <IoIosCheckbox size={22} />
                      ) : (
                        <IoIosCheckboxOutline size={22} />
                      )}

                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<IoIosAddCircleOutline />}
                          bg={"none"}
                          p={0}
                          ml={"-1.2rem"}
                          _hover={{
                            bg: "none",
                          }}
                          _active={{
                            bg: "none",
                          }}
                          _focus={{ boxShadow: "none" }}
                        />

                        <MenuList fontSize={"sm"}>
                          {selectedStates.map((state, index) => (
                            <MenuItem
                              key={index}
                              _hover={{ bg: "gray.200" }}
                              onClick={() =>
                                dispatch(
                                  accountActions.recordField({
                                    field: "tax",
                                    index: index,
                                    value: state,
                                  })
                                )
                              }
                            >
                              {state.name}
                            </MenuItem>
                          ))}
                          {selectedStates.length > 0 && (
                            <MenuItem
                              _hover={{ bg: "gray.200" }}
                              onClick={() =>
                                dispatch(
                                  accountActions.noSalesTax({
                                    index,
                                  })
                                )
                              }
                            >
                              No sales tax
                            </MenuItem>
                          )}
                        </MenuList>
                      </Menu>
                    </Flex>
                    <Text>{entry.tax ? entry.abbrevation : ""}</Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={{ md: "1fr" }}>
                  {index === 0 && (
                    <Heading
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      textAlign={"center"}
                      mb={index === 0 ? ".75rem" : ""}
                    >
                      Date
                    </Heading>
                  )}

                  <Flex justify={"center"}>
                    <Flex>
                      <Input
                        size={"sm"}
                        type={"date"}
                        onChange={(e) => {
                          dispatch(
                            accountActions.recordField({
                              field: "date",
                              accountIndex,
                              index,
                              value: e.target.value,
                            })
                          );
                        }}
                        value={entry.date}
                      />
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem mt={index === 0 ? "1.85rem" : ""}>
                  <Flex gap={".5rem"}>
                    <Tooltip label="Add field" fontSize="md">
                      <span>
                        <IoIosAdd
                          size={25}
                          cursor={"pointer"}
                          onClick={() => {
                            if (
                              account?.entries[index].service === "" &&
                              account?.entries[index].desc === ""
                            ) {
                              toast({
                                description:
                                  "Fill out either Product / Service or Description",
                                position: "top",
                                status: "error",
                                duration: 4000,
                                isClosable: true,
                              });
                              return;
                            } else {
                              dispatch(
                                accountActions.newField({ accountIndex })
                              );
                            }
                          }}
                        />
                      </span>
                    </Tooltip>
                    <Tooltip label="Remove field" fontSize="md">
                      <span>
                        {index !== 0 && (
                          <IoIosClose
                            size={30}
                            cursor={"pointer"}
                            onClick={() => {
                              dispatch(
                                accountActions.removeField({
                                  accountIndex,
                                  index,
                                })
                              );
                            }}
                          />
                        )}
                      </span>
                    </Tooltip>
                  </Flex>
                </GridItem>
              </>
            ))}
          </Grid>
          <Flex justify={"end"} mt={"1rem"}>
            <Stack>
              <Text fontWeight={"semibold"} fontSize={"lg"} textAlign={"right"}>
                Total:
              </Text>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                ${isNaN(totalPrice?.toFixed(2)) ? "" : totalPrice?.toFixed(2)}
              </Text>
            </Stack>
          </Flex>
          <Flex justify={"end"} mt={"1rem"} gap={".5rem"}>
            <Button
              size={"sm"}
              width={"15%"}
              bg={"btn.100"}
              _hover={{
                bg: "btn_hover.100",
              }}
              _active={{
                bg: "btn_hover.100",
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              onClick={saveHandler}
            >
              Save
            </Button>
            <Button
              size={"sm"}
              width={"15%"}
              bg={"btn.200"}
              _hover={{
                bg: "btn_hover.100",
              }}
              _active={{
                bg: "btn_hover.100",
              }}
              _focus={{ boxShadow: "none" }}
              color={"#000"}
              onClick={recordHandler}
            >
              Bill
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Flex align={"center"} gap={"3rem"} justify={"end"} mt={"5rem"}>
            <Text fontSize={"md"}>
              To start billing accounts, set up sales taxes by clicking on the
              &lsquo;$&rsquo;{" "}
            </Text>
            <Box mb={".5rem"}>
              <BsArrowUp size={45} />
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default Entries;
