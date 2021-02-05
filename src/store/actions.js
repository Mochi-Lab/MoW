import { parseBalance } from 'utils/helper';
import ERC721 from 'Contracts/ERC721.json';
import axios from 'axios';

////////////////////
// 3box
////////////////////

export const SET_THREEBOX = 'SET_THREEBOX';
export const setThreebox = (threeboxProfile, box) => (dispatch) => {
  dispatch({ type: SET_THREEBOX, threeboxProfile, box });
};

export const SET_SPACE = 'SET_SPACE';
export const setSpace = (space) => (dispatch) => {
  dispatch({ type: SET_SPACE, space });
};
////////////////////
// Common
////////////////////

export const SET_WEB3 = 'SET_WEB3';
export const setWeb3 = (web3) => (dispatch) => {
  dispatch({ type: SET_WEB3, web3 });
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

////////////////////
// ERC721
////////////////////
export const INIT_ERC721 = 'INIT_ERC721';
export const initERC721 = (contracts) => async (dispatch, getState) => {
  let { web3, chainId } = getState();
  let erc721Instances = [];
  erc721Instances = await contracts[chainId].map(
    (contract) => new web3.eth.Contract(ERC721.abi, contract.address)
  );
  dispatch({ type: INIT_ERC721, erc721Instances });
  dispatch(getOwnedERC721(erc721Instances));
};

export const GET_OWNED_ERC721 = 'GET_OWNED_ERC721';
export const getOwnedERC721 = (erc721Instances) => async (dispatch, getState) => {
  let { walletAddress } = getState();
  // Start loading
  dispatch(setLoadingErc721(true));

  var getERC721 = (instance) => {
    return new Promise(async (resolve) => {
      let ERC721token = {};
      let balance = await instance.methods.balanceOf(walletAddress).call();
      if (balance > 0) {
        ERC721token.balanceOf = await instance.methods.balanceOf(walletAddress).call();
        ERC721token.name = await instance.methods.name().call();
        ERC721token.symbol = await instance.methods.symbol().call();
        ERC721token.tokens = [];

        for (let i = 0; i < ERC721token.balanceOf; i++) {
          let token = {};
          token.index = await instance.methods.tokenOfOwnerByIndex(walletAddress, i).call();
          token.tokenURI = await instance.methods.tokenURI(token.index).call();
          token.addressToken = instance._address;
          let req = await axios.get(token.tokenURI);
          token.detail = req.data;
          ERC721token.tokens.push(token);
        }
        resolve(ERC721token);
      } else {
        resolve();
      }
    });
  };

  let erc721Tokens = await Promise.all(
    erc721Instances.map(async (instance) => {
      return await getERC721(instance);
    })
  );

  erc721Tokens = erc721Tokens.filter(function (el) {
    return el != null;
  });

  dispatch({ type: GET_OWNED_ERC721, erc721Tokens });

  // Loading done
  dispatch(setLoadingErc721(false));
};

export const IS_LOADING_ERC721 = 'IS_LOADING_ERC721';
export const setLoadingErc721 = (isLoadingErc721) => async (dispatch) => {
  dispatch({
    type: IS_LOADING_ERC721,
    isLoadingErc721,
  });
};
