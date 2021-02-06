const contractAddress = {
  //BSC Testnet
  56: {
    AddressesProvider: 0xed344ffe10ce4539c32154ba764bb8d4ed82e9f0,
    NftList: 0xf97e499dbd1d690605a5975756a5e9f12a43da53,
    Vault: 0xc5f48136ad509ec59c5c9c5b94adf67d9262540d,
    SellOrderList: 0xd81822e92590860183180ff0f5226b5cde7e4e03,
    Market: 0x6fdf1d418d54ff2733b651028cb09727920fe595,
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
