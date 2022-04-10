import React from "react";
import { Box } from "@chakra-ui/react";
import RedirectLogin from "../components/MainApp/RedirectLogin";
import { useSelector } from "react-redux";
import Head from "next/head";

const Index = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <Head>
        <title>SBInsights || Home</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box minH={"80vh"}>This is the sales page</Box>
    </>
  );
};

export default Index;
