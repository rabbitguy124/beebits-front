import dynamic from 'next/dynamic';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import Footer from '../components/footer';
import Header from '../components/header';
import Web3Provider from '../contexts/Web3Context';

import '../styles/globals.css';
import 'nprogress/nprogress.css';

const TopProgressBar = dynamic(
  () => {
    return import('../components/top-progress');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Web3Provider>
        <VStack w='100%' minH='100vh' mx='auto' justifyContent='space-between'>
          <Header />
          <TopProgressBar />
          <Component {...pageProps} />
          <Footer />
        </VStack>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
