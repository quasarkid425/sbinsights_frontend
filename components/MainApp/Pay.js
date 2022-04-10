import React, { useState } from "react";
import {
  Input,
  Flex,
  Text,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { setHourlyWage, retrieveEmployeeData } from "../../actions/employees";
import {
  IoIosAdd,
  IoIosInformationCircleOutline,
  IoIosInformationCircle,
} from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { employeeActions } from "../../store/employeeSlice";
import { v4 as uuidv4 } from "uuid";
import { submitPaidEntry } from "../../actions/employees";

const Pay = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { empNo } = router.query;
  const { employees } = useSelector((state) => state.employees);
  const employee = employees.find((emp) => emp._id === empNo);
  const empIndex = employees?.findIndex((emp) => emp._id === employee?._id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [error, setError] = useState(false);
  let entry = {};
  const { user } = useSelector((state) => state.user);
  const { wage } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const setHourlyWageHandler = async () => {
    setError(false);
    await setHourlyWage(user._id, empNo, employee.pay.hourlyWage);
    onClose();
  };

  const recordPayHandler = async () => {
    const newDate = employee.pay.date.split("-");
    const formattedDate = `${newDate[1]}-${newDate[2]}-${newDate[0]}`;

    if (!employee.pay.total) {
      setError(true);
    } else {
      if (wage) {
        entry = {
          wage: employee.pay.hourlyWage,
          hours: employee.pay.hours,
          total: employee.pay.total,
          date: formattedDate,
          _id: uuidv4(),
        };
      } else {
        entry = {
          wage: employee.pay.wage,
          hours: employee.pay.hours,
          total: employee.pay.total,
          date: formattedDate,
          _id: uuidv4(),
        };
      }
      dispatch(
        employeeActions.recordPaidEntry({
          empIndex,
          entry,
          wage,
        })
      );

      //submit pay to db

      await submitPaidEntry(user._id, empNo, entry);

      toast({
        description: "Recorded successfully",
        position: "bottom-left",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      //get the updated stats and set the state
      const data = await retrieveEmployeeData(user._id, empNo);

      dispatch(employeeActions.setEmpData(data));
    }
  };

  return (
    <>
      {error && (
        <Alert
          status="error"
          fontSize={"sm"}
          my={"1rem"}
          bg={colorMode === "dark" ? "red.400" : "red.200"}
        >
          <AlertIcon color={colorMode === "dark" ? "#fff" : "red.500"} />
          <AlertTitle mr={2}>Empty fields!</AlertTitle>
          <AlertDescription>All fields must be filled out</AlertDescription>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Hourly Wage</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Flex align={"center"} gap={".2rem"}>
              <Text fontSize={"md"}>$</Text>
              <Input
                size={"sm"}
                onChange={(e) => {
                  dispatch(
                    employeeActions.recordField({
                      field: "hourlyWage",
                      empIndex,
                      value: e.target.value,
                    })
                  );
                }}
                type={"number"}
                value={
                  wage
                    ? employee?.pay?.hourlyWage === 0
                      ? ""
                      : employee?.pay?.hourlyWage
                    : ""
                }
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} size={"sm"}>
              Close
            </Button>
            <Button onClick={setHourlyWageHandler} size={"sm"}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justify="end" w={"100%"}>
        <Tooltip label="Set hourly wage" fontSize="md">
          <span>
            <IoIosAdd size={25} cursor={"pointer"} onClick={onOpen} />
          </span>
        </Tooltip>
      </Flex>
      <Flex
        direction={"column"}
        gap={"1rem"}
        w={{ base: "100%", md: "50%", lg: "25%" }}
      >
        <FormControl className={colorMode === "dark" && "date-picker"}>
          <FormLabel htmlFor="date" fontSize={"sm"}>
            Date
          </FormLabel>
          <Input
            size={"sm"}
            type={"date"}
            id={"date"}
            onChange={(e) => {
              dispatch(
                employeeActions.recordField({
                  field: "date",
                  empIndex,
                  value: e.target.value,
                })
              );
            }}
            value={employee?.pay?.date}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="hours" fontSize={"sm"}>
            Hours
          </FormLabel>
          <Input
            type={"number"}
            step="0.01"
            value={employee?.pay?.hours === 0 ? "" : employee?.pay?.hours}
            onChange={(e) => {
              setError(false);
              dispatch(
                employeeActions.recordField({
                  field: "hours",
                  empIndex,
                  value: e.target.value,
                })
              );
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="amount">
            <Flex align={"center"} gap={".2rem"}>
              <Text fontSize={"sm"}>Wage</Text>
              <Tooltip
                label="Click plus icon to set hourly wage for faster submissions"
                fontSize="md"
              >
                <span>
                  {colorMode === "light" ? (
                    <IoIosInformationCircleOutline
                      cursor={"pointer"}
                      size={15}
                    />
                  ) : (
                    <IoIosInformationCircle cursor={"pointer"} size={15} />
                  )}
                </span>
              </Tooltip>
            </Flex>
          </FormLabel>
          <Flex align={"center"} gap={".2rem"} justify={"center"}>
            <Text fontSize={"sm"}>$</Text>
            <Input
              size={"sm"}
              id="amount"
              onChange={(e) => {
                setError(false);
                dispatch(
                  employeeActions.recordField({
                    field: "amount",
                    empIndex,
                    value: e.target.value,
                  })
                );
              }}
              type={"number"}
              value={
                wage
                  ? employee?.pay?.hourlyWage === 0
                    ? ""
                    : employee?.pay?.hourlyWage.toFixed(2)
                  : employee?.pay?.wage === 0
                  ? ""
                  : employee?.pay?.wage
              }
            />
          </Flex>
        </FormControl>

        <Flex justify={"start"} mt={"1rem"}>
          <Stack>
            <Text fontWeight={"semibold"} fontSize={"md"}>
              Total:
            </Text>
            <Text fontWeight={"semibold"} fontSize={"md"}>
              $
              {isNaN(employee?.pay?.total?.toFixed(2))
                ? ""
                : employee?.pay?.total?.toFixed(2)}
            </Text>
          </Stack>
        </Flex>
        <Button
          size={"sm"}
          bg={"btn.200"}
          _hover={{
            bg: "btn_hover.100",
          }}
          _active={{
            bg: "btn_hover.100",
          }}
          _focus={{ boxShadow: "none" }}
          color={"#000"}
          onClick={recordPayHandler}
        >
          Pay
        </Button>
      </Flex>
    </>
  );
};

export default Pay;
