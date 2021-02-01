import * as actions from 'store/actions';

const initialState = {
  threeboxProfile: null,
  box: null,
  space: null,
  web3: null,
  chainId: null,
  walletAddress: null,
  shortAddress: null,
  balance: 0,
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
    default:
      return state;
  }
};

export default rootReducer;
