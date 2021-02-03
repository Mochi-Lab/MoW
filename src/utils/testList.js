export const erc721List = {
  // Mainnet
  1: [
    {
      name: 'KUDO',
      address: '0x2aea4add166ebf38b63d09a75de1a7b94aa24163',
    },
    {
      name: 'AXIE',
      address: '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d', // not
    },
    {
      name: 'iPhone',
      address: '0x77fde3242eaA67E7ee21bEf8247d9909dbA06ee4',
    },
  ],
  3: [],
  4: [],
};

////// ERC721 form data after getting from eth network
// [{balanceOf: "36", name: "KudosToken", symbol: "KDO", tokens: Array(36)}
// balanceOf: "36"
// name: "KudosToken"
// symbol: "KDO"
// tokens: (36) [
//   0:
// index: "16120"
// tokenURI: "https://ipfs-2.gitcoin.co:443/api/v0/cat/QmPhahLSpfxHPNCqCoVmfexdpDDtReRwiHwiSFDneMGvpy"
// detail:
// attributes: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// background_color: "fbfbfb"
// description: "this kudos is for those who build the future of the community"
// external_url: "https://gitcoin.co/kudos/0x2aEa4Add166EBf38b63d09a75dE1a7b94Aa24163/11925"
// image: "https://gitcoin-storage-fz4cb2.s3-us-west-2.amazonaws.com/media/uploads/46750deb-2a29-4341-bbe5-3c615fd3ac69_b7695301-23f1-4f54-8743-eaa9ce900cda_city of future.svg"
// name: "Future City"
// , {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]}
// ,{balanceOf: "10", name: "Axie", symbol: "AX", tokens: Array(36)}
// balanceOf: "10"
// name: "Axie"
// symbol: "AX"
// tokens: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]}
// ]
