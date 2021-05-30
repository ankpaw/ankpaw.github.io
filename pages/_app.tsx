import React from "react";
import Head from "next/head";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Navbar, Footer } from "../components/layout";
import "tailwindcss/tailwind.css";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Ankit Pawar - Software Developer</title>
        <meta
          name="description"
          content="Ankit Pawar is a software engineer who specializes in building web applications that are responsive, intuitive and can scale without hassles."
        />
        <meta property="og:url" content="http://iamankitpawar.github.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ankit Pawar" />
        <meta
          property="og:description"
          content="Ankit Pawar is a software engineer who specializes in building web applications that are responsive, intuitive and can scale without hassles."
        />
        {/* TODO: Add open graph image */}
        {/* <meta property="og:image" content="https://iamankitpawar.github.io/og.png" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
};
export default App;
