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

  // Erc721
  erc721Instances: null,
  erc721Tokens: null,
  isLoadingErc721: null,
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
    default:
      return state;
  }
};

export default rootReducer;
