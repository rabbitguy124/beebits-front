import { BigNumber } from 'ethers';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
);

export const networkNames = {
  56: 'Binance Smart Chain',
  97: 'Binance Smart Chain Testnet',
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
