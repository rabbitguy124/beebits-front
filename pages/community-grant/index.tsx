import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Center, HStack, Text, VStack } from '@chakra-ui/layout';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/layout';
import { ADDRESS_ZERO } from '../../constants';
import { useWeb3 } from '../../contexts/Web3Context';

const CommunityGrant: React.FC = () => {
  const { account } = useWeb3();

  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedBeebit, setClaimedBeebit] = useState(null);
  const [claimComplete, setClaimComplete] = useState(false);
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState(() => account || '');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    setRecipient(e.target.value);
  };

  const claimBeebit = async () => {
    try {
      if (!recipient.length || recipient.length < 42) {
        setError('Invalid address');
        return;
      }
      setIsClaiming(true);
      await new Promise((res) => setTimeout(res, 5000));
      setIsClaiming(false);
      setClaimedBeebit(Math.floor(Math.random() * 18000));
      setClaimComplete(true);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>The Beebits Community Grant</title>
      </Head>
      <Center
        flexDirection='column'
        mt='-5rem !important'
        minW='121.6rem'
        minH='75vh'
        background='white'
        boxShadow='0 0 1rem rgba(0, 0, 0, .3)'
        color='black'
        rounded='xl'
        p='4rem'
      >
        <Text fontSize='4rem' fontWeight='bold'>
          Mint your Beebit
        </Text>
        <Text fontWeight='medium' fontSize='2rem' mt='2rem' mb='4rem'>
          Get a brand new Beebit for every Bunk you HODL
        </Text>
        {!claimComplete ? (
          <>
            <FormControl
              isInvalid={error}
              as='text'
              name='recipient'
              w='60%'
              mb='4rem'
            >
              <FormLabel htmlFor='recipient' fontSize='1.8rem'>
                Recipient address
              </FormLabel>
              <Input
                id='recipient'
                name='recipient'
                placeholder={ADDRESS_ZERO}
                p='2rem'
                rounded='xl'
                fontSize='1.6rem'
                color='rgba(31, 41, 55, 1)'
                fontWeight='bold'
                value={recipient}
                onChange={handleChange}
                spellCheck={false}
                _focus={{ outline: 'none' }}
              />
              {error && (
                <FormErrorMessage fontWeight='bold' fontSize='1.6rem'>
                  {error}
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              background='#ffba00'
              py='2rem'
              px='4rem'
              fontSize='1.5rem'
              color='#1F2A37'
              onClick={claimBeebit}
              disabled={isClaiming}
              rounded='xl'
              _hover={{ background: '#ffba00', color: '#1F2A37' }}
            >
              {!isClaiming ? 'Claim Beebit' : 'Claiming in progress ...'}
            </Button>
          </>
        ) : (
          <HStack w='50%'>
            <VStack>
              <Text fontSize='1.6rem' fontWeight='bold'>
                Beebit #{claimedBeebit} claimed!
              </Text>
              <Button
                background='#ffba00'
                py='2rem'
                px='4rem'
                fontSize='1.5rem'
                color='#1F2A37'
                onClick={() => {
                  setClaimComplete(false);
                  setClaimedBeebit(null);
                }}
                rounded='xl'
                _hover={{ background: '#ffba00', color: '#1F2A37' }}
              >
                Claim Another Beebit
              </Button>
            </VStack>
            <Image
              src={`https://meebits.larvalabs.com/meebitimages/characterimage?index=${claimedBeebit}&type=full`}
              flex={1}
              boxSize='30rem'
              objectFit='contain'
            />
          </HStack>
        )}
      </Center>
    </Layout>
  );
};

export default CommunityGrant;
