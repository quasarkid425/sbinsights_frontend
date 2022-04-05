import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import ReportModal from "../Modals/ReportModal";

const Reports = () => {
  return (
    <>
      <ReportModal title={"Modular Modals!"}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
        placeat velit iure dolorem sapiente veritatis beatae autem natus, porro
        nam.
      </ReportModal>
    </>
  );
};

export default Reports;
