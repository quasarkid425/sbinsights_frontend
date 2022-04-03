import React from "react";
import DashboardLayout from "../../components/MainApp/DashboardLayout";
import Expenses from "../../components/MainApp/Expenses";

const HomeExpenses = () => {
  return (
    <DashboardLayout>
      <Expenses />
    </DashboardLayout>
  );
};

export default HomeExpenses;
