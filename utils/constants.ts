import { parseEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
);

export const PERMITTABLE_CHAIN_IDS = [56, 97];

export const networkNames = {
  1: 'ETH Mainnet',
  4: 'Rinkeby Testnet',
  3: 'Ropsten Testnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  97: 'BSC Testnet',
};

export const networkCurrencies = {
  56: {
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  97: {
    name: 'Binance Coin',
    symbol: 'BNB',
  },
};

export const networkLabels = {
  56: 'BSC',
  97: 'BSC Testnet',
};

export const chainUrls = {
  56: {
    rpc: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: networkNames[56],
  },
  97: {
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    explorer: 'https://blockscout.com/poa/sokol',
    chainId: 77,
    name: networkNames[77],
  },
};
