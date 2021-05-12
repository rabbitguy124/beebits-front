import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Center, Grid, HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/modal';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface BeebitEl {
  hair: {
    element: string;
    style: string;
  };
  hat: {
    element: string;
    style: string;
  };
  overshirt: {
    element: string;
    style: string;
  };
  palette: string;
  pants: {
    element: string;
    style: string;
  };
  shirt: {
    element: string;
    style: string;
  };
  shoes: {
    element: string;
    style: string;
  };
  skin: string;
  type: string;
  voxels: string;
}

const TEMP_URL = 'https://meebits.larvalabs.com';

const BeeAttribute: React.FC<{
  name: string;
  value: { element: string; style: string };
}> = ({ name, value }) => {
  return value ? (
    <Center
      py='1.2rem'
      borderTop='1px solid #e5e7eb'
      w='100%'
      justifyContent='space-between'
    >
      <Text color='black'>{name}</Text>
      <Text color='#c89200' fontWeight='bold'>
        {value.element}
        {value.style.length > 0 && `, ${value.style}`}
      </Text>
    </Center>
  ) : null;
};

const AssetsModal: React.FC<
  Omit<ModalProps, 'children'> & { isLive?: boolean; src: string }
> = ({ children, ...props }) => {
  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} {...props} isCentered>
      <ModalOverlay />
      <ModalContent minW='60vw' overflow='hidden' rounded='2xl'>
        <ModalBody padding='0'>
          {!props.isLive ? (
            <Image rounded='lg' w='100%' objectFit='contain' src={props.src} />
          ) : (
            <>
              {/** @ts-ignore */}
              <model-viewer
                exposure='0.67'
                src='/beebits-1.glb'
                alt='A 3D model of Meebit #40'
                auto-rotate
                camera-controls
                style={{
                  width: '100%',
                  minHeight: '60vh',
                  background: 'rgb(100, 133, 149)',
                  objectFit: 'fill',
                }}
              />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Beebit: React.FC<{ beebit: Omit<BeebitEl, 'voxels'> }> = ({ beebit }) => {
  const {
    query: { id },
  } = useRouter();

  const [source, setSource] = useState(
    `${TEMP_URL}/meebitimages/characterimage?index=${id}&type=full`
  );

  const [isLive, setIsLive] = useState(false);

  const { onClose, isOpen, onOpen } = useDisclosure();

  return (
    <Grid
      w='121.6rem'
      py='4.8rem'
      px='3.2rem'
      mt='-7.8rem'
      background='white'
      height='100%'
      rounded='xl'
      templateColumns='repeat(2, 1fr)'
      gap='2rem'
      boxShadow='0 0 1rem rgba(0, 0, 0, 0.1)'
    >
      <Head>
        <title>Beebit #{id}</title>
      </Head>
      <AssetsModal
        onClose={onClose}
        isOpen={isOpen}
        src={source}
        isLive={isLive}
      />
      <VStack spacing='1.6rem'>
        <Image
          cursor='pointer'
          rounded='lg'
          boxSize='53.6rem'
          height='100%'
          src={`${TEMP_URL}/meebitimages/characterimage?index=${id}&type=full`}
          onClick={() => {
            setSource(
              `${TEMP_URL}/meebitimages/characterimage?index=${id}&type=full`
            );
            onOpen();
            setIsLive(false);
          }}
        />
        <HStack spacing='1.6rem'>
          <Image
            cursor='pointer'
            rounded='lg'
            src={`${TEMP_URL}/meebitimages/characterimage?index=${id}&type=outfit`}
            boxSize='12.2rem'
            minH='12.2rem'
            onClick={() => {
              setSource(
                `${TEMP_URL}/meebitimages/characterimage?index=${id}&type=outfit`
              );
              onOpen();
              setIsLive(false);
            }}
          />
          <Image
            cursor='pointer'
            rounded='lg'
            src={`${TEMP_URL}/meebitimages/characterimage?index=${id}&type=portrait`}
            boxSize='12.2rem'
            minH='12.2rem'
            onClick={() => {
              setSource(
                `${TEMP_URL}/meebitimages/characterimage?index=${id}&type=portrait`
              );
              onOpen();
              setIsLive(false);
            }}
          />
          <Image
            cursor='pointer'
            rounded='lg'
            src={`${TEMP_URL}/meebitimages/characterimage?index=${id}&type=shoes`}
            boxSize='12.2rem'
            minH='12.2rem'
            onClick={() => {
              setSource(
                `${TEMP_URL}/meebitimages/characterimage?index=${id}&type=shoes`
              );
              onOpen();
              setIsLive(false);
            }}
          />
          <Center
            rounded='xl'
            minW='12.2rem'
            minH='12.2rem'
            background='#ffba00'
            p='2rem'
            cursor='pointer'
            onClick={() => {
              setSource(`/beebits-1.glb`);
              onOpen();
              setIsLive(true);
            }}
          >
            <Image src='/three-dim.svg' fill='black' />
          </Center>
        </HStack>
      </VStack>
      <VStack alignItems='flex-start' px='3.2rem'>
        <Text color='black' fontSize='3.8rem' fontWeight='bold'>
          Beebit #{id}
        </Text>
        <Text fontSize='1.6rem' fontWeight='bold' color='#c89200' mb='2.4rem'>
          {beebit.type.toUpperCase()}
        </Text>
        <Text>
          View this Beebit on{' '}
          <Text as='span' color='#c89200' fontWeight='bold'>
            NFTHack
          </Text>
        </Text>
        <VStack spacing='0' w='100%' mt='2.4rem !important'>
          <BeeAttribute name='Hair' value={beebit.hair} />
          <BeeAttribute name='Hat' value={beebit.hat} />
          <BeeAttribute name='Shirt' value={beebit.shirt} />
          <BeeAttribute name='Overshirt' value={beebit.shirt} />
          <BeeAttribute name='Pants' value={beebit.pants} />
          <BeeAttribute name='Shoes' value={beebit.shoes} />
        </VStack>
      </VStack>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps<
  { beebit: BeebitEl | {} },
  { id: string }
> = async (ctx) => {
  const { id } = ctx.query;
  const idLen = (id || '1').length;
  const totalZeros = Array.from({ length: 5 - idLen }, () => '0').join('');
  try {
    const beebit = await (
      await fetch(
        `${process.env.APP_URL}/meebits/meebit_${totalZeros}${id}.json`
      )
    ).json();

    delete beebit.voxels;
    return { props: { beebit } };
  } catch (err) {
    console.log(err.message);
    return { props: { beebit: {} } };
  }
};

export default Beebit;
