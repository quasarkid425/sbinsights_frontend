import React, { useEffect } from "react";
import DashboardLayout from "../../components/MainApp/DashboardLayout";
import Sales from "../../components/MainApp/Sales";
import { cityCount } from "../../actions/accounts";
import { useSelector, useDispatch } from "react-redux";

const HomeSales = ({ count }) => {
  const { user } = useSelector((state) => state.user);
  const { cityCount } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return <DashboardLayout>{/* <Sales count={count} /> */}</DashboardLayout>;
};

export default HomeSales;
