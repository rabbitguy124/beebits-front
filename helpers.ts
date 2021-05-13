import { chainUrls, networkCurrencies, networkNames } from './constants';
import { utils } from 'ethers';

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
