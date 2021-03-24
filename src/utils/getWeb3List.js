import Web3 from 'web3';

export const web3Default = {
  //BSC Mainnet
  56: {
    web3Default: new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')),
    name: 'Binance Mainnet',
    explorer: 'https://bscscan.com/tx/',
  },
  //BSC Testnet
  97: {
    web3Default: new Web3(
      new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s3.binance.org:8545/')
    ),
    name: 'Binance Testnet',
    explorer: 'https://testnet.bscscan.com/tx/',
  },
};

export const networkDefault = 97;

export const getWeb3List = (_chainId) => {
  return web3Default[_chainId];
};
