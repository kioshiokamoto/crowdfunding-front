import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps as Props } from "next/app";
import Head from "next/head";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "lib/layout";
import customTheme from "lib/styles/customTheme";
import "lib/styles/globals.css";
import GlobalProvider from "lib/providers/global/global.context";

const MyApp = ({ Component, pageProps }: Props) => {
  return (
    <ChakraProvider theme={customTheme}>
      <GlobalProvider>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </ChakraProvider>
  );
};

export default MyApp;
