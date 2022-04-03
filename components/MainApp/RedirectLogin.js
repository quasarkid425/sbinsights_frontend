import React from "react";
import { useRouter } from "next/router";

const RedirectLogin = () => {
  const router = useRouter();
  router.replace("/dashboard");

  return <div></div>;
};

export default RedirectLogin;
