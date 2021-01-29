import { parseBalance } from 'utils/helper';

export const SET_WEB3 = 'SET_WEB3';
export const setWeb3 = (web3) => (dispatch, getState) => {
  dispatch({ type: SET_WEB3, web3 });
  let { chainId } = getState();

  dispatch(setChainId(chainId));
};

export const SET_CHAINID = 'SET_CHAINID';
export const setChainId = (chainId) => (dispatch) => {
  dispatch({ type: SET_CHAINID, chainId });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  var shortAddress = `${walletAddress.slice(0, 8)}...${walletAddress.slice(
    walletAddress.length - 6,
    walletAddress.length
  )}`;
  dispatch({
    type: SET_ADDRESS,
    walletAddress,
    shortAddress,
  });
  dispatch(setBalance());
};

export const SET_BALANCE = 'SET_BALANCE';
export const setBalance = () => async (dispatch, getState) => {
  let { web3, walletAddress } = getState();
  let balance;
  if (walletAddress !== null) balance = parseBalance(await web3.eth.getBalance(walletAddress), 18);
  else balance = 0;
  dispatch({
    type: SET_BALANCE,
    balance,
  });
};
