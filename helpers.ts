import { chainUrls, networkNames } from './constants';

export const getRPCUrl = (chainId: number) => chainUrls[chainId || 56].rpc;
export const getNetworkName = (chainId: number) => networkNames[chainId || 56];

export const getEthersProvider = (chainId: number) => {};
