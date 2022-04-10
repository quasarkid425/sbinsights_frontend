import React, { useState, useRef } from "react";
import {
  Box,
  Heading,
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
import { v4 as uuidv4 } from "uuid";
import { BsArrowUp, BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { employeeActions } from "../../store/employeeSlice";
import { selectState } from "../../utils/helpers";
import { addEmployee } from "../../actions/employees";

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
              bg={"btn.100"}
              _hover={{
                bg: "btn_hover.100",
              }}
              _active={{
                bg: "btn_hover.100",
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
      <>
        <Stack spacing={employees.length === 0 ? "" : "1rem"}>
          <Flex
            mt={employees.length === 0 ? "10rem" : "0"}
            mb={".5rem"}
            align={"center"}
            justifyContent={employees.length === 0 ? "center" : "space-between"}
            direction={{ base: "column-reverse", md: "row" }}
            gap={{ base: "1rem", md: "0" }}
          >
            <Button
              bg={"btn.100"}
              _hover={{
                bg: "btn_hover.100",
              }}
              _active={{
                bg: "btn_hover.100",
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
                <InputGroup size={"sm"} w={{ base: "75%", md: "25%" }}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon
                      color={colorMode === "light" ? "gray.300" : "#fff"}
                    />
                  </InputLeftElement>
                  <Input
                    style={{
                      border:
                        colorMode === "dark"
                          ? "1px solid #fff"
                          : "0.1rem solid #e4e4e4",
                    }}
                    _hover={{
                      borderColor: colorMode === "dark" && "#fff",
                    }}
                    _placeholder={{
                      color: colorMode === "dark" && "#fff",
                    }}
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
                  Add your first employee by clicking &lsquo;Add Employee&rsquo;
                </Text>
              </Grid>
            </>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  {headings.map((heading, index) => (
                    <th key={index}>
                      <Flex justify={"center"} align={"center"} gap={2}>
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
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
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
                  .map((employee, index) => (
                    <Link
                      href={`/${user.slug}/employee/${employee._id}`}
                      key={uuidv4()}
                    >
                      <tr key={index} className="table-hover">
                        <td data-label="Name">
                          {employee.empFullName ? employee.empFullName : "N/A"}
                        </td>
                        <td data-label="Phone">
                          {employee.empPhoneNumber
                            ? employee.empPhoneNumber
                            : "N/A"}
                        </td>
                        <td data-label="Email">
                          {employee.empEmail ? employee.empEmail : "N/A"}
                        </td>
                        <td data-label="Gender">
                          {employee.empGender ? employee.empGender : "N/A"}
                        </td>
                        <td data-label="Address">
                          {employee.empAddress.empStreet
                            ? employee.empAddress.empStreet
                            : "N/A"}
                        </td>
                        <td data-label="City">
                          {employee.empAddress.empCity
                            ? employee.empAddress.empCity
                            : "N/A"}
                        </td>
                        <td data-label="State">
                          {employee.empAddress.empState
                            ? employee.empAddress.empState
                            : "N/A"}
                        </td>
                        <td data-label="Zip">
                          {employee.empAddress.empZipCode
                            ? employee.empAddress.empZipCode
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
    </>
  );
};

export default Employees;
