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
} from "@chakra-ui/react";
import { IoIosAdd, IoIosCheckmark, IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { updateQuickNotes } from "../../../../actions/users";
import { userActions } from "../../../../store/userSlice";

const QuickNotes = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    isOpen: isQuickNoteOpen,
    onOpen: onQuickNoteOpen,
    onClose: onQuickNoteClose,
  } = useDisclosure();

  const saveQuickNotesHandler = async () => {
    await updateQuickNotes(user);
    onQuickNoteClose();
  };

  return (
    <>
      <Modal
        isOpen={isQuickNoteOpen}
        onClose={onQuickNoteClose}
        size={"xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Set Quick Notes</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Text fontWeight={"semibold"} fontSize={"sm"} mb={".2rem"}>
              Product / Service
            </Text>
            {user.quickServices?.length === 0 ? (
              <Flex align={"center"} gap={"3rem"} mb={"1rem"}>
                <Text fontSize={"sm"}>
                  No quick notes for Product / Services - click the plus to set
                  up
                </Text>
                <IoIosAdd
                  size={25}
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(userActions.addFirstService());
                  }}
                />
              </Flex>
            ) : (
              user.quickServices?.map((service, index) => (
                <Flex key={index}>
                  <Input
                    mb={".5rem"}
                    size={"sm"}
                    placeholder={service === "" ? service : ""}
                    value={service}
                    onChange={(e) => {
                      dispatch(
                        userActions.updateService({
                          type: "service",
                          index,
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                  <IoIosCheckmark
                    size={35}
                    cursor={"pointer"}
                    onClick={() => {
                      dispatch(userActions.addService(index));
                    }}
                  />
                  <IoIosClose
                    size={35}
                    onClick={() => {
                      dispatch(userActions.removeService(index));
                    }}
                    cursor={"pointer"}
                  />
                </Flex>
              ))
            )}
            <Text fontWeight={"semibold"} fontSize={"sm"} mb={".2rem"}>
              Descriptions
            </Text>
            {user.quickDescriptions?.length === 0 ? (
              <Flex align={"center"} gap={"3rem"}>
                <Text fontSize={"sm"}>
                  No quick notes for Descriptions - click the plus to set up
                </Text>
                <IoIosAdd
                  size={25}
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(userActions.addFirstDescription());
                  }}
                />
              </Flex>
            ) : (
              user.quickDescriptions?.map((desc, index) => (
                <Flex align={"center"} key={index}>
                  <Input
                    mb={".5rem"}
                    size={"sm"}
                    placeholder={desc === "" ? desc : ""}
                    value={desc}
                    onChange={(e) => {
                      dispatch(
                        userActions.updateService({
                          type: "description",
                          index,
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                  <IoIosCheckmark
                    size={35}
                    cursor={"pointer"}
                    onClick={() => {
                      dispatch(userActions.addDescription(index));
                    }}
                  />
                  <IoIosClose
                    size={35}
                    onClick={() => {
                      dispatch(userActions.removeDescription(index));
                    }}
                    cursor={"pointer"}
                  />
                </Flex>
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onQuickNoteClose}
              size={"sm"}
            >
              Close
            </Button>
            <Button onClick={saveQuickNotesHandler} size={"sm"}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tooltip label="Quick Notes" fontSize="md">
        <span>
          <IoIosAdd size={25} cursor={"pointer"} onClick={onQuickNoteOpen} />
        </span>
      </Tooltip>
    </>
  );
};

export default QuickNotes;
