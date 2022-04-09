import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";

type NextPageWithAuth = NextPage & {
  auth?: (page: ReactElement) => ReactNode;
};

type AppPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
  const [layout, setLayout] = useState<"DEV" | "EMP">("DEV");
  return (
    <ApolloProvider client={apolloClient}>
      {Component.auth ? (
        <Component {...pageProps} />
      ) : (
        <Layout layout={layout}>
          <Component
            onLayoutChange={(arg: "DEV" | "EMP") => setLayout(arg)}
            {...pageProps}
          />
        </Layout>
      )}
    </ApolloProvider>
  );
}

export default MyApp;
