import React from "react";
import {
  Flex,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { IoIosAdd, IoIosClose, IoIosAddCircleOutline } from "react-icons/io";
import { FiDollarSign } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setUpTaxes } from "../../../../actions/taxes";
import { taxActions } from "../../../../store/taxSlice";

const Tax = () => {
  const { user } = useSelector((state) => state.user);
  const { taxes, selectedStates } = useSelector((state) => state.taxes);
  const dispatch = useDispatch();
  const {
    isOpen: isTaxOpen,
    onOpen: onTaxOpen,
    onClose: onTaxClose,
  } = useDisclosure();

  const setUpTaxHandler = async () => {
    if (selectedStates.length === 0) {
      onTaxClose();
      return;
    } else {
      //set the taxSetUp the true
      dispatch(taxActions.setUpTax());
      //save the selected states to the db
      await setUpTaxes(user._id, taxes.taxStates, selectedStates);

      onTaxClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isTaxOpen}
        onClose={onTaxClose}
        size={"xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Sales Taxes</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Flex direction={"column"}>
              <Text mb={".75rem"} fontSize={"sm"}>
                Select the states below by clicking on the states you will be
                adding sales tax to the most when billing customers, click the
                &lsquo;x&rsquo; to deselect:
              </Text>
              {taxes.taxStates.map((state, index) => (
                <Flex align={"center"} key={index}>
                  <Box
                    _hover={{ bg: "gray.200" }}
                    fontSize={"sm"}
                    w={"98%"}
                    border={
                      state.selected
                        ? "2px solid #00938E"
                        : "1px solid lightgray"
                    }
                    borderRadius={".3rem"}
                    p={2}
                    mb={".5rem"}
                    // my={".5rem"}
                    cursor={"pointer"}
                    onClick={() =>
                      dispatch(
                        taxActions.addQuickStates({
                          index,
                          abbrevation: state.abbrevation,
                        })
                      )
                    }
                  >
                    {state.name}
                  </Box>
                  <IoIosClose
                    className="icon"
                    size={35}
                    cursor={"pointer"}
                    color={"gray"}
                    onClick={() =>
                      dispatch(
                        taxActions.removeQuickStates({
                          index,
                          abbrevation: state.abbrevation,
                        })
                      )
                    }
                  />
                </Flex>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onTaxClose} size={"sm"}>
              Close
            </Button>
            <Button onClick={setUpTaxHandler} size={"sm"}>
              Set up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Tooltip label="Tax" fontSize="md">
        <span>
          <FiDollarSign
            size={taxes.taxSetUp ? 15 : 40}
            cursor={"pointer"}
            onClick={onTaxOpen}
          />
        </span>
      </Tooltip>
    </>
  );
};

export default Tax;
