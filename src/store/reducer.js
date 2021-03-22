import * as actions from 'store/actions';

const initialState = {
  // 3box
  threeboxProfile: null,
  box: null,
  space: null,

  // Common
  web3: null,
  chainId: null,
  walletAddress: null,
  shortAddress: null,
  balance: 0,
  strSearch: '',

  // Erc721
  erc721Instances: null,
  erc721Tokens: null,
  isLoadingErc721: null,

  // Main contracts
  addressesProvider: null,
  nftList: null,
  vault: null,
  sellOrderList: null,
  market: null,
  creativeStudio: null,

  //NftList
  acceptedNftsAddress: [],

  //SellOrderList
  availableSellOrder: [],
  convertErc721Tokens: [],
  mySellOrder: [],

  //CreativeStudio
  userCollections: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_THREEBOX:
      return {
        ...state,
        threeboxProfile: action.threeboxProfile,
        box: action.box,
      };
    case actions.SET_SPACE:
      return {
        ...state,
        space: action.space,
      };
    case actions.SET_WEB3:
      return {
        ...state,
        web3: action.web3,
      };
    case actions.SET_CHAINID:
      return {
        ...state,
        chainId: action.chainId,
      };
    case actions.SET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
        shortAddress: action.shortAddress,
      };
    case actions.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case actions.SET_STR_SEARCH:
      return {
        ...state,
        strSearch: action.strSearch,
      };
    case actions.INIT_ERC721:
      return {
        ...state,
        erc721Instances: action.erc721Instances,
      };
    case actions.GET_OWNED_ERC721:
      return {
        ...state,
        erc721Tokens: action.erc721Tokens,
      };
    case actions.IS_LOADING_ERC721:
      return {
        ...state,
        isLoadingErc721: action.isLoadingErc721,
      };
    case actions.SET_ADDRESSESPROVIDER:
      return {
        ...state,
        addressesProvider: action.addressesProvider,
      };
    case actions.SET_NFTLIST:
      return {
        ...state,
        nftList: action.nftList,
      };
    case actions.SET_VAULT:
      return {
        ...state,
        vault: action.vault,
      };
    case actions.SET_SELLORDERLIST:
      return {
        ...state,
        sellOrderList: action.sellOrderList,
      };
    case actions.SET_MARKET:
      return {
        ...state,
        market: action.market,
      };
    case actions.SET_ACCEPTED_NFTS:
      return {
        ...state,
        acceptedNftsAddress: action.acceptedNftsAddress,
      };
    case actions.SET_AVAILABLE_SELL_ORDER:
      return {
        ...state,
        availableSellOrder721: action.availableSellOrder721,
        availableSellOrder1155: action.availableSellOrder1155,
        convertErc721Tokens: action.convertErc721Tokens,
      };
    case actions.SET_MY_SELL_ORDER:
      return {
        ...state,
        mySellOrder: action.mySellOrder,
      };
    case actions.SET_CREATIVESTUDIO:
      return {
        ...state,
        creativeStudio: action.creativeStudio,
      };
    case actions.SET_USER_COLLECTIONS:
      return {
        ...state,
        userCollections: action.userCollections,
      };
    default:
      return state;
  }
};

export default rootReducer;
