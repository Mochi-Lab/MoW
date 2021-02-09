import { parseBalance } from 'utils/helper';
import ERC721 from 'Contracts/ERC721.json';
import AddressesProvider from 'Contracts/AddressesProvider.json';
import Market from 'Contracts/Market.json';
import NFTList from 'Contracts/NFTList.json';
import SellOrderList from 'Contracts/SellOrderList.json';
import Vault from 'Contracts/Vault.json';
import axios from 'axios';
import { getContractAddress } from 'utils/getContractAddress';

var contractAddress;

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
export const setWeb3 = (web3) => (dispatch, getState) => {
  dispatch({ type: SET_WEB3, web3 });
  let { chainId } = getState();
  contractAddress = getContractAddress(chainId);

  const addressesProvider = new web3.eth.Contract(
    AddressesProvider.abi,
    contractAddress.AddressesProvider
  );
  const market = new web3.eth.Contract(Market.abi, contractAddress.Market);
  const nftList = new web3.eth.Contract(NFTList.abi, contractAddress.NFTList);
  const sellOrderList = new web3.eth.Contract(SellOrderList.abi, contractAddress.SellOrderList);
  const vault = new web3.eth.Contract(Vault.abi, contractAddress.Vault);
  dispatch(setAddressesProvider(addressesProvider));
  dispatch(setMarket(market));
  dispatch(setNftList(nftList));
  dispatch(setSellOrderList(sellOrderList));
  dispatch(setVault(vault));
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
  if (!!contracts[chainId]) {
    erc721Instances = await contracts[chainId].map(
      (contract) => new web3.eth.Contract(ERC721.abi, contract.address)
    );
    dispatch({ type: INIT_ERC721, erc721Instances });
    dispatch(getOwnedERC721(erc721Instances));
  }
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

////////////////////
// CONTRACT ADDRESS
////////////////////
export const SET_ADDRESSESPROVIDER = 'SET_ADDRESSESPROVIDER';
export const setAddressesProvider = (addressesProvider) => async (dispatch) => {
  dispatch({
    type: SET_ADDRESSESPROVIDER,
    addressesProvider,
  });
};

export const SET_NFTLIST = 'SET_NFTLIST';
export const setNftList = (nftList) => async (dispatch) => {
  dispatch({
    type: SET_NFTLIST,
    nftList,
  });
};

export const SET_VAULT = 'SET_VAULT';
export const setVault = (vault) => async (dispatch) => {
  dispatch({
    type: SET_VAULT,
    vault,
  });
};

export const SET_SELLORDERLIST = 'SET_SELLORDERLIST';
export const setSellOrderList = (sellOrderList) => async (dispatch) => {
  dispatch({
    type: SET_SELLORDERLIST,
    sellOrderList,
  });
};

export const SET_MARKET = 'SET_MARKET';
export const setMarket = (market) => async (dispatch) => {
  dispatch({
    type: SET_MARKET,
    market,
  });
};

////////////////////
// NFTs List
////////////////////

export const SET_ACCEPTED_NFTS = 'SET_ACCEPTED_NFTS';
export const setAcceptedNfts = () => async (dispatch, getState) => {
  const { nftList } = getState();
  try {
    let acceptedNftsAddress = await nftList.methods.getAcceptedNFTs().call();
    dispatch({ type: SET_ACCEPTED_NFTS, acceptedNftsAddress });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getNftInfo = async (nftAddress, nftList) => {
  try {
    let nftInfo = await nftList.methods.getNFTInfor(nftAddress).call();
    return nftInfo;
  } catch (e) {
    console.log(e);
    return null;
  }
};

////////////////////
// SellOrders List
////////////////////

export const SET_AVAILABLE_SELL_ORDER = 'SET_AVAILABLE_SELL_ORDER';
export const setAvailableSellOrder = () => async (dispatch, getState) => {
  const { sellOrderList } = getState();
  try {
    let availableSellOrder = await sellOrderList.methods.getAvailableSellOrder().call();
    dispatch({ type: SET_AVAILABLE_SELL_ORDER, availableSellOrder });
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const SET_MY_SELL_ORDER = 'SET_MY_SELL_ORDER';
export const setMySellOrder = () => async (dispatch, getState) => {
  const { sellOrderList, add } = getState();
  try {
    let mySellOrder = await sellOrderList.methods.getAllSellOrderIdListByUser().call();
    dispatch({ type: SET_MY_SELL_ORDER, mySellOrder });
  } catch (e) {
    console.log(e);
  }
};
