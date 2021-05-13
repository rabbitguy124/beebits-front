import { Button } from '@chakra-ui/button';
import { Text, VStack } from '@chakra-ui/layout';
import { useMemo } from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { getNetworkName, addNetworkToMetamask } from '../../helpers';

const ConnectWeb3: React.FC = () => {
  const {
    walletConToggle,
    connectWallet,
    account,
    ethersProvider,
    providerChainId,
  } = useWeb3();

  const isMetamask = useMemo(
    () => ethersProvider?.connection?.url,
    [ethersProvider]
  );

  return (
    <VStack
      p='2rem'
      minW='40vw'
      minH='50vh'
      mt='-7rem !important'
      background='white'
      rounded='3xl'
      boxShadow='0 0 1rem rgba(0, 0, 0, .2)'
      color='rgba(31, 41, 55, 1)'
      justifyContent='center'
    >
      <Text fontSize='4rem' fontWeight='bold'>
        {walletConToggle
          ? 'Connecting wallet'
          : account
          ? 'Switch network'
          : 'Connect wallet'}
      </Text>
      <Text fontSize='1.8rem'>
        {walletConToggle ? (
          'Please wait while we connect to your desired wallet'
        ) : (
          <>
            <Text
              mt='3rem !important'
              fontSize='1.8rem'
              w='90%'
              mx='auto'
              textAlign='center'
            >
              {account ? (
                <>
                  It seems that you are on{' '}
                  <Text as='span' fontWeight='bold'>
                    {getNetworkName(providerChainId) || 'local network'}.
                  </Text>
                </>
              ) : (
                <>
                  <Text as='span' fontWeight='bold' w='100%'>
                    To access Beebits, please connect your wallet
                  </Text>
                  <Button
                    my='4rem'
                    background='#ffba00'
                    py='2rem'
                    px='4rem'
                    fontSize='1.8rem'
                    color='#1F2A37'
                    onClick={connectWallet}
                    rounded='xl'
                    fontWeight='bold'
                  >
                    Connect wallet
                  </Button>
                </>
              )}
            </Text>
            {account && ![56, 97].includes(providerChainId) && (
              <Text mt='2rem !important' w='90%' mx='auto' textAlign='center'>
                Please connect to either <br />
                {isMetamask ? (
                  <Button
                    background='rgba(31, 41, 55, 1)'
                    _hover={{}}
                    p='1rem'
                    fontSize='1.6rem'
                    color='white'
                    fontWeight='bold'
                    onClick={() => addNetworkToMetamask({ chainId: 56 })}
                  >
                    {getNetworkName(56)}
                  </Button>
                ) : (
                  <Text fontWeight='bold'>{getNetworkName(56)}</Text>
                )}{' '}
                or{' '}
                {isMetamask ? (
                  <Button
                    background='rgba(31, 41, 55, 1)'
                    _hover={{}}
                    p='1rem'
                    fontSize='1.6rem'
                    color='white'
                    fontWeight='bold'
                    onClick={() => addNetworkToMetamask({ chainId: 97 })}
                  >
                    {getNetworkName(97)}
                  </Button>
                ) : (
                  <Text fontWeight='bold'>{getNetworkName(97)}</Text>
                )}{' '}
              </Text>
            )}
          </>
        )}
      </Text>
    </VStack>
  );
};

const Layout: React.FC = ({ children }) => {
  const { account, providerChainId } = useWeb3();
  console.log(
    providerChainId,
    !!providerChainId,
    typeof providerChainId,
    !!account,
    [56, 97].includes(providerChainId)
  );
  const isValid = useMemo(() => {
    return !!account && !!providerChainId && [56, 97].includes(providerChainId);
  }, [account, providerChainId]);

  console.log(isValid);

  return <VStack flex={1}>{isValid ? children : <ConnectWeb3 />}</VStack>;
};

export default Layout;
