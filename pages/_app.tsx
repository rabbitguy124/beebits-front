import '../styles/globals.css';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import Footer from '../components/footer';
import Header from '../components/header';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <VStack w='100%' minH='100vh' mx='auto' justifyContent='space-between'>
        <Header />
        <VStack flex={1}>
          <Component {...pageProps} />
        </VStack>
        <Footer />
      </VStack>
    </ChakraProvider>
  );
}

export default MyApp;
