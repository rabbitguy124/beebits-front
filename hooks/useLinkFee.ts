import { BigNumber } from '@ethersproject/bignumber';
import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { PERMITTABLE_CHAIN_IDS } from '../utils/constants';
import { fetchRequiredBNBForSwap } from '../utils/helpers';

const INTERVAL = 5000;

export const useLinkFee = () => {
  const { ethersProvider: provider, providerChainId } = useWeb3();
  const [bnbLinkFee, setbnbLinkFee] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (provider && PERMITTABLE_CHAIN_IDS.includes(providerChainId)) {
        const [data] = await fetchRequiredBNBForSwap(provider);
        setbnbLinkFee(data);
      }
    }, INTERVAL);
    return () => clearInterval(intervalId);
  }, [provider, providerChainId]);

  return [bnbLinkFee];
};
