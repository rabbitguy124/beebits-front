import { BigNumber, Contract, ethers, utils } from 'ethers';
import { request } from 'graphql-request';
import { chainUrls, networkNames, networkCurrencies } from './constants';
import {
  BUNKS_CONTRACT,
  BEEBITS_CONTRACT,
  PANCAKE_ROUTER_CONTRACT,
  LINK_FEE,
  WETH_TOKEN,
  LINK_TOKEN,
} from './contracts';

import { checkBurntBunks, getBunkData } from './queries';

export const shortenHash = (hash) =>
  `${hash.slice(0, 6)}...${hash.slice(hash.length - 4, hash.length)}`;

export const getRPCUrl = (chainId: number) => chainUrls[chainId || 56].rpc;
export const getExplorerUrl = (chainId: number) =>
  chainUrls[chainId || 56].explorer;
export const getNetworkName = (chainId: number) => networkNames[chainId || 56];
export const getNetworkCurrency = (chainId: number) =>
  networkCurrencies[chainId || 56];

export const getEthersProvider = (chainId: number) => {};

export const addNetworkToMetamask = async ({ chainId }) => {
  console.log(chainId);
  const { name, symbol } = getNetworkCurrency(chainId);
  return window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: utils.hexValue(chainId),
        chainName: getNetworkName(chainId),
        nativeCurrency: {
          name,
          symbol,
          decimals: 18,
        },
        rpcUrls: [getRPCUrl(chainId)],
        blockExplorerUrls: [getExplorerUrl(chainId)],
      },
    ],
  });
};

export const getBunkHolderData = async (
  provider: ethers.providers.Web3Provider,
  address: string
) => {
  const abi = [
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const bunkContract = new Contract(BUNKS_CONTRACT, abi, provider);
  const balance = (await bunkContract.balanceOf(address)) as BigNumber;
  return balance.gt(0)
    ? request(process.env.NEXT_PUBLIC_GRAPH_URL, getBunkData, { address })
    : request(process.env.NEXT_PUBLIC_GRAPH_URL, checkBurntBunks, {
        address,
      });
};

export const checkBeebitBunkClaim = async (
  provider: ethers.providers.Web3Provider,
  punkIndex: number
) => {
  const abi = [
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'creatorNftMints',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const beebitsContract = new Contract(BEEBITS_CONTRACT, abi, provider);
  const creatorNftMint = (await beebitsContract.creatorNftMints(
    punkIndex + 1
  )) as BigNumber;

  return creatorNftMint.eq(1);
};
