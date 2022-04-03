import React, { useState, useRef } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from "../../actions/employees";
import { v4 as uuidv4 } from "uuid";
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
  Select,
  Grid,
  Text,
} from "@chakra-ui/react";
import { BsArrowUp, BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { BiSortAlt2 } from "react-icons/bi";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { employeeActions } from "../../store/employeeSlice";
import { selectState } from "../../utils/helpers";

const Employees = () => {
  const { user } = useSelector((state) => state.user);
  const { employees } = useSelector((state) => state.employees);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const headings = [
    "Name",
    "Phone",
    "Email",
    "Gender",
    "Address",
    "City",
    "State",
    "Zip",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const employeeFullName = useRef();
  const employeeEmail = useRef();
  const employeePhoneNumber = useRef();
  const employeeGender = useRef();
  const employeeStreet = useRef();
  const employeeState = useRef();
  const employeeCity = useRef();
  const employeeZipCode = useRef();

  const submitEmployeeDetails = (e) => {
    e.preventDefault();

    const newEmployee = {
      empFullName: employeeFullName.current.value.trim(),
      empEmail: employeeEmail.current.value.trim(),
      empPhoneNumber: employeePhoneNumber.current.value.trim(),
      empGender: employeeGender.current.value.trim(),
      empAddress: {
        empStreet: employeeStreet.current.value.trim(),
        empCity: employeeCity.current.value.trim(),
        empState: employeeState.current.value.trim(),
        empZipCode: employeeZipCode.current.value.trim(),
      },
      _id: uuidv4().split("-").join("").substring(0, 24),
    };

    addEmployee(user._id, newEmployee)
      .then((data) => {
        dispatch(employeeActions.addEmployee(data));
      })
      .catch((err) => {
        console.log(err);
      });

    onClose();

    employeeFullName.current.value = "";
    employeeEmail.current.value = "";
    employeePhoneNumber.current.value = "";
    employeeGender.current.value = "";
    employeeStreet.current.value = "";
    employeeCity.current.value = "";
    employeeState.current.value = "";
    employeeZipCode.current.value = "";
  };

  const sortAsc = (type) => {
    dispatch(employeeActions.sortCollectionAsc(type));
  };
  const sortDesc = (type) => {
    dispatch(employeeActions.sortCollectionDesc(type));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Employee</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="accName" fontSize={"sm"}>
                Name
              </FormLabel>
              <Input
                id="accName"
                type="text"
                ref={employeeFullName}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" fontSize={"sm"}>
                Email
              </FormLabel>
              <Input id="email" type="email" ref={employeeEmail} size={"sm"} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone" fontSize={"sm"}>
                Phone
              </FormLabel>
              <Input
                id="phone"
                type="text"
                ref={employeePhoneNumber}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bName" fontSize={"sm"}>
                Gender
              </FormLabel>
              <Select name="state" id="state" ref={employeeGender} size={"sm"}>
                <option value="">Select a Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bStreet" fontSize={"sm"}>
                Street
              </FormLabel>
              <Input
                id="bStreet"
                type="text"
                ref={employeeStreet}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bCity" fontSize={"sm"}>
                City
              </FormLabel>
              <Input id="bCity" type="text" ref={employeeCity} size={"sm"} />
            </FormControl>

            <FormControl id="state">
              <FormLabel fontSize={"sm"}>State</FormLabel>
              <Select name="state" id="state" ref={employeeState} size={"sm"}>
                {selectState()}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bZip" fontSize={"sm"}>
                Zip Code
              </FormLabel>
              <Input id="bZip" type="text" ref={employeeZipCode} size={"sm"} />
            </FormControl>

            <Button
              w={"100%"}
              onClick={submitEmployeeDetails}
              mt={"1rem"}
              bg={process.env.NEXT_PUBLIC_BTN}
              _hover={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _active={{
                bg: process.env.NEXT_PUBLIC_BTN_HOVER,
              }}
              _focus={{ boxShadow: "none" }}
              color={"#fff"}
              size={"sm"}
            >
              Add Employee
            </Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Stack spacing={employees.length === 0 ? "" : "1rem"}>
        <Flex
          mt={employees.length === 0 ? "10rem" : "0"}
          mb={".5rem"}
          align={"center"}
          justifyContent={employees.length === 0 ? "center" : "space-between"}
        >
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
            onClick={onOpen}
            size={"sm"}
          >
            Add Employee
          </Button>

          {employees.length > 0 && (
            <>
              <Heading size={"sm"}>Employees</Heading>
              <InputGroup w={"25%"} size={"sm"}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Search employees"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </InputGroup>
            </>
          )}
        </Flex>

        {employees?.length === 0 ? (
          <>
            <Grid placeItems={"center"} pt={"1rem"}>
              <Box>
                <BsArrowUp size={45} />
              </Box>
              <Text fontSize={"md"} pt={"1rem"}>
                Add your first employee by clicking 'Add Employee'
              </Text>
            </Grid>
          </>
        ) : (
          <Table variant={"simple"} fontSize={"sm"}>
            <Thead>
              <Tr>
                {headings.map((heading) => (
                  <Th key={heading}>
                    <Flex align={"center"} gap={2}>
                      <Box fontSize={".75rem"}>{heading}</Box>
                      <Flex gap={1}>
                        <BsSortAlphaDown
                          size={15}
                          cursor={"pointer"}
                          onClick={() => sortAsc(heading)}
                        />

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
              {employees
                ?.filter((employee) => {
                  if (searchTerm === "") {
                    return employee;
                  } else if (
                    employee.empFullName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    employee.empPhoneNumber
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    employee.empEmail
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    employee.empGender
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    employee.empAddress.empStreet
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    employee.empAddress.empCity
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    employee.empAddress.empState
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    employee.empAddress.empZipCode
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return employee;
                  }
                })
                .map((employee) => (
                  <Link
                    href={`/${user.slug}/employee/${employee._id}`}
                    key={uuidv4()}
                  >
                    <Tr
                      _hover={{
                        color: colorMode === "light" ? "gray.800" : "gray.800",
                        bg: "gray.200",
                      }}
                      cursor={"pointer"}
                    >
                      <Td>
                        {employee.empFullName ? employee.empFullName : "N/A"}
                      </Td>
                      <Td>
                        {employee.empPhoneNumber
                          ? employee.empPhoneNumber
                          : "N/A"}
                      </Td>
                      <Td>{employee.empEmail ? employee.empEmail : "N/A"}</Td>
                      <Td>{employee.empGender ? employee.empGender : "N/A"}</Td>
                      <Td>
                        {employee.empAddress.empStreet
                          ? employee.empAddress.empStreet
                          : "N/A"}
                      </Td>
                      <Td>
                        {employee.empAddress.empCity
                          ? employee.empAddress.empCity
                          : "N/A"}
                      </Td>
                      <Td>
                        {employee.empAddress.empState
                          ? employee.empAddress.empState
                          : "N/A"}
                      </Td>
                      <Td>
                        {employee.empAddress.empZipCode
                          ? employee.empAddress.empZipCode
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

export default Employees;
