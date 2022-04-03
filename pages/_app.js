import { useEffect } from "react";
import Script from "next/script";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import * as gtag from "../lib/gtag";

let persistor = persistStore(store);

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>Company Name</title>
        <link rel="icon" href="/favicon-32x32.png" />
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <Layout>
              {/* <AnimatePresence>
                <motion.div
                  key={router.route}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    initial: {
                      opacity: 0,
                    },
                    animate: {
                      opacity: 1,
                    },
                  }}
                > */}
              <Component {...pageProps} />
              {/* </motion.div>
              </AnimatePresence> */}
            </Layout>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
