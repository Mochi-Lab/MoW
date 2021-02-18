const contractAddress = {
  //BSC Mainnet
  56: {
    AddressesProvider: '',
    NftList: '',
    Vault: '',
    SellOrderList: '',
    Market: '',
  },
  //BSC Testnet
  97: {
    AddressesProvider: '0x57E56119F640863c0004dF6aDd79beE1f12598fE',
    NftList: '0xcB94d851C47d72CdB0d285A50B61bD426903DeA4',
    Vault: '0x4B38B78DD9C5f72161b6D57890Dd365A121Ef554',
    SellOrderList: '0x7f530594048284bd841D492DE4FeDB1a7d6Ce40d',
    Market: '0xF4A977222bb3a0Eea888f455515237f7BD8F3560',
  },
  //Hmy Mainnet shard 0
  1666600000: {
    AddressesProvider: '0x57E56119F640863c0004dF6aDd79beE1f12598fE',
    NftList: '0xcB94d851C47d72CdB0d285A50B61bD426903DeA4',
    Vault: '0x4B38B78DD9C5f72161b6D57890Dd365A121Ef554',
    SellOrderList: '0x7f530594048284bd841D492DE4FeDB1a7d6Ce40d',
    Market: '0xF4A977222bb3a0Eea888f455515237f7BD8F3560',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
