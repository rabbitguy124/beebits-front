import '../styles/globals.css';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import Footer from '../components/footer';
import Header from '../components/header';
import Web3Provider from '../contexts/Web3Context';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Web3Provider>
        <VStack w='100%' minH='100vh' mx='auto' justifyContent='space-between'>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </VStack>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
