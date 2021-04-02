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
    Mochi: '0x3bF0FD7176204A80021C1BD17807144714E31148',
    NFTCampaign: '',
  },
  //BSC Testnet
  97: {
    AddressesProvider: '0x0Ec7E70451eAaA621B8987b358d735Cd7bE8BEb8',
    CreativeStudio: '0x5F211a7b9a4c40642ACf063Bfec49C8c7aA0B8D9',
    ExchangeOrderList: '0xcF2060b60817995531B02689b1fE8d99FA68f37e',
    Market: '0x4f23C6303B28FD000bCFD5015a39b3D4d81BF5BD',
    NftList: '0xAdfB55CC388bafCEAa5c7aB9FEf80D24c6bF4927',
    SellOrderList: '0xa51005672D2462F81FfcEEd4EE0c24bb33613b48',
    Vault: '0x450EC4eDd92101aCD5373B05C3048C4E2898931d',
    SeedifyNFT: '0xfA66C3001E0B3f9c6c203f5bBE483D121B28Ae6D',
    NFTCampaign: '0xD8C508b9B16d5C74Abb55C1C9B1CFB84256B1c06',
    Mochi: '0x0CDac5a6B23dB3da414b3F09bCD8a286c005Cff3',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
