import '../styles/globals.css';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import Footer from '../components/footer';
import Header from '../components/header';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <VStack w='100%' mx='auto' justifyContent='space-between'>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </VStack>
    </ChakraProvider>
  );
}

export default MyApp;
