import React from "react";
import Layout from "../layout/mainLayout";
import { ReactNode } from "react";
type NextPageWithLayout<P = {}> = React.FC<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};
import Head from "next/head";
import { Box } from "@mui/material";

const AuthLayout: NextPageWithLayout<any> = ({ title, children }: any) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Data Centre" : "Data Centre"}</title>
        <meta name="description" content="Admin Centre" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        m="0 auto"
        bgcolor={"#f5f5f5"}
      >
        {children}
      </Box>
    </>
  );
};

AuthLayout.getLayout = (page) => <Layout>{page}</Layout>;

export default AuthLayout;
