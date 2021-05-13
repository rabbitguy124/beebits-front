import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Center, HStack, Link, Text } from '@chakra-ui/layout';
import NextLink from 'next/link';
import { useWeb3 } from '../../contexts/Web3Context';
import { shortenHash } from '../../helpers';

const Header = () => {
  const { connectWallet, account } = useWeb3();
  return (
    <Center minH='14.5rem' background='rgba(31, 41, 55, 1)' w='100%' pb='8rem'>
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
          <NextLink href='/beebits'>
            <Link>
              <Text>For Sale</Text>
            </Link>
          </NextLink>
          <NextLink href='/beebits'>
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
        )}
      </Center>
      <Box pb='4rem' h='8rem' />
    </Center>
  );
};

export default Header;
