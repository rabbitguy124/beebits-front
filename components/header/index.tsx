import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Center, HStack, Link, Text } from '@chakra-ui/layout';
import NextLink from 'next/link';
import { useWeb3 } from '../../contexts/Web3Context';
import { getNetworkName, shortenHash } from '../../utils/helpers';

const Header = () => {
  const { connectWallet, account, providerChainId } = useWeb3();
  return (
    <Center
      minH='14.5rem'
      background='rgba(31, 41, 55, 1)'
      w='100%'
      pb='8rem'
      flexDir='column'
    >
      <Center
        justifyContent='space-between'
        alignItems='center'
        minH='6.4rem'
        borderBottom='1px solid rgba(229, 231, 235, .1)'
        w='121.6rem'
        mx='auto'
      >
        <HStack
          spacing='1.6rem'
          fontSize='1.4rem'
          fontWeight='bold'
          color='#D1D5D8'
        >
          <NextLink href='/'>
            <Link>
              <Image
                src='/beebits.svg'
                alt='logo'
                width='3.2rem'
                height='3.2rem'
              />
            </Link>
          </NextLink>
          <NextLink href='/beebits'>
            <Link>
              <Text>All Beebits</Text>
            </Link>
          </NextLink>
          <NextLink href='/for-sale'>
            <Link>
              <Text>For Sale</Text>
            </Link>
          </NextLink>
          <NextLink href='/community-grant'>
            <Link>
              <Text>Community Grant</Text>
            </Link>
          </NextLink>
        </HStack>
        {!account ? (
          <Button
            background='#ffba00'
            py='2rem'
            px='4rem'
            fontSize='1.4rem'
            color='#1F2A37'
            onClick={connectWallet}
            rounded='xl'
          >
            Connect wallet
          </Button>
        ) : (
          <HStack>
            <Text fontWeight='bold' color='#ffba00' fontSize='1.6rem' mr='1rem'>
              {getNetworkName(providerChainId) || 'Local Network'}
            </Text>
            <Center
              background='#ffba00'
              py='1rem'
              px='2rem'
              fontSize='1.4rem'
              color='#1F2A37'
              rounded='xl'
              fontWeight='bold'
            >
              {shortenHash(account)}
            </Center>
          </HStack>
        )}
      </Center>
      <Box pb='4rem' minH='8rem' />
    </Center>
  );
};

export default Header;
