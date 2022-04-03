import React from "react";
import DashboardLayout from "../../components/MainApp/DashboardLayout";
import Sales from "../../components/MainApp/Sales";
import { cityCount } from "../../actions/accounts";

export async function getServerSideProps(context) {
  // const data = await findCustomers();

  const { company } = context.params;
  const data = await cityCount(company);
  return {
    props: {
      count: data,
    },
  };
}

const HomeSales = ({ count }) => {
  return (
    <DashboardLayout>
      <Sales count={count} />
    </DashboardLayout>
  );
};

export default HomeSales;
