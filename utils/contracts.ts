import { parseEther } from 'ethers/lib/utils';

export const LINK_FEE = parseEther('1').div(
  process.env.NEXT_PUBLIC_ENV === 'development' ? 10 : 5
);

export const WETH_TOKEN =
  process.env.NEXT_PUBLIC_ENV !== 'development'
    ? '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
    : '0xae13d989dac2f0debff460ac112a837c89baa7cd';

export const BUNKS_CONTRACT =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? '0x8A94C756ED416d629d8bf5C21a04411EA699b545'
    : '0x5EA899dBc8d3CDE806142a955806e06759B05fB8';

export const LINKSWAPPER_CONTRACT =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? '0xA0E6e5c501531C5f4f1D07aB87169f2DeAECe04F'
    : '';

export const BEEBITS_CONTRACT =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? '0xc48FF386C00777Da2932740f414A782452d8baF1'
    : '';

export const PANCAKE_ROUTER_CONTRACT =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? '0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
    : '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F';

export const LINK_TOKEN =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06'
    : '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD';
