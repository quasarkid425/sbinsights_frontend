import React, { useEffect, useState } from "react";
import Pay from "../../../components/MainApp/Pay";
import PayHistory from "../../../components/MainApp/PayHistory";
import EmployeeStats from "../../../components/MainApp/EmployeeStats";
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
  useColorMode,
} from "@chakra-ui/react";
import {
  updateEmployeeInfo,
  removeEmployee,
  retrieveEmployeeData,
} from "../../../actions/employees";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { employeeActions } from "../../../store/employeeSlice";
import { IoTrashOutline } from "react-icons/io5";
import { selectState } from "../../../utils/helpers";

const EmpNo = ({ data }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { company: slug, empNo } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.user);
  const employee = useSelector(
    (state) =>
      state?.employees?.employees?.filter(
        (emp) => emp._id.toString() === empNo
      )[0]
  );

  const dispatch = useDispatch();
  const toast = useToast();

  const [eName, setEName] = useState("");
  const [ePhone, setEPhone] = useState("");
  const [eEmail, setEEmail] = useState("");
  const [empCity, setEmpCity] = useState("");
  const [empGender, setEmpGender] = useState(employee?.empGender);
  const [empStreet, setEmpStreet] = useState("");
  const [empState, setEmpState] = useState(employee?.empAddress.empState);
  const [empZip, setEmpZip] = useState("");
  const [showTrash, setShowTrash] = useState(false);
  const [inputDropName, setInputDropName] = useState("");

  const updateAccountHandler = async (type) => {
    const updatedEmployee = {
      empFullName: eName ? eName : employee?.empFullName,
      empPhoneNumber: ePhone ? ePhone : employee?.empPhoneNumber,
      empEmail: eEmail ? eEmail : employee?.empEmail,
      empGender: empGender ? empGender : employee?.empGender,
      empAddress: {
        empStreet: empStreet ? empStreet : employee?.empAddress.empStreet,
        empCity: empCity ? empCity : employee?.empAddress.empCity,
        empState: empState ? empState : employee?.empAddress.empState,
        empZipCode: empZip ? empZip : employee?.empAddress.empZipCode,
      },
      pay: employee?.pay,
      paidEntries: employee?.paidEntries,
      _id: employee?._id,
    };

    const updatedEmp = {
      empNo,
      updatedEmployee,
    };

    dispatch(employeeActions.updateEmployeeDetails(updatedEmp));

    switch (type) {
      case "Name":
        setEName("");
        break;
      case "Phone":
        setEPhone("");
        break;
      case "Email":
        setEEmail("");
        break;
      case "Gender":
        setEmpGender(empGender);
        break;
      case "Street":
        setEmpStreet("");
        break;
      case "City":
        setEmpCity("");
        break;
      case "State":
        setEmpState(empState);
        break;
      case "Zip":
        setEmpZip("");
        break;
    }

    await updateEmployeeInfo(user._id, updatedEmployee._id, updatedEmployee);

    toast({
      description: "Account updated successfully",
      position: "top",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const removeAccountHandler = async () => {
    dispatch(employeeActions.removeAccount(empNo));
    router.push(`/${slug}/employees`);
    toast({
      description: "Account removed successfully",
      position: "bottom",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    await removeEmployee(user._id, employee._id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveEmployeeData(user._id, empNo);
      dispatch(employeeActions.setEmpData(data));
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
                  {employee?.empFullName}
                </Text>
                , type the name in the box below. Please note this is permanent
                and cannot be undone
              </Box>
              <Input
                size={"sm"}
                placeholder="Enter name"
                _placeholder={{
                  color: colorMode === "dark" && "gray.300",
                }}
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
              disabled={inputDropName !== employee?.empFullName}
              onClick={removeAccountHandler}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack py={"1rem"}>
        <Box pt={2} pb={4}>
          <Link href={`/${slug}/employees`}>
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
              Employees
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
            Employee details: {employee?.empFullName}{" "}
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
              onClick={() => setShowTrash(false)}
            >
              Pay
            </Tab>
            <Tab
              _focus={{
                outline: "none",
              }}
              onClick={() => setShowTrash(false)}
            >
              History
            </Tab>
            <Tab
              _focus={{
                outline: "none",
              }}
              onClick={() => setShowTrash(false)}
            >
              Stats
            </Tab>
            <Tab
              _focus={{
                outline: "none",
              }}
              onClick={() => setShowTrash(true)}
            >
              Modify
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Pay />
            </TabPanel>
            <TabPanel>
              <PayHistory />
            </TabPanel>
            <TabPanel>
              <EmployeeStats data={data} />
            </TabPanel>
            <TabPanel>
              <form>
                <Stack>
                  <FormControl>
                    <FormLabel htmlFor="empFullName" fontSize={"sm"}>
                      Name
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={employee?.empFullName}
                        _placeholder={{
                          color: colorMode === "dark" && "gray.300",
                        }}
                        id={"empFullName"}
                        value={eName}
                        onChange={(e) => setEName(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Name")}
                        disabled={eName === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="empPhone" fontSize={"sm"}>
                      Phone
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={employee?.empPhoneNumber}
                        _placeholder={{
                          color: colorMode === "dark" && "gray.300",
                        }}
                        id={"empPhone"}
                        value={ePhone}
                        onChange={(e) => setEPhone(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Phone")}
                        disabled={ePhone === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="empEmail" fontSize={"sm"}>
                      Email
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={employee?.empEmail}
                        _placeholder={{
                          color: colorMode === "dark" && "gray.300",
                        }}
                        id={"empEmail"}
                        value={eEmail}
                        onChange={(e) => setEEmail(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Email")}
                        disabled={eEmail === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="empGender" fontSize={"sm"}>
                      Gender
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Select
                        size={"sm"}
                        name="gender"
                        id="empGender"
                        value={empGender}
                        onChange={(e) => setEmpGender(e.target.value)}
                        color={colorMode === "dark" ? "gray.300" : "gray.400"}
                      >
                        <option value="">Select a Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>

                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Gender")}
                        disabled={empGender === employee?.empGender}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="empStreet" fontSize={"sm"}>
                      Address
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={employee?.empAddress.empStreet}
                        _placeholder={{
                          color: colorMode === "dark" && "gray.300",
                        }}
                        id={"empStreet"}
                        value={empStreet}
                        onChange={(e) => setEmpStreet(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Street")}
                        disabled={empStreet === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="empCity" fontSize={"sm"}>
                      City
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={employee?.empAddress.empCity}
                        _placeholder={{
                          color: colorMode === "dark" && "gray.300",
                        }}
                        id={"empCity"}
                        value={empCity}
                        onChange={(e) => setEmpCity(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("City")}
                        disabled={empCity === ""}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="empState" fontSize={"sm"}>
                      State
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Select
                        size={"sm"}
                        name="state"
                        id="empState"
                        value={empState}
                        color={colorMode === "dark" ? "gray.300" : "gray.400"}
                        onChange={(e) => setEmpState(e.target.value)}
                      >
                        {selectState()}
                      </Select>
                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("State")}
                        disabled={empState === employee?.empAddress.empState}
                      >
                        Update
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="empZip" fontSize={"sm"}>
                      Zip Code
                    </FormLabel>
                    <Flex gap={"1rem"}>
                      <Input
                        size={"sm"}
                        placeholder={employee?.empAddress.empZipCode}
                        _placeholder={{
                          color: colorMode === "dark" && "gray.300",
                        }}
                        id={"empZip"}
                        value={empZip}
                        onChange={(e) => setEmpZip(e.target.value)}
                      />
                      <Button
                        size={"sm"}
                        bg={"btn.100"}
                        _hover={{
                          bg: "btn_hover.100",
                        }}
                        _active={{
                          bg: "btn_hover.100",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#fff"}
                        onClick={() => updateAccountHandler("Zip")}
                        disabled={empZip === ""}
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

export default EmpNo;
