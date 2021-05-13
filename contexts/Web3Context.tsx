import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Web3Modal, { IProviderOptions } from 'web3modal';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { provider, CustomChainParams } from 'web3-core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getRPCUrl } from '../helpers';

const Web3Context = createContext<{
  ethersProvider: ethers.providers.Web3Provider | null;
  connectWallet: () => Promise<void>;
  walletConToggle: boolean;
  providerChainId: number | null;
  account: string | null;
}>({
  ethersProvider: null,
  connectWallet: () => Promise.resolve(),
  walletConToggle: true,
  providerChainId: null,
  account: null,
});

export const useWeb3 = () => useContext(Web3Context);

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: getRPCUrl(56),
        97: getRPCUrl(97),
      },
    },
  },
};

const Web3Provider: React.FC = ({ children }) => {
  const web3Modal = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new Web3Modal({
            cacheProvider: true,
            providerOptions,
          })
        : null,
    []
  );

  const [{ ethersProvider, account, providerChainId }, setWeb3State] =
    useState<{
      providerChainId: number | null;
      ethersProvider: ethers.providers.Web3Provider | null;
      account: string | null;
    }>({ providerChainId: null, ethersProvider: null, account: null });

  const [walletConToggle, setWalletConToggle] = useState(true);

  const setWeb3Provider = useCallback(
    async (
      provider: (provider & { chainId: string }) | undefined,
      initialCall: boolean = false
    ) => {
      try {
        if (provider) {
          const web3Provider = new Web3(provider);
          const ethersProvider = new ethers.providers.Web3Provider(
            web3Provider.currentProvider as ethers.providers.ExternalProvider
          );
          const providerChainId = parseInt(provider.chainId || '0');
          const account = await ethersProvider.getSigner().getAddress();

          setWeb3State((prevState) => ({
            ethersProvider,
            providerChainId,
            account: initialCall ? account : prevState.account,
          }));
        }
      } catch (err) {
        console.error(err?.message);
      }
    },
    []
  );

  const connectWallet = useCallback(async () => {
    try {
      setWalletConToggle(true);
      const modalProvider = await web3Modal.connect();
      await setWeb3Provider(modalProvider, true);

      modalProvider.on('accountsChanged', (accounts: string[]) => {
        setWeb3State((prevState) => ({
          ...prevState,
          account: accounts[0],
        }));
      });

      modalProvider.on('chainChanged', () => {
        setWeb3Provider(modalProvider);
      });
    } catch (err) {
      console.error(err?.message);
    } finally {
      setWalletConToggle(false);
    }
  }, [setWeb3Provider]);

  useEffect(() => {
    if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;
    const processConnection = async () => {
      if (web3Modal.cachedProvider) connectWallet();
      else setWalletConToggle(false);
    };
    processConnection();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        ethersProvider,
        account,
        providerChainId,
        walletConToggle,
        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
