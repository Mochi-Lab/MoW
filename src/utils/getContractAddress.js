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
    AddressesProvider: '0x61c8C967b54118d3310A24f0D4c1aA4A51bA11A4',
    NftList: '0x8717b0243ADaB85213f002F062dD43ef48647CfB',
    Vault: '0x672a1AE943b870184644d0b36A1a210AffDcb984',
    SellOrderList: '0xf6901a458Def0F2C94C47947a2016F782F2ea2ba',
    Market: '0xb4C087DF69Cf9A54B5FA0b47B59Bd6b46266579B',
    // generate nft for user
    ChoBua: '0xEB8894de49349b9dfe804d43BFe988F483EaB5e7',
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
