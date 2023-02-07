import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Head>
        <title>Booking Absences Days Hanbiro</title>
        <meta name="description" content="Booking Absences Days Hanbiro App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}
