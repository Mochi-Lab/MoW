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
    AddressesProvider: '0x9256AE394CAc7FA3c3DEC65aE5c9A4592a97f74E',
    NftList: '0xaCA040938913fA3A8d2f0893210EA3B34B68c0d9',
    Vault: '0x6610B40d72143332FA2856376482A038B5711C43',
    SellOrderList: '0x6E228E07B33afa09A27be4e3b57896C6A915A062',
    Market: '0x5232786A6263F7570F33635FC4Bb9f574EeBa1fF',
    CreativeStudio: '0x67afEC3F8958BbDED4Db6Cdcc6559ceee5703a2e',
    ExchangeOrderList: '0x7b816A80Dd5FbC5d098970ffD44feC7D8f649343',
    // generate nft for user
    Mochi: '0xe1A8671a0793eC4506AB3B829887214086130FAE',
    NFTCampaign: '0xB859B21CE9eC5A0bcF8C74B13a6732E637055034',
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
