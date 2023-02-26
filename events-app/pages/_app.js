import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/layout/Layout/Layout";
import { NotificationContextProvider } from "@/store/notificationContext";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Events App</title>
          <meta name='description' content='Next JS Events App' />
          <meta
            name='viewport'
            content='initial-scale-1.0, width=device-width'
          />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
