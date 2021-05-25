import { Button } from '@chakra-ui/button';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { useMemo } from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { PERMITTABLE_CHAIN_ID } from '../../utils/constants';
import { getNetworkName, addNetworkToMetamask } from '../../utils/helpers';

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
      mt='-5rem !important'
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
      <Box fontSize='1.8rem'>
        {walletConToggle ? (
          'Please wait while we connect to your desired wallet'
        ) : (
          <>
            <Box
              mt='3rem !important'
              fontSize='1.8rem'
              w='100%'
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
            </Box>
            {account && providerChainId !== PERMITTABLE_CHAIN_ID && (
              <Box mt='2rem !important' w='90%' mx='auto' textAlign='center'>
                Please connect to{' '}
                {isMetamask ? (
                  <Button
                    background='rgba(31, 41, 55, 1)'
                    _hover={{}}
                    p='1rem'
                    fontSize='1.6rem'
                    color='white'
                    fontWeight='bold'
                    onClick={() =>
                      addNetworkToMetamask({ chainId: PERMITTABLE_CHAIN_ID })
                    }
                  >
                    {getNetworkName(PERMITTABLE_CHAIN_ID)}
                  </Button>
                ) : (
                  <Text fontWeight='bold'>
                    {getNetworkName(PERMITTABLE_CHAIN_ID)}
                  </Text>
                )}{' '}
              </Box>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
};

const Layout: React.FC = ({ children }) => {
  const { account, providerChainId } = useWeb3();
  const isValid = useMemo(() => {
    return (
      !!account && !!providerChainId && providerChainId === PERMITTABLE_CHAIN_ID
    );
  }, [account, providerChainId]);

  return <VStack flex={1}>{isValid ? children : <ConnectWeb3 />}</VStack>;
};

export default Layout;
