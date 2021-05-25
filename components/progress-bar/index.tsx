import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout';
import { useEffect, useMemo, useState } from 'react';

const ProgressBar: React.FC<{ duration: number }> = ({ duration }) => {
  const [width, setWidth] = useState(0);

  const percentPerSecond = useMemo(() => 1 / duration, [duration]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWidth((pW) => (pW < 100 ? pW + percentPerSecond : 100));
    }, 10);
    if (width >= 100) clearInterval(intervalId);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <VStack w='80%' spacing='2rem'>
      <Text fontWeight='bold' fontSize='1.8rem'>
        {width >= 100
          ? 'It looks like your Beebit is taking a bit longer to generate. Please wait!'
          : 'Please wait while we search an amazing Beebit for you. (Est time: 60 seconds)'}
      </Text>
      <Center
        border='2px solid rgba(31, 41, 55, 1)'
        rounded='2xl'
        w='100%'
        minH='2rem'
        transformOrigin='left'
        justifyContent='flex-start'
        transition='width .3s'
      >
        <HStack
          rounded='2xl'
          minH='100%'
          alignSelf='stretch'
          background='#ffba00'
          w={`${width}%`}
        />
      </Center>
    </VStack>
  );
};

export default ProgressBar;
