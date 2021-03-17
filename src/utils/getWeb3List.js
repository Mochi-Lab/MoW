import Web3 from 'web3';

const web3Default = {
  //BSC Mainnet
  56: {
    web3Default: new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')),
  },
  //BSC Testnet
  97: {
    web3Default: new Web3(
      new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s2.binance.org:8545/')
    ),
  },
  //Hmy Mainnet shard 0
  1666600000: {},
};

export const getWeb3List = (_chainId) => {
  return web3Default[_chainId];
};
