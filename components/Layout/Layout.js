import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <Header />
      {children}
      {!isLoggedIn && <Footer />}
    </>
  );
};

export default Layout;
