import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { setChainId, setWeb3, setAddress, setAcceptedNfts, setThreebox } from 'store/actions';
import store from 'store/index';
import Box from '3box';

// //Mainnet
// export const web3Default = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

// Testnet
export const web3Default = new Web3(
  new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s2.binance.org:8545/')
);

const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  return profile;
};

const Sync3Box = async (address, provider) => {
  try {
    const threeBoxProfile = await getThreeBox(address);

    const box = await Box.openBox(address, provider);

    await box.syncDone;

    store.dispatch(setThreebox(threeBoxProfile, box));
  } catch (e) {
    console.log(e);
  }
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: 'https://bsc-dataseed.binance.org/',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      },
    },
  },
};

export const connectWeb3Modal = async () => {
  const web3Modal = new Web3Modal({
    // network: 'mainnet', // optional
    providerOptions, // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);

  let chainId = await web3.eth.net.getId();

  if (chainId === 56 || chainId === 97) {
    let accounts = await web3.eth.getAccounts();

    store.dispatch(setChainId(chainId));
    store.dispatch(setWeb3(web3));

    if (accounts.length > 0) {
      // Sync 3box
      Sync3Box(accounts[0], provider);

      store.dispatch(setAddress(accounts[0]));

      // Init ERC721
      store.dispatch(setAcceptedNfts());
    }
  } else {
    alert('Please change to Mainnet or Testnet of Binance Smart Chain');
  }

  // Subscribe to accounts change
  provider.on('accountsChanged', (accounts) => {
    store.dispatch(setAddress(accounts[0]));
    store.dispatch(setAcceptedNfts());
    Sync3Box(accounts[0], provider);
  });

  // Subscribe to chainId change
  provider.on('chainChanged', (chainId) => {
    chainId = parseInt(web3.utils.hexToNumber(chainId));
    if (chainId === 56 || chainId === 97) {
      store.dispatch(setChainId(chainId));
      store.dispatch(setAcceptedNfts());
    } else {
      alert('Please change to Mainnet or Testnet of Binance Smart Chain');
    }
  });

  // Subscribe to provider connection
  provider.on('connect', (info) => {
    console.log(info);
  });

  // Subscribe to provider disconnection
  provider.on('disconnect', (error) => {
    console.log(error);
    store.dispatch(setAddress(null));
  });
};
