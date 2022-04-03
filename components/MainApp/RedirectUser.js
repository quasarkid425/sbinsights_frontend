import React from "react";
import { useRouter } from "next/router";

const RedirectUser = () => {
  const router = useRouter();
  router.replace("/login");

  return <div></div>;
};

export default RedirectUser;
