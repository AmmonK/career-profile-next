import React, { useState } from "react"
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import { SessionProvider } from 'next-auth/react';
import MfeNav from '@/components/mfe-nav/MfeNav';
import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function MyApp(props) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;


  const [client] = useState(new QueryClient())

  return (
    <SessionProvider session={session} basePath="/job-explorer/api/auth">
      <QueryClientProvider client={client}>
        <AppCacheProvider {...props}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <MfeNav />
            <Container maxWidth="lg">
              <Component {...pageProps} />
            </Container>
          </ThemeProvider>
        </AppCacheProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
