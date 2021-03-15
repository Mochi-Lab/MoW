const contractAddress = {
  //BSC Mainnet
  56: {
    AddressesProvider: '0xc6732Eb8A138052D9e3DFEB66cB0175C94f7e970',
    NftList: '0xC8224F5511fae865793B4235b1aA02011637e742',
    Vault: '0xDa5F1f8d32C094a6c0fc21319bA2E5a64265C429',
    SellOrderList: '0x4786999b7Ebb24876B2bD4705ecc89ECeebDa559',
    Market: '0xc6A8101003d7d2ce14BD344e3df23E4AAfd77899',
    CreativeStudio: '0xa5dD241c1A9A9826fB8E78c7db4dc8fdD3043b66',
    ExchangeOrderList: '0x37ca1D6c7479F3Eb9d6d10309e6f0C611E6bE48F',
    // generate nft for user
    Mochi: '0x3bF0FD7176204A80021C1BD17807144714E31148',
    NFTCampaign: '',
  },
  //BSC Testnet
  97: {
    AddressesProvider: '0x78de5478Eb3649C6894ce545A11c84e56077c26f',
    NftList: '0xE203287a41B56845652e6607A947e913ADd01E69',
    Vault: '0x2361A85d39686A27689051624e7Dd5a0DF1A0693',
    SellOrderList: '0x7E6A22965E26E9A5C9CEd3FDb7df8B7325848802',
    Market: '0x2184994315dF10eeBD938CfaE7289eD30C8bAdE8',
    CreativeStudio: '0xc42e002888d55002982F9a902b3d1517f528FB4B',
    ExchangeOrderList: '0x371Ac863d7af19dE85a521d10aB5eAa90718D261',
    // generate nft for user
    Mochi: '0xe1A8671a0793eC4506AB3B829887214086130FAE',
    NFTCampaign: '0x29D659f3E8530c92CD0a1e6f93412038a5B90024',
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
