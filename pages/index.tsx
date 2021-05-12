import {
  Box,
  VStack,
  Image,
  Center,
  Text,
  HStack,
  Grid,
} from '@chakra-ui/react';
import Head from 'next/head';

const ListItem: React.FC<{
  imageURL: string;
  title: string;
  description: string;
}> = ({ imageURL, title, description }) => {
  return (
    <HStack alignItems='flex-start' spacing='2rem'>
      <Center
        rounded='lg'
        background='#ffba00'
        w='4.8rem'
        h='4.8rem'
        boxSizing='content-box'
        p='1rem'
      >
        <Image src={imageURL} fill='black' display='flex' />
      </Center>
      <Box>
        <Text fontSize='1.8rem' color='#111827' fontWeight='bold'>
          {title}
        </Text>
        <Text fontSize='1.6rem' color='#6B7280' mt='.8rem'>
          {description}
        </Text>
      </Box>
    </HStack>
  );
};

export default function Home() {
  return (
    <VStack marginTop='-10rem !important' w='121.6rem' flex={1}>
      <Head>
        <title>The Beebits</title>
        <meta name='description' content='20,000 unique 3D characters' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Center
        position='relative'
        rounded='2xl'
        w='100%'
        minH='45.6rem'
        overflow='hidden'
        mx='0'
      >
        <Box
          position='absolute'
          zIndex='1'
          top='0'
          left='0'
          right='0'
          bottom='0'
          background='linear-gradient(90deg, rgba(200,146,0,.5) 0%, rgba(254,254,254,.65) 100%)'
        />
        <Image
          src='/all-beebits.jpeg'
          alt='Beebits variety'
          position='absolute'
          top='0'
          margin='0'
          width='100%'
          objectFit='cover'
          ml='0 !important'
        />
        <Box
          h='100%'
          position='relative'
          fontSize='8rem'
          lineHeight='1.2'
          fontWeight='bold'
          zIndex='2'
          mx='3.2rem'
        >
          <Text color='rgba(31, 41, 55, 1)'>Say hello to</Text>
          <Text color='rgba(31, 41, 55, 1)'>The Beebits</Text>
        </Box>
      </Center>
      <Grid
        w='100%'
        templateColumns='repeat(2, 1fr)'
        gap='2rem'
        alignItems='center'
        pt='4.8rem'
      >
        <VStack alignItems='flex-start'>
          <Text color='rgb(17, 24, 39)' fontSize='3rem' fontWeight='bold'>
            What are the Meebits?
          </Text>
          <VStack spacing='4rem' mt='4rem !important'>
            <ListItem
              imageURL='/user.svg'
              title='The Characters'
              description='The Meebits are 20,000 unique 3D voxel characters, created by a custom generative algorithm, then registered on the Ethereum blockchain.
              '
            />
            <ListItem
              imageURL='/verified.svg'
              title='ERC-721'
              description='The NFT contract the governs ownership is a standard ERC-721 that works with any compatible service or exchange.'
            />
            <ListItem
              imageURL='/exchange.svg'
              title='Integrated No-Fee Marketplace'
              description='Also included in the contract is a custom marketplace that supports like-kind trading of up to 100 Meebits per transaction, along with all the standard buy, bid and ask transactions.'
            />
          </VStack>
        </VStack>
        <Image src='/demobit.jpeg' alt='demo beebit' />
      </Grid>
      <Box width='80vw' maxH='39rem' rounded='3xl' overflow='hidden'>
        <Image
          src='/beebit-group.jpeg'
          width='100%'
          height='100%'
          objectFit='contain'
        />
      </Box>
    </VStack>
  );
}
