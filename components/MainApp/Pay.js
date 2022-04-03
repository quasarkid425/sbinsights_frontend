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
} from "@chakra-ui/react";
import { setHourlyWage, retrieveEmployeeData } from "../../actions/employees";
import { IoIosAdd } from "react-icons/io";
import { GrCircleInformation } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { employeeActions } from "../../store/employeeSlice";
import { v4 as uuidv4 } from "uuid";
import { submitPaidEntry } from "../../actions/employees";
import { getDateByYear } from "../../utils/helpers";

const Pay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [error, setError] = useState(false);
  const router = useRouter();
  let entry = {};
  const { user } = useSelector((state) => state.user);
  const { employees } = useSelector((state) => state.employees);
  const { wage } = useSelector((state) => state.employees);

  const dispatch = useDispatch();

  const index = employees.findIndex((emp) => emp._id === router.query.empNo);

  const setHourlyWageHandler = () => {
    setError(false);
    setHourlyWage(
      router.query.company,
      router.query.empNo,
      employees[index].pay.hourlyWage
    );
    onClose();
  };

  const recordPayHandler = async () => {
    const newDate = employees[index].pay.date.split("-");
    const formattedDate = `${newDate[1]}-${newDate[2]}-${newDate[0]}`;

    if (!employees[index].pay.total) {
      setError(true);
    } else {
      if (wage) {
        entry = {
          wage: employees[index].pay.hourlyWage,
          hours: employees[index].pay.hours,
          total: employees[index].pay.total,
          date: formattedDate,
          _id: uuidv4(),
        };
      } else {
        entry = {
          wage: employees[index].pay.wage,
          hours: employees[index].pay.hours,
          total: employees[index].pay.total,
          date: formattedDate,
          _id: uuidv4(),
        };
      }
      dispatch(
        employeeActions.recordPaidEntry({
          entry,
          index,
          wage,
        })
      );

      //submit pay to db

      await submitPaidEntry(user._id, router.query.empNo, entry);

      toast({
        description: "Recorded successfully",
        position: "bottom-left",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      //get the updated stats and set the state
      const data = await retrieveEmployeeData(
        router.query.company,
        router.query.empNo
      );

      dispatch(employeeActions.setEmpData(data));
    }
  };

  return (
    <>
      {error && (
        <Alert status="error" fontSize={"sm"} my={"1rem"}>
          <AlertIcon />
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
                      index,
                      value: e.target.value,
                    })
                  );
                }}
                type={"number"}
                value={
                  wage
                    ? employees[index]?.pay?.hourlyWage === 0
                      ? ""
                      : employees[index]?.pay?.hourlyWage
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
        <FormControl>
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
                  index,
                  value: e.target.value,
                })
              );
            }}
            value={getDateByYear()}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="hours" fontSize={"sm"}>
            Hours
          </FormLabel>
          <Input
            size={"sm"}
            type={"number"}
            id={"hours"}
            onChange={(e) => {
              setError(false);
              dispatch(
                employeeActions.recordField({
                  field: "hours",
                  index,
                  value: e.target.value,
                })
              );
            }}
            value={
              employees[index]?.pay?.hours === 0
                ? ""
                : employees[index]?.pay?.hours
            }
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
                  <GrCircleInformation cursor={"pointer"} size={15} />
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
                    index,
                    value: e.target.value,
                  })
                );
              }}
              type={"number"}
              value={
                wage
                  ? employees[index]?.pay?.hourlyWage === 0
                    ? ""
                    : employees[index]?.pay?.hourlyWage.toFixed(2)
                  : employees[index]?.pay?.wage === 0
                  ? ""
                  : employees[index]?.pay?.wage
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
              {isNaN(employees[index]?.pay?.total.toFixed(2))
                ? ""
                : employees[index]?.pay?.total.toFixed(2)}
            </Text>
          </Stack>
        </Flex>
        <Button
          size={"sm"}
          bg={process.env.NEXT_PUBLIC_BTN_2}
          _hover={{
            bg: process.env.NEXT_PUBLIC_BTN_HOVER,
          }}
          _active={{
            bg: process.env.NEXT_PUBLIC_BTN_HOVER,
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
