import React, { useState, useRef } from "react";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { addAccount } from "../../../../actions/accounts";
import { selectState } from "../../../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "../../../../store/accountSlice";

const AddAccount = () => {
  const { user } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const accountFullName = useRef();
  const accountEmail = useRef();
  const accountPhoneNumber = useRef();
  const accountBillingName = useRef();
  const accountBillingStreet = useRef();
  const accountBillingState = useRef();
  const accountBillingCity = useRef();
  const accountBillingZipCode = useRef();

  const submitAccDetails = (e) => {
    e.preventDefault();

    const newUserAccount = {
      accFullName: accountFullName.current.value,
      accEmail: accountEmail.current.value,
      accPhoneNumber: accountPhoneNumber.current.value,
      accAddress: {
        addrFullName: accountBillingName.current.value,
        addrStreet: accountBillingStreet.current.value,
        addrCity: accountBillingCity.current.value,
        addrState: accountBillingState.current.value,
        addrZipCode: accountBillingZipCode.current.value,
      },
      _id: uuidv4().split("-").join("").substring(0, 24),
    };

    addAccount(user._id, newUserAccount)
      .then((data) => {
        dispatch(accountActions.addAccount(data));
      })
      .catch((err) => {
        console.log(err);
      });

    onClose();

    accountFullName.current.value = "";
    accountEmail.current.value = "";
    accountPhoneNumber.current.value = "";
    accountBillingName.current.value = "";
    accountBillingStreet.current.value = "";
    accountBillingCity.current.value = "";
    accountBillingState.current.value = "";
    accountBillingZipCode.current.value = "";
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Account</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="accName" fontSize={"sm"}>
                Name
              </FormLabel>
              <Input
                id="accName"
                type="text"
                ref={accountFullName}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" fontSize={"sm"}>
                Email
              </FormLabel>
              <Input id="email" type="email" ref={accountEmail} size={"sm"} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone" fontSize={"sm"}>
                Phone
              </FormLabel>
              <Input
                id="phone"
                type="text"
                ref={accountPhoneNumber}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bName" fontSize={"sm"}>
                Billing Name
              </FormLabel>
              <Input
                id="bName"
                type="text"
                ref={accountBillingName}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bStreet" fontSize={"sm"}>
                Billing Street
              </FormLabel>
              <Input
                id="bStreet"
                type="text"
                ref={accountBillingStreet}
                size={"sm"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bCity" fontSize={"sm"}>
                Billing City
              </FormLabel>
              <Input
                id="bCity"
                type="text"
                ref={accountBillingCity}
                size={"sm"}
              />
            </FormControl>

            <FormControl id="state">
              <FormLabel fontSize={"sm"}>Billing State</FormLabel>
              <Select
                name="state"
                id="state"
                ref={accountBillingState}
                size={"sm"}
              >
                {selectState()}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bZip" size={"sm"} fontSize={"sm"}>
                Billing Zip Code
              </FormLabel>
              <Input
                id="bZip"
                type="text"
                ref={accountBillingZipCode}
                size={"sm"}
              />
            </FormControl>

            <Button
              w={"100%"}
              onClick={submitAccDetails}
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
              Add Account
            </Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
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
        Add Account
      </Button>
    </>
  );
};

export default AddAccount;
