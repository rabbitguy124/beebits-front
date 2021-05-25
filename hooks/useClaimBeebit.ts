import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import request from 'graphql-request';
import { useState, useEffect, useMemo } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { BEEBITS_CONTRACT } from '../utils/contracts';
import { checkBeebitData } from '../utils/queries';

const claimABI = [
  {
    inputs: [
      { internalType: 'uint256', name: '_createVia', type: 'uint256' },
      { internalType: 'uint256', name: '_deadline', type: 'uint256' },
    ],
    name: 'mintWithBunk',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
];

const ONE_HR_FROM_NOW = Math.floor(new Date().getTime() / 1000 + 3600);

type BeebitData = {
  tokenId: string;
  holder: string;
  mintedAt: string;
};

const useClaimBeebit = () => {
  const [mintReqStatus, setMintReqStatus] = useState(false);
  const [claimedBeebit, setClaimedBeebit] = useState<BeebitData | null>(null);
  const [bunkId, setBunkId] = useState('');

  const { ethersProvider: provider } = useWeb3();

  const beebitsContract = useMemo(() => {
    return new Contract(BEEBITS_CONTRACT, claimABI, provider?.getSigner());
  }, [provider]);

  function reset() {
    setMintReqStatus(false);
    setClaimedBeebit(null);
  }

  async function claimBeebit(bunkIndex: string, linkFee: BigNumber) {
    setBunkId(bunkIndex);
    await (
      await beebitsContract.mintWithBunk(
        parseInt(bunkIndex) + 1,
        ONE_HR_FROM_NOW,
        {
          value: linkFee,
        }
      )
    ).wait();
    setMintReqStatus(true);
  }

  useEffect(() => {
    if (mintReqStatus && provider) {
      const intervalId = setInterval(async () => {
        const { beebits } = await request(
          process.env.NEXT_PUBLIC_GRAPH_URL,
          checkBeebitData,
          {
            bunkIndex: bunkId,
          }
        ).catch((err) => {
          console.error(err.message);
          return { beebits: [] };
        });

        console.log(beebits);

        if (beebits.length > 0) {
          setClaimedBeebit(() => ({ ...beebits[0] }));
          clearInterval(intervalId);
        }
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [mintReqStatus, provider]);

  return { mintReqStatus, claimBeebit, claimedBeebit, reset };
};

export default useClaimBeebit;
