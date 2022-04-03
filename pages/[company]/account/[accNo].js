import React, { useState, useRef, useEffect } from "react";
import Entries from "../../../components/MainApp/Entries";
import History from "../../../components/MainApp/History";
import AccountStats from "../../../components/MainApp/AccountStats";
import {
  Container,
  Stack,
  Heading,
  Box,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  updateAccountInfo,
  removeAccount,
  retrieveAccountData,
} from "../../../actions/accounts";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "../../../store/accountSlice";
import { IoTrashOutline } from "react-icons/io5";
import { selectState } from "../../../utils/helpers";

const AccNo = () => {
  const router = useRouter();
  const { company: slug, accNo } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const account = useSelector(
    (state) =>
      state?.accounts?.accounts?.filter(
        (acc) => acc._id.toString() === accNo
      )[0]
  );

  const dispatch = useDispatch();
  const toast = useToast();
  const [aName, setAName] = useState("");
  const [aPhone, setAPhone] = useState("");
  const [aEmail, setAEmail] = useState("");
  const [adrCity, setAdrCity] = useState("");
  const [adrName, setAdrName] = useState("");
  const [adrStreet, setAdrStreet] = useState("");
  const [adrState, setAdrState] = useState(account?.accAddress.addrState);
  const [adrZip, setAdrZip] = useState("");
  const [showTrash, setShowTrash] = useState(false);
  const [inputDropName, setInputDropName] = useState("");
  const historyRef = useRef();
  const modifyRef = useRef();

  const updateAccountHandler = async (type) => {
    const updatedCustomerAccount = {
      accFullName: aName ? aName : account?.accFullName,
      accEmail: aEmail ? aEmail : account?.accEmail,
      accPhoneNumber: aPhone ? aPhone : account?.accPhoneNumber,
      accAddress: {
        addrFullName: adrName ? adrName : account?.accAddress.addrFullName,
        addrStreet: adrStreet ? adrStreet : account?.accAddress.addrStreet,
        addrCity: adrCity ? adrCity : account?.accAddress.addrCity,
        addrState: adrState ? adrState : account?.accAddress.addrState,
        addrZipCode: adrZip ? adrZip : account?.accAddress.addrZipCode,
      },
      entries: account?.entries,
      services: account?.services,
      _id: account?._id,
    };

    const updatedAccount = {
      accNo,
      updatedCustomerAccount,
    };

    dispatch(accountActions.updateAccountDetails(updatedAccount));

    switch (type) {
      case "Name":
        setAName("");
        break;
      case "Phone":
        setAPhone("");
        break;
      case "Email":
        setAEmail("");
        break;
      case "AdrName":
        setAdrName("");
        break;
      case "AdrStreet":
        setAdrStreet("");
        break;
      case "AdrCity":
        setAdrCity("");
        break;
      case "AdrState":
        setAdrState(adrState);
        break;
      case "AdrZip":
        setAdrZip("");
        break;
    }

    await updateAccountInfo(slug, accNo, updatedCustomerAccount);

    toast({
      description: "Account updated successfully",
      position: "top",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const removeAccountHandler = async () => {
    dispatch(accountActions.removeAccount(accNo));
    router.push(`/${slug}/accounts`);
    toast({
      description: "Account removed successfully",
      position: "bottom",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    await removeAccount(slug, accNo);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveAccountData(slug, accNo);
      dispatch(accountActions.setAccData(data));
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Container maxW="container.xl" p={5} mb={20}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setInputDropName("");
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Delete Account</ModalHeader>
          <ModalCloseButton
            _focus={{
              outline: "none",
            }}
          />
          <ModalBody>
            <Stack>
              <Box fontSize={"sm"}>
                To remove{" "}
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
                onClose();
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
              onClick={removeAccountHandler}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack py={"1rem"}>
        <Box pt={2} pb={4}>
          <Link href={`/${slug}/accounts`}>
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
              Accounts
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
            Account details: {account?.accFullName}{" "}
          </Heading>
          {showTrash && (
            <Box>
              <IoTrashOutline size={25} cursor={"pointer"} onClick={onOpen} />
            </Box>
          )}
        </Flex>

        <Tabs variant="enclosed" size={"sm"}>
          <TabList>
            <Tab
              _focus={{
                outline: "none",
              }}
              onClick={() => {
                setShowTrash(false);
              }}
            >
              Services
            </Tab>
            <Tab
              _focus={{
                outline: "none",
              }}
              onClick={() => {
                setShowTrash(false);
              }}
              ref={historyRef}
            >
              History
            </Tab>
            <Tab
              _focus={{
                outline: "none",
              }}
              onClick={() => {
                setShowTrash(false);
              }}
            >
              Stats
            </Tab>
            <Tab
              _focus={{
                outline: "none",
              }}
              onClick={() => {
                setShowTrash(true);
              }}
              ref={modifyRef}
            >
              Modify
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Entries historyRef={historyRef} />
            </TabPanel>
            <TabPanel>
              <History modifyRef={modifyRef} />
            </TabPanel>
            <TabPanel>
              <AccountStats />
            </TabPanel>
            <TabPanel>
              <form>
                <Stack>
                  <FormControl>
                    <FormLabel htmlFor="accFullName" fontSize={"sm"}>
                      Name
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={account?.accFullName}
                        id={"accFullName"}
                        value={aName}
                        onChange={(e) => setAName(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Name")}
                        disabled={aName === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="accPhone" fontSize={"sm"}>
                      Phone
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={account?.accPhoneNumber}
                        id={"accPhone"}
                        value={aPhone}
                        onChange={(e) => setAPhone(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Phone")}
                        disabled={aPhone === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="accEmail" fontSize={"sm"}>
                      Email
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={account?.accEmail}
                        id={"accEmail"}
                        value={aEmail}
                        onChange={(e) => setAEmail(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Email")}
                        disabled={aEmail === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="accBillingName" fontSize={"sm"}>
                      Billing Name
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={account?.accAddress.addrFullName}
                        id={"accBillingName"}
                        value={adrName}
                        onChange={(e) => setAdrName(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("AdrName")}
                        disabled={adrName === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="accBillingAddr" fontSize={"sm"}>
                      Billing Address
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={account?.accAddress.addrStreet}
                        id={"accBillingAddr"}
                        value={adrStreet}
                        onChange={(e) => setAdrStreet(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("AdrStreet")}
                        disabled={adrStreet === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="accBillingCity" fontSize={"sm"}>
                      Billing City
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={account?.accAddress.addrCity}
                        id={"accBillingCity"}
                        value={adrCity}
                        onChange={(e) => setAdrCity(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("AdrCity")}
                        disabled={adrCity === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="accBillingState" fontSize={"sm"}>
                      Billing State
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Select
                        size={"sm"}
                        name="state"
                        id="state"
                        value={adrState}
                        onChange={(e) => setAdrState(e.target.value)}
                      >
                        {selectState()}
                      </Select>
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("AdrState")}
                        disabled={adrState === account?.accAddress.addrState}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="accBillingZip" fontSize={"sm"}>
                      Billing Zip Code
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={account?.accAddress.addrZipCode}
                        id={"accBillingZip"}
                        value={adrZip}
                        onChange={(e) => setAdrZip(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={process.env.NEXT_PUBLIC_BTN}
                        _hover={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _active={{
                          bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("AdrZip")}
                        disabled={adrZip === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>
                </Stack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default AccNo;
