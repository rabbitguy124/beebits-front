import Head from 'next/head';
import NextLink from 'next/link';

import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { ADDRESS_ZERO } from '../../utils/constants';
import { useWeb3 } from '../../contexts/Web3Context';
import { checkBeebitBunkClaim, getBunkHolderData } from '../../utils/helpers';
import { useLinkFee } from '../../hooks/useLinkFee';

import {
  Center,
  HStack,
  Text,
  VStack,
  Button,
  useDisclosure,
  Image,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
} from '@chakra-ui/react';

import ClaimFee, { ClaimFeeModal } from '../../components/claim-fee';
import ProgressBar from '../../components/progress-bar';
import useClaimBeebit from '../../hooks/useClaimBeebit';

const CommunityGrant: React.FC = () => {
  const { account, ethersProvider } = useWeb3();
  const [startClaim, setStartClaim] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [bnbLinkFee] = useLinkFee();

  const { onOpen, onClose, isOpen: isModalOpen } = useDisclosure();
  const { mintReqStatus, claimBeebit, claimedBeebit, reset } = useClaimBeebit();

  useEffect(() => {
    setIsOpen(true);
    account && setRecipient(account);
  }, [account]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    setRecipient(e.target.value);
  };

  const handleClaim = async () => {
    try {
      setError(null);
      if (
        !recipient.length ||
        recipient.length < 42 ||
        !recipient.startsWith('0x')
      ) {
        setError('Invalid address');
        return;
      }
      setStartClaim(true);
      const { binanceBunks } = await getBunkHolderData(
        ethersProvider,
        recipient
      );

      if (binanceBunks?.length == 0)
        throw new Error('Invalid address/Beebit claimed already');

      const { bunkIndex } = binanceBunks?.[0] || {};

      const isClaimedAlready = await checkBeebitBunkClaim(
        ethersProvider,
        parseInt(bunkIndex)
      );

      if (isClaimedAlready)
        throw new Error('Beebit for your address claimed already');

      await claimBeebit(bunkIndex, bnbLinkFee);
    } catch (err) {
      setError(err.data ? err.data.message : err.message);
      setRecipient('');
    } finally {
      setStartClaim(false);
    }
  };

  return (
    <Layout>
      <ClaimFeeModal isCentered isOpen={isModalOpen} onClose={onClose} />
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
        {isOpen ? (
          <>
            <Text fontSize='4rem' fontWeight='bold'>
              Mint your Beebit
            </Text>
            <Text fontWeight='medium' fontSize='2rem' mt='2rem' mb='4rem'>
              Get a brand new Beebit for every Bunk you HODL
            </Text>
            {!claimedBeebit ? (
              !mintReqStatus ? (
                <>
                  <FormControl
                    isInvalid={error}
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
                    onClick={handleClaim}
                    disabled={
                      !bnbLinkFee.gt(0) || startClaim || recipient.length == 0
                    }
                    rounded='xl'
                    _hover={{ background: '#ffba00', color: '#1F2A37' }}
                  >
                    {!startClaim ? 'Mint Beebit' : 'Minting in progress ...'}
                  </Button>
                  <ClaimFee claimFee={bnbLinkFee} onClick={() => onOpen()} />
                </>
              ) : (
                <ProgressBar duration={60} />
              )
            ) : (
              <HStack w='50%'>
                <VStack spacing='1.5rem'>
                  <Text fontSize='1.6rem' fontWeight='bold'>
                    Beebit{' '}
                    <NextLink href={`/beebits/${claimedBeebit.tokenId}`}>
                      <Link
                        cursor='pointer'
                        mx='.5rem'
                        display='inline-block'
                        fontWeight='bold'
                        fontSize='2rem'
                        color='#ffba00'
                      >
                        #{claimedBeebit.tokenId}
                      </Link>
                    </NextLink>{' '}
                    claimed!
                  </Text>
                  <Button
                    background='#ffba00'
                    py='2rem'
                    px='4rem'
                    fontSize='1.5rem'
                    color='#1F2A37'
                    onClick={reset}
                    rounded='xl'
                    _hover={{ background: '#ffba00', color: '#1F2A37' }}
                  >
                    Claim Another Beebit
                  </Button>
                </VStack>
                <NextLink href={`/beebits/${claimedBeebit.tokenId}`}>
                  <Image
                    cursor='pointer'
                    src={`https://cdn.beebits.xyz/full/beebits-${claimedBeebit.tokenId}.png`}
                    flex={1}
                    boxSize='30rem'
                    objectFit='contain'
                    fallbackSrc='/dummyBeebits.png'
                  />
                </NextLink>
              </HStack>
            )}
          </>
        ) : (
          <>
            <Text fontSize='4rem' fontWeight='bold' mb='2rem'>
              Community Grant Applications Are Closed
            </Text>
            <Text fontSize='2rem' fontWeight='medium'>
              The community grant application window is now closed.
            </Text>
          </>
        )}
      </Center>
    </Layout>
  );
};

export default CommunityGrant;
