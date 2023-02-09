import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";
import Head from "next/head";
import { useState } from "react";
import { Router } from "next/router";
import Loading from "@/components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);
  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });
  return (
    <>
      {loading && <Loading />}
      <StyledEngineProvider injectFirst>
        <Head>
          <title>Booking Absences Days Hanbiro</title>
          <meta
            name="description"
            content="Booking Absences Days Hanbiro App"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </>
  );
}
