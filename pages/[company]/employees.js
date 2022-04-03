import React from "react";
import DashboardLayout from "../../components/MainApp/DashboardLayout";
import Employees from "../../components/MainApp/Employees";

const HomeEmployees = () => {
  return (
    <DashboardLayout>
      <Employees />
    </DashboardLayout>
  );
};

export default HomeEmployees;
