import { Image } from '@chakra-ui/image';
import { HStack, Text, Link, VStack } from '@chakra-ui/layout';
import NextLink from 'next/link';

const Footer = () => {
  return (
    <HStack
      justifyContent='center'
      color='#9ca3af'
      w='100%'
      py='4.8rem'
      px='3.2rem'
    >
      <VStack>
        <Text>© 2021 Beebits. All rights reserved.</Text>
        <HStack>
          <NextLink href='/privacy-policy'>
            <Link cursor='pointer'>
              <Text>Privacy Policy</Text>
            </Link>
          </NextLink>
          <NextLink href='/terms-and-conditions'>
            <Link cursor='pointer'>
              <Text>· Terms and Conditions</Text>
            </Link>
          </NextLink>
        </HStack>
      </VStack>
      <HStack>
        {/* <Image src='/twitter.svg' alt='Twitter' />
        <Image src='/mail.svg' alt='Twitter' /> */}
      </HStack>
    </HStack>
  );
};

export default Footer;
