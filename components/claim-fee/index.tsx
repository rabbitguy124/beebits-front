import {
  HStack,
  Center,
  Text,
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from 'ethers/lib/utils';
import React from 'react';
import { LINK_FEE } from '../../utils/contracts';

export const ClaimFeeModal: React.FC<Omit<ModalProps, 'children'>> = (
  props
) => {
  return (
    <Modal {...props}>
      <ModalOverlay background='rgba(0, 0, 0, .6)' />
      <ModalContent
        rounded='xl'
        minW='calc(100vw - 40%)'
        h='calc(100vh - 40%)'
        p='2rem'
      >
        <Center h='100%'>This is where the explanation comes in</Center>
      </ModalContent>
    </Modal>
  );
};

const ClaimFee: React.FC<{
  claimFee: BigNumber;
  onClick: React.MouseEventHandler;
}> = ({ claimFee, onClick }) => (
  <HStack
    onClick={onClick}
    my='3rem'
    fontSize='2rem'
    fontWeight='bold'
    cursor='pointer'
    spacing='2rem'
  >
    <Text>
      Minting Fees -{' '}
      {claimFee.gt(0)
        ? `${parseFloat(formatEther(claimFee)).toFixed(4)} BNB / ${formatEther(
            LINK_FEE
          )} LINK`
        : 'Fetching'}
    </Text>
    <Center
      ml='4rem'
      color='black'
      rounded='full'
      width='3rem'
      height='3rem'
      fontWeight='bold'
      background='#ffba00'
    >
      i
    </Center>
  </HStack>
);

export default ClaimFee;
