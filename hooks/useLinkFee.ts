import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { useState, useEffect, useMemo } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { PERMITTABLE_CHAIN_ID } from '../utils/constants';
import {
  LINK_FEE,
  LINK_TOKEN,
  PANCAKE_ROUTER_CONTRACT,
  WETH_TOKEN,
} from '../utils/contracts';

const INTERVAL = 5000;

const ROUTER_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
    ],
    name: 'getAmountsIn',
    outputs: [
      { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const useLinkFee = () => {
  const { ethersProvider: provider, providerChainId } = useWeb3();
  const [bnbLinkFee, setbnbLinkFee] = useState<BigNumber>(BigNumber.from(0));

  const routerContract = useMemo(
    () =>
      provider
        ? new Contract(PANCAKE_ROUTER_CONTRACT, ROUTER_ABI, provider)
        : null,
    [provider]
  );

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (
        routerContract &&
        provider &&
        providerChainId === PERMITTABLE_CHAIN_ID
      ) {
        const [data] = await routerContract
          .getAmountsIn(LINK_FEE, [WETH_TOKEN, LINK_TOKEN])
          .catch((err) => console.log('ERRR'));
        setbnbLinkFee(data);
      }
    }, INTERVAL);
    return () => clearInterval(intervalId);
  }, [provider, providerChainId]);

  return [bnbLinkFee];
};
