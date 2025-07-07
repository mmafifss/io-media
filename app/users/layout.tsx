import { ReactNode } from "react";
import Head from "next/head";
import styles from "../styles/modules/BaseLayout.module.scss";
import { Box, Stack } from "@mui/material";
import { Sidebar } from "../components/sidebar";

interface ILayoutProps {
  children?: ReactNode;
  title?: string;
  isDetail?: boolean;
  isMessages?: boolean;
}

type NextPageWithLayout<P = {}> = React.FC<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const Layout: NextPageWithLayout<any> = ({
  children,
  title,
  isDetail,
  isMessages,
}: ILayoutProps) => {
  return (
    <Box>
      <Head>
        <title>{title ? title + " - Data Centre" : "Data Centre"}</title>
        <meta name="description" content="Admin Centre" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="row" gap={isMessages ? 0 : 2}>
        <Sidebar />
        <Box className={isDetail ? styles.containerDetail : styles.container}>
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

Layout.getLayout = (page) => <Layout>{page}</Layout>;

export default Layout;
