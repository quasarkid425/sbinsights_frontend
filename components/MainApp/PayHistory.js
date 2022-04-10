import React, { useState } from "react";
import {
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import { employeeActions } from "../../store/employeeSlice";
import { removePaidEntry, retrieveEmployeeData } from "../../actions/employees";

const PayHistory = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [inputDropName, setInputDropName] = useState("");
  const [date, setDate] = useState("asc");
  const [entryId, setEntryId] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { empNo } = useRouter().query;

  // const { employee } = useSelector((state) => state.employees);
  const { employees } = useSelector((state) => state.employees);
  const employee = employees.find((emp) => emp._id === empNo);
  const empIndex = employees?.findIndex((emp) => emp._id === employee?._id);

  const removeEntryHandler = async () => {
    //Remove from account state

    dispatch(
      employeeActions.removeAccountService({
        empIndex,
        empNo,
        entryId,
      })
    );
    //Remove from services database

    const entryIndex = employee.paidEntries?.findIndex(
      (emp) => emp._id.toString() === entryId
    );

    await removePaidEntry(
      user._id,
      empNo,
      entryId,
      employee.paidEntries,
      entryIndex
    );

    const data = await retrieveEmployeeData(user._id, empNo);
    dispatch(employeeActions.setEmpData(data));

    onClose();
    setInputDropName("");
  };

  const sortByDate = () => {
    if (date === "asc") {
      dispatch(employeeActions.sortEntriesByDate({ empIndex, date }));
      setDate("desc");
    } else {
      dispatch(employeeActions.sortEntriesByDate({ empIndex, date }));
      setDate("asc");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setInputDropName("");
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Delete Record</ModalHeader>
          <ModalCloseButton
            _focus={{
              outline: "none",
            }}
          />
          <ModalBody>
            <Stack>
              <Box fontSize={"sm"}>
                To remove this pay entry for{" "}
                <Text display={"inline"} fontWeight={"semibold"}>
                  {employee?.empFullName}
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
              disabled={inputDropName !== employee?.empFullName}
              onClick={removeEntryHandler}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {employee?.paidEntries?.length === 0 ? (
        ""
      ) : (
        <Flex justify={"end"} gap={"1rem"} pb={".75rem"}>
          <Tooltip label="Date" fontSize="md">
            <span>
              <BiSortAlt2
                size={20}
                cursor={"pointer"}
                color={colorMode === "light" ? "gray" : "#CBD5E0"}
                onClick={sortByDate}
              />
            </span>
          </Tooltip>
        </Flex>
      )}

      <Accordion allowMultiple>
        {employee?.paidEntries?.length === 0 ? (
          <Text fontSize={"sm"}>No History</Text>
        ) : (
          employee?.paidEntries?.map((emp, index) => (
            <AccordionItem key={index}>
              <h2>
                <Flex align={"center"}>
                  <AccordionButton _focus={{ boxShadow: "none" }}>
                    <Box flex="1" textAlign="left">
                      <Flex gap={".5rem"} alignItems={"center"}>
                        <Text fontWeight={"semibold"}>Pay Date:</Text>
                        <Text fontSize={"sm"}> {emp.date}</Text>
                      </Flex>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AiOutlineClose
                    cursor={"pointer"}
                    onClick={() => {
                      setEntryId(emp._id);
                      onOpen();
                    }}
                  />
                </Flex>
              </h2>
              <AccordionPanel pb={4}>
                <Stack>
                  <Flex gap={"1rem"} align={"center"}>
                    <Box>
                      <Text fontWeight={"semibold"}>Hours:</Text>
                      <Text fontSize={"sm"}>{emp.hours}</Text>
                    </Box>
                    <Box mt={"1.5rem"} fontSize={"sm"}>
                      x
                    </Box>
                    <Box>
                      <Text fontWeight={"semibold"}>Wage:</Text>
                      <Text fontSize={"sm"}>${emp.wage}</Text>
                    </Box>
                    <Box mt={"1.5rem"} fontSize={"sm"}>
                      =
                    </Box>
                    <Box>
                      <Text fontWeight={"semibold"}>Total:</Text>
                      <Text fontSize={"sm"}>${emp.total}</Text>
                    </Box>
                  </Flex>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </>
  );
};

export default PayHistory;
