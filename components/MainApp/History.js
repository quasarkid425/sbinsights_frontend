import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  OrderedList,
  ListItem,
  Text,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
  Input,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { accountActions } from "../../store/accountSlice";
import {
  pay,
  unPay,
  removeEntry,
  invoiceDetails,
  retrieveAccountData,
} from "../../actions/accounts";
import {
  AiOutlineClose,
  AiOutlinePrinter,
  AiOutlineMail,
} from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import PrintInvoice from "./PrintInvoice";
import { selectState } from "../../utils/helpers";
import { userActions } from "../../store/userSlice";

const History = ({ modifyRef }) => {
  const [inputDropName, setInputDropName] = useState("");
  const [invStreet, setInvStreet] = useState("");
  const [streetErr, setStreetErr] = useState(false);
  const [invCity, setInvCity] = useState("");
  const [cityErr, setCityErr] = useState(false);
  const [invState, setInvState] = useState("");
  const [stateErr, setStateErr] = useState(false);
  const [invZip, setInvZip] = useState("");
  const [zipErr, setZipErr] = useState(false);
  const [invPhone, setInvPhone] = useState("");
  const [invSig, setInvSig] = useState("");
  const [entryId, setEntryId] = useState("");
  const [date, setDate] = useState("asc");
  const [paid, setPaid] = useState("yes");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.accounts);
  const { printInfo } = useSelector((state) => state.accounts);
  const router = useRouter();
  const { company, accNo } = router.query;
  const toast = useToast();
  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose,
  } = useDisclosure();
  const {
    isOpen: isInvOpen,
    onOpen: onInvOpen,
    onClose: onInvClose,
  } = useDisclosure();

  const year = new Date().toDateString().slice(-4);
  const componentRef = useRef();

  const payHandler = async (id) => {
    dispatch(accountActions.pay({ service: id }));

    const serviceIndex = account.services.findIndex(
      (acc) => acc._id.toString() === id
    );

    await pay(user._id, accNo, id, account.services, serviceIndex);
  };

  const unPayHandler = async (id) => {
    dispatch(accountActions.unPay({ service: id }));

    const serviceIndex = account.services.findIndex(
      (acc) => acc._id.toString() === id
    );

    await unPay(user._id, accNo, id, account.services, serviceIndex);
  };

  const sortByDate = () => {
    if (date === "asc") {
      dispatch(accountActions.sortServicesByDate({ date }));
      setDate("desc");
    } else {
      dispatch(accountActions.sortServicesByDate({ date }));
      setDate("asc");
    }
  };

  const sortByPay = () => {
    if (paid === "yes") {
      dispatch(accountActions.sortServicesByPay({ accNo, paid }));
      setPaid("no");
    } else {
      dispatch(accountActions.sortServicesByPay({ accNo, paid }));
      setPaid("yes");
    }
  };

  const removeEntryHandler = async () => {
    //Remove from account state
    dispatch(
      accountActions.removeAccountService({
        accNo,
        service: entryId,
      })
    );
    //Remove from services database

    const serviceIndex = account.services.findIndex(
      (acc) => acc._id.toString() === entryId
    );

    await removeEntry(user._id, accNo, entryId, account.services, serviceIndex);

    const data = await retrieveAccountData(company, accNo);
    dispatch(accountActions.setAccData(data));
    onRemoveClose();
    setInputDropName("");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onPrintHandler = () => {
    const account = printInfo.account;
    //Need to check for their invoiceInfo
    if (!user.invoiceInfo.setUp) {
      onInvOpen();
      return;
    }

    if (
      account.accAddress.addrCity === "" ||
      account.accAddress.addrFullName === "" ||
      account.accAddress.addrState === "" ||
      account.accAddress.addrStreet === "" ||
      account.accAddress.addrZipCode === ""
    ) {
      modifyRef.current.click();
      toast({
        description: "Fill out the empty billing fields",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      handlePrint();
    }
  };

  const submitInvoiceDetails = async () => {
    //set the invoice in the state to true
    if (invStreet === "") {
      setStreetErr(true);
      return;
    }
    if (invCity === "") {
      setCityErr(true);
      return;
    }
    if (invState == "") {
      setStateErr(true);
      return;
    }
    if (invZip === "") {
      setZipErr(true);
      return;
    }
    const invoiceEntry = {
      address: invStreet,
      city: invCity,
      state: invState,
      zip: invZip,
      phone: invPhone,
      signature: invSig,
    };

    // set the invoice details in the state
    dispatch(userActions.setInvoiceDetails({ entry: invoiceEntry }));
    //set the invoice details in the db
    await invoiceDetails(user._id, invoiceEntry);
    onInvClose();

    if (
      account.accAddress.addrCity === "" ||
      account.accAddress.addrFullName === "" ||
      account.accAddress.addrState === "" ||
      account.accAddress.addrStreet === "" ||
      account.accAddress.addrZipCode === ""
    ) {
      modifyRef.current.click();
      toast({
        description:
          "Fill out the empty billing fields and then return to print",
        position: "top",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    } else {
      handlePrint();
    }
  };

  return (
    <>
      {/* Cancel Modal */}
      <Modal
        isOpen={isRemoveOpen}
        onClose={() => {
          setInputDropName("");
          onRemoveClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Delete Invoice</ModalHeader>
          <ModalCloseButton
            _focus={{
              outline: "none",
            }}
          />
          <ModalBody>
            <Stack>
              <Box fontSize={"sm"}>
                To remove this invoice entry for{" "}
                <Text display={"inline"} fontWeight={"semibold"}>
                  {account?.accFullName}
                </Text>
                , type the name in the box below. Please note this is permanent
                and cannot be undone
              </Box>
              <Input
                size={"sm"}
                placeholder="Enter name"
                value={inputDropName}
                onChange={(e) => setInputDropName(e.target.value)}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              size={"sm"}
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setInputDropName("");
                onRemoveClose();
              }}
              color={"#000"}
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
              disabled={inputDropName !== account?.accFullName}
              onClick={removeEntryHandler}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Invoice Modal */}
      <Modal isOpen={isInvOpen} onClose={onInvClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice Details</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Stack>
              <Alert status="error">
                <AlertIcon />
                Your invoice details are not set up. Please fill in the required
                field below. These can be edited by going to the dropdown menu
                on the top right of the page
              </Alert>
              <FormControl isRequired>
                <FormLabel htmlFor="street">Street</FormLabel>
                <Input
                  id="street"
                  type="text"
                  value={invStreet}
                  onChange={(e) => {
                    setStreetErr(false);
                    setInvStreet(e.target.value);
                  }}
                />
                {streetErr && (
                  <Text color={"red.400"}>Street must be filled out.</Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  id="city"
                  type="text"
                  value={invCity}
                  onChange={(e) => {
                    setCityErr(false);
                    setInvCity(e.target.value);
                  }}
                />
                {cityErr && (
                  <Text color={"red.400"}>City must be filled out.</Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="invState">State</FormLabel>
                <Select
                  id="invState"
                  value={invState}
                  onChange={(e) => {
                    setStateErr(false);
                    setInvState(e.target.value);
                  }}
                >
                  {selectState()}
                </Select>
                {stateErr && (
                  <Text color={"red.400"}>State must be filled out.</Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="zip">Zip Code</FormLabel>
                <Input
                  id="zip"
                  type="text"
                  value={invZip}
                  onChange={(e) => {
                    setZipErr(false);
                    setInvZip(e.target.value);
                  }}
                />
                {zipErr && (
                  <Text color={"red.400"}>Zip code must be filled out.</Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <Input
                  id="phone"
                  type="text"
                  value={invPhone}
                  onChange={(e) => setInvPhone(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="sig">Invoice signature</FormLabel>
                <Textarea
                  id="sig"
                  value={invSig}
                  onChange={(e) => setInvSig(e.target.value)}
                  placeholder={"Ex. Thank your for your business"}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onInvClose}>
              Close
            </Button>
            <Button onClick={submitInvoiceDetails}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {account?.services?.length === 0 ? (
        ""
      ) : (
        <Flex justify={"end"} gap={"1rem"} pb={".75rem"}>
          <Tooltip label="Date" fontSize="md">
            <span>
              <BiSortAlt2
                size={20}
                cursor={"pointer"}
                color={"gray"}
                onClick={sortByDate}
              />
            </span>
          </Tooltip>
          <Tooltip label="Paid status" fontSize="md">
            <span>
              <BiSortAlt2
                size={20}
                cursor={"pointer"}
                color={"gray"}
                onClick={sortByPay}
              />
            </span>
          </Tooltip>
        </Flex>
      )}

      {account?.services?.length === 0 ? (
        <Text fontSize={"sm"}> No history</Text>
      ) : (
        <Accordion defaultIndex={[0]} allowMultiple>
          {account?.services?.map((acc, index) => (
            <>
              <AccordionItem
                key={index}
                onMouseEnter={() =>
                  dispatch(
                    accountActions.setPrintAccount({
                      index,
                    })
                  )
                }
              >
                <h2>
                  <Flex align={"center"}>
                    <AccordionButton _focus={{ boxShadow: "none" }}>
                      <Box flex="1" textAlign="left">
                        <Flex gap={".5rem"}>
                          <Text fontWeight={"semibold"}>Billed Date:</Text>
                          <Text fontSize={"sm"}> {acc.date}</Text>
                        </Flex>
                      </Box>
                      <Box>
                        <Flex align={"center"} gap={".5rem"}>
                          <Text fontWeight={"semibold"} fontSize={"sm"}>
                            Paid:
                          </Text>
                          <Badge
                            size={"sm"}
                            bg={acc.paid ? "btn.200" : "red.400"}
                          >
                            {acc.paid ? "Yes" : "No"}
                          </Badge>
                        </Flex>
                      </Box>

                      <AccordionIcon />
                    </AccordionButton>
                    <AiOutlineClose
                      cursor={"pointer"}
                      onClick={() => {
                        setEntryId(acc._id);
                        onRemoveOpen();
                      }}
                    />
                  </Flex>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack>
                    <Box>
                      <Flex gap={".5rem"}>
                        <Text fontWeight={"semibold"}>Total:</Text>
                        <Text fontSize={"sm"}>
                          ${parseInt(acc.total).toFixed(2)}
                        </Text>
                      </Flex>

                      <Text fontWeight={"semibold"}>Services:</Text>
                      <Box>
                        <OrderedList fontSize={"sm"}>
                          {acc?.services?.map((service, index) => (
                            <>
                              <ListItem key={index}>
                                {service.date.substring(5).concat(`-${year}`)}
                                {service.service
                                  ? `- ${service.service}`
                                  : ""}{" "}
                                {service.desc ? `- ${service.desc}` : ""} -
                                {service.qty}x - ${service.total.toFixed(2)}
                              </ListItem>
                            </>
                          ))}
                        </OrderedList>
                      </Box>
                    </Box>

                    <Flex
                      justify={"space-between"}
                      align={"center"}
                      gap={"1rem"}
                    >
                      <Button
                        size={"sm"}
                        onClick={() =>
                          acc.paid ? unPayHandler(acc._id) : payHandler(acc._id)
                        }
                        bg={acc.paid ? "red.400" : "btn.200"}
                        _hover={{
                          bg: acc.paid ? "red.400" : "btn_hover.100",
                        }}
                        _active={{
                          bg: acc.paid ? "red.400" : "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#000"}
                      >
                        Mark {acc.paid ? "Not Paid" : "Paid"}
                      </Button>
                      <Flex gap={"1rem"}>
                        <Button
                          size={"sm"}
                          leftIcon={<AiOutlinePrinter />}
                          _focus={{ boxShadow: "none" }}
                          onClick={onPrintHandler}
                        >
                          Print
                        </Button>

                        <Box display={"none"}>
                          <PrintInvoice ref={componentRef} />
                        </Box>
                        <Button
                          size={"sm"}
                          leftIcon={<AiOutlineMail />}
                          _focus={{ boxShadow: "none" }}
                        >
                          Email
                        </Button>
                      </Flex>
                    </Flex>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default History;
