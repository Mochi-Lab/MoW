import { parseBalance } from 'utils/helper';
// import ERC1155 from 'Contracts/ERC1155.json';
import ERC721 from 'Contracts/ERC721.json';
import SampleERC721 from 'Contracts/SampleERC721.json';
import Mochi from 'Contracts/Mochi.json';
import AddressesProvider from 'Contracts/AddressesProvider.json';
import Market from 'Contracts/Market.json';
import NFTList from 'Contracts/NFTList.json';
import SellOrderList from 'Contracts/SellOrderList.json';
import Vault from 'Contracts/Vault.json';
import CreativeStudio from 'Contracts/CreativeStudio.json';
import NFTCampaign from 'Contracts/NFTCampaign.json';
import ERC20 from 'Contracts/ERC20.json';
import axios from 'axios';
import { getContractAddress } from 'utils/getContractAddress';
import { message } from 'antd';
import * as randomAvatarGenerator from '@fractalsoftware/random-avatar-generator';
const IPFS = require('ipfs-http-client');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
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
export const setWeb3 = (web3) => async (dispatch, getState) => {
  dispatch({ type: SET_WEB3, web3 });

  let chainId = getState().chainId ? getState().chainId : await web3.eth.net.getId();
  contractAddress = getContractAddress(chainId);

  const addressesProvider = new web3.eth.Contract(
    AddressesProvider.abi,
    contractAddress.AddressesProvider
  );
  const market = new web3.eth.Contract(Market.abi, contractAddress.Market);
  const nftList = new web3.eth.Contract(NFTList.abi, contractAddress.NftList);
  const sellOrderList = new web3.eth.Contract(SellOrderList.abi, contractAddress.SellOrderList);
  const vault = new web3.eth.Contract(Vault.abi, contractAddress.Vault);
  const creativeStudio = new web3.eth.Contract(CreativeStudio.abi, contractAddress.CreativeStudio);
  const nftCampaign = new web3.eth.Contract(NFTCampaign.abi, contractAddress.NFTCampaign);
  dispatch(setAddressesProvider(addressesProvider));
  dispatch(setMarket(market));
  dispatch(setNftList(nftList));
  dispatch(setSellOrderList(sellOrderList));
  dispatch(setVault(vault));
  dispatch(setCreativeStudio(creativeStudio));
  dispatch(setNftClaimToken(nftCampaign));

  dispatch(setAvailableSellOrder());
};

export const SET_CHAINID = 'SET_CHAINID';
export const setChainId = (chainId) => (dispatch) => {
  dispatch({ type: SET_CHAINID, chainId });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  if (walletAddress !== null) {
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

    dispatch(setCollectionByUser());
  }
};

export const SET_BALANCE = 'SET_BALANCE';
export const setBalance = () => async (dispatch, getState) => {
  let { web3, walletAddress } = getState();
  let balance;
  if (walletAddress !== null)
    balance = parseBalance((await web3.eth.getBalance(walletAddress)).toString(), 18);
  else balance = 0;
  dispatch({
    type: SET_BALANCE,
    balance,
  });
};

export const SET_STR_SEARCH = 'SET_STR_SEARCH';
export const setStrSearch = (strSearch) => (dispatch) => {
  dispatch({ type: SET_STR_SEARCH, strSearch });
};

////////////////////
// ERC721
////////////////////
export const INIT_ERC721 = 'INIT_ERC721';
export const initERC721 = (nftList) => async (dispatch, getState) => {
  let { web3 } = getState();
  let erc721Instances = [];
  if (!!nftList) {
    erc721Instances = await nftList.map((contract) => new web3.eth.Contract(ERC721.abi, contract));
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
          try {
            let req = await axios.get(token.tokenURI);
            token.detail = req.data;
            ERC721token.tokens.push(token);
          } catch (error) {
            token.detail = { name: 'Unnamed', description: '' };
            ERC721token.tokens.push(token);
          }
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

export const transferNft = (contractAddress, to, tokenId) => async (dispatch, getState) => {
  let { walletAddress, web3, erc721Instances } = getState();
  let nftInstance = new web3.eth.Contract(ERC721.abi, contractAddress);
  try {
    await dispatch(setLoadingTx(true));
    await nftInstance.methods
      .safeTransferFrom(walletAddress, to, tokenId)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Transfer Successfully');
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
      });
    await dispatch(setLoadingTx(false));
  } catch (error) {
    await dispatch(setLoadingTx(false));
    message.error('Oh no! Something went wrong !');
  }
  // get own nft
  dispatch(getOwnedERC721(erc721Instances));
};

export const getERC721Info = () => async (dispatch, getState) => {
  let { web3, userCollections } = getState();
  let instance = new web3.eth.Contract(ERC721.abi, userCollections[0].contractAddress);
  let ERC721token = {};
  ERC721token.name = await instance.methods.name().call();
  ERC721token.symbol = await instance.methods.symbol().call();
  return ERC721token;
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

export const SET_CREATIVESTUDIO = 'SET_CREATIVESTUDIO';
export const setCreativeStudio = (creativeStudio) => async (dispatch) => {
  dispatch({
    type: SET_CREATIVESTUDIO,
    creativeStudio,
  });
};

////////////////////
// NFTs List
////////////////////

export const registerNft = (contractAddress) => async (dispatch, getState) => {
  const { nftList, walletAddress, web3 } = getState();

  try {
    // is contract address
    let ERC721token = new web3.eth.Contract(ERC721.abi, contractAddress);
    await ERC721token.methods.name().call();
    nftList.methods
      .registerNFT(contractAddress)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Register Successfully');
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
      });
  } catch (error) {
    console.log(error);
    message.error('Sorry, but this is not contract address');
  }
};

export const SET_ACCEPTED_NFTS = 'SET_ACCEPTED_NFTS';
export const setAcceptedNfts = () => async (dispatch, getState) => {
  const { nftList } = getState();
  try {
    let acceptedNftsAddress = await nftList.methods.getAcceptedNFTs().call();
    dispatch({ type: SET_ACCEPTED_NFTS, acceptedNftsAddress });
    dispatch(initERC721(acceptedNftsAddress));
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
  const { sellOrderList, web3 } = getState();
  const pushErc721 = async (listNftContract) => {
    let ERC721token = { name: '', symbol: '', avatarToken: '', tokens: [] };
    ERC721token.name = await listNftContract.instance.methods.name().call();
    ERC721token.symbol = await listNftContract.instance.methods.symbol().call();
    let avatarData = randomAvatarGenerator.generateRandomAvatarData();
    ERC721token.avatarToken = randomAvatarGenerator.getAvatarFromData(avatarData);

    ERC721token.tokens = await Promise.all(
      listNftContract.tokenId.map(async (order, index) => {
        let token = {};
        token.index = order.id;
        token.tokenURI = await listNftContract.instance.methods.tokenURI(order.id).call();
        token.addressToken = listNftContract.instance._address;
        token.price = listNftContract.price[index];
        token.collections = ERC721token.name;
        token.symbolCollections = ERC721token.symbol;
        token.sortIndex = order.sortIndex;
        return token;
      })
    );
    return ERC721token;
  };

  // Loading done
  if (sellOrderList) {
    try {
      let availableSellOrder = await sellOrderList.methods.getAvailableSellOrder().call();

      var convertErc721Tokens = [];
      var listNftContracts = [];

      availableSellOrder.erc721.map(async (sellOrder, i) => {
        let token = { tokenId: [], price: [] };
        let nftindex = listNftContracts.findIndex((nft) => nft.nftAddress === sellOrder.nftAddress);
        if (nftindex === -1) {
          token.nftAddress = sellOrder.nftAddress;
          token.instance = new web3.eth.Contract(ERC721.abi, sellOrder.nftAddress);
          token.tokenId.push({ sortIndex: i, id: sellOrder.tokenId });
          token.price.push(sellOrder.price);
          listNftContracts.push(token);
        } else {
          listNftContracts[nftindex].tokenId.push({ sortIndex: i, id: sellOrder.tokenId });
          listNftContracts[nftindex].price.push(sellOrder.price);
        }
      });

      convertErc721Tokens = await Promise.all(
        listNftContracts.map(async (listNftcontract) => {
          return await pushErc721(listNftcontract);
        })
      );
      dispatch({
        type: SET_AVAILABLE_SELL_ORDER,
        availableSellOrder721: availableSellOrder.erc721,
        availableSellOrder1155: availableSellOrder.erc1155,
        convertErc721Tokens,
      });
      dispatch(setLoadingErc721(false));
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};

export const SET_MY_SELL_ORDER = 'SET_MY_SELL_ORDER';
export const setMySellOrder = () => async (dispatch, getState) => {
  const { sellOrderList, walletAddress } = getState();
  try {
    let mySellOrder = await sellOrderList.methods.getAllSellOrderIdListByUser(walletAddress).call();
    dispatch({ type: SET_MY_SELL_ORDER, mySellOrder });
  } catch (e) {
    console.log(e);
  }
};

export const createSellOrder = (nftAddress, tokenId, price) => async (dispatch, getState) => {
  const { market, walletAddress, web3 } = getState();
  try {
    const erc721Instances = await new web3.eth.Contract(ERC721.abi, nftAddress);

    // Check to see if nft have accepted
    let addressApproved = await erc721Instances.methods.getApproved(tokenId).call();

    if (addressApproved !== market._address)
      // Approve ERC721
      await erc721Instances.methods.approve(market._address, tokenId).send({ from: walletAddress });

    // Create Sell Order
    await market.methods
      // TODO : can sale with other token
      .createSellOrder(nftAddress, tokenId, 1, price, '0x0000000000000000000000000000000000000000')
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Create Sell Order Successfully');
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
      });
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }

  // Fetch new availableOrderList
  dispatch(setAvailableSellOrder());
};

export const buyNft = (orderDetail) => async (dispatch, getState) => {
  const { market, walletAddress, erc721Instances } = getState();
  try {
    await market.methods
      .buy(orderDetail.sellId, 1, '0x')
      .send({ from: walletAddress, value: orderDetail.price })
      .on('receipt', (receipt) => {
        message.success('Successfully purchased !');
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
      });
  } catch (error) {
    message.error('Oh no! Something went wrong !');
  }

  // Fetch new availableOrderList
  dispatch(setAvailableSellOrder());
  // get own nft
  dispatch(getOwnedERC721(erc721Instances));
};

export const cancelSellOrder = (orderDetail) => async (dispatch, getState) => {
  const { market, walletAddress } = getState();
  try {
    await dispatch(setLoadingTx(true));
    await market.methods
      .cancleSellOrder(orderDetail.sellId)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Cancel Successfully');
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
      });
    await dispatch(setLoadingTx(false));
  } catch (error) {
    await dispatch(setLoadingTx(false));
    message.error('Oh no! Something went wrong !');
  }

  // Fetch new availableOrderList
  dispatch(setAvailableSellOrder());
};

export const IS_LOADING_TX = 'IS_LOADING_TX';
export const setLoadingTx = (isLoadingTx) => async (dispatch) => {
  dispatch({
    type: IS_LOADING_TX,
    isLoadingTx,
  });
};

////////////////////
// Create New NFT
////////////////////

export const generateNFT = (isUserCollection, tokenUri) => async (dispatch, getState) => {
  let { web3, chainId, walletAddress, erc721Instances, userCollections } = getState();
  contractAddress = getContractAddress(chainId);
  let erc721Instance;
  if (isUserCollection) {
    erc721Instance = await new web3.eth.Contract(
      SampleERC721.abi,
      userCollections[0].contractAddress
    );
  } else {
    erc721Instance = await new web3.eth.Contract(Mochi.abi, contractAddress.Mochi);
  }

  try {
    await erc721Instance.methods
      .mint(walletAddress, tokenUri)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Create Successfully !');
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
      });
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }
  // get own nft
  dispatch(getOwnedERC721(erc721Instances));
};

////////////////////
// Create Collection
////////////////////

export const SET_USER_COLLECTIONS = 'SET_USER_COLLECTIONS';
export const setCollectionByUser = () => async (dispatch, getState) => {
  let { walletAddress, creativeStudio } = getState();
  try {
    let userCollections = await creativeStudio.methods.getCollectionByUser(walletAddress).call();
    dispatch({ type: SET_USER_COLLECTIONS, userCollections });
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }
};

export const createCollection = ({ name, symbol }) => async (dispatch, getState) => {
  let { walletAddress, creativeStudio } = getState();

  try {
    await creativeStudio.methods
      .createERC721Collection(name, symbol)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        dispatch(setCollectionByUser());
        message.success('Create Successfully !');
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
      });
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }
  // get own nft
  dispatch(setAcceptedNfts());
};

////////////////////
// Campaign - Airdrop
////////////////////

export const SET_NFT_CLAIM_TOKEN = 'SET_NFT_CLAIM_TOKEN';
export const setNftClaimToken = (nftCampaign) => async (dispatch) => {
  dispatch({
    type: SET_NFT_CLAIM_TOKEN,
    nftCampaign,
  });
};

export const FETCH_LIST_CAMPAIGN = 'FETCH_LIST_CAMPAIGN';
export const fetchListCampaign = () => async (dispatch, getState) => {
  let { nftCampaign, web3, walletAddress } = getState();
  try {
    if (!!web3 && !!contractAddress && !!contractAddress.NFTCampaign) {
      dispatch(setLoadingCampaign(true));
      if (!nftCampaign) {
        nftCampaign = new web3.eth.Contract(NFTCampaign.abi, contractAddress.NFTCampaign);
        dispatch(setNftClaimToken(nftCampaign));
      }
      let allCampaigns = await nftCampaign.methods.getAllCaimpaigns().call();
      let listCampaignFilter = allCampaigns.filter((campaign) => campaign.status !== '3');
      let getCampaignsByOwner = [];
      const ownerContractCampaign = await nftCampaign.methods.owner().call();
      if (!!walletAddress) {
        if (walletAddress.toLowerCase() !== ownerContractCampaign.toLowerCase()) {
          getCampaignsByOwner = await nftCampaign.methods.getCampaignsByOwner(walletAddress).call();
          listCampaignFilter = listCampaignFilter.filter(
            (campaign) =>
              campaign.status === '1' || getCampaignsByOwner.includes(campaign.campaignId)
          );
        }
      } else {
        listCampaignFilter = allCampaigns.filter((campaign) => campaign.status === '1');
      }
      var getInfoCampaign = (instance) => {
        return new Promise(async (resolve) => {
          let req = await axios.get(instance.infoURL);
          let infoCampaign = { ...instance };
          infoCampaign.titleShort = req.data.titleShort ? req.data.titleShort : '';
          infoCampaign.slogan = req.data.slogan ? req.data.slogan : '';
          infoCampaign.titleDescription = req.data.titleDescription
            ? req.data.titleDescription
            : '';
          infoCampaign.description = req.data.description ? req.data.description : '';
          infoCampaign.urlIcon = req.data.urlIcon ? req.data.urlIcon : '';
          infoCampaign.urlBanner = req.data.urlBanner ? req.data.urlBanner : '';

          let balanceNFT = 0;
          let tokensYetClaim = [];
          let canCancel = false;
          let allNFTsOfOwner = [];
          if (!!walletAddress) {
            let instanceNFT = new web3.eth.Contract(ERC721.abi, instance.nftAddress);
            balanceNFT = await instanceNFT.methods.balanceOf(walletAddress).call();
            if (balanceNFT > 0) {
              for (let i = 0; i < balanceNFT; i++) {
                let tokenId = await instanceNFT.methods
                  .tokenOfOwnerByIndex(walletAddress, i)
                  .call();
                let claimStatus = await nftCampaign.methods
                  .getClaimStatus(instance.campaignId, tokenId)
                  .call();
                if (!claimStatus) {
                  tokensYetClaim.push(tokenId);
                }
                let tokenURI = await instanceNFT.methods.tokenURI(tokenId).call();
                try {
                  let req = await axios.get(tokenURI);
                  let detail = req.data;
                  detail.tokenId = tokenId;
                  allNFTsOfOwner.push(detail);
                } catch (error) {
                  let detail = { name: 'Unnamed', description: '', tokenId };
                  allNFTsOfOwner.push(detail);
                }
              }
            }
            if (instance.campaignOwner.toLowerCase() === walletAddress.toLowerCase()) {
              canCancel = true;
            }
          }
          let instanceTokenEarn = await new web3.eth.Contract(ERC20.abi, instance.tokenAddress);
          infoCampaign.symbolTokenEarn = !!instanceTokenEarn
            ? await instanceTokenEarn.methods.symbol().call()
            : '';
          infoCampaign.balanceTokenEarn = !!instanceTokenEarn
            ? await instanceTokenEarn.methods.balanceOf(walletAddress).call()
            : 0;
          infoCampaign.balanceNFT = !!balanceNFT ? balanceNFT : 0;
          infoCampaign.tokensYetClaim = !!tokensYetClaim ? tokensYetClaim : [];
          infoCampaign.canCancel = canCancel;
          infoCampaign.ownerContractCampaign = ownerContractCampaign;
          infoCampaign.allNFTsOfOwner = allNFTsOfOwner;
          resolve(infoCampaign);
        });
      };

      listCampaignFilter = listCampaignFilter.sort((a, b) => {
        if (a.campaignId > b.campaignId) return -1;
        if (a.campaignId < b.campaignId) return 1;
        return 0;
      });
      let listCampaign = await Promise.all(
        listCampaignFilter.map(async (instance) => {
          return await getInfoCampaign(instance);
        })
      );
      dispatch({ type: FETCH_LIST_CAMPAIGN, listCampaign });
      dispatch(setLoadingCampaign(false));
    }
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }
};

export const addCampaign = (
  nftAddress,
  tokenAddress,
  totalSlots,
  amountPerSlot,
  startTime,
  endTime,
  titleShort,
  slogan,
  titleDescription,
  description,
  iconToken,
  bannerImg
) => async (dispatch, getState) => {
  let { nftCampaign, walletAddress, web3 } = getState();
  try {
    let resultAdd = false;
    if (!!nftCampaign) {
      let contentCampaign = {
        titleShort: '',
        slogan: '',
        description: '',
        urlIcon: '',
        urlBanner: '',
      };

      const promiseIcon = new Promise((resolve, reject) => {
        if (!!iconToken) {
          const readerIcon = new window.FileReader();
          readerIcon.readAsArrayBuffer(iconToken); // convert file to array for buffer
          readerIcon.onloadend = async () => {
            let results = await ipfs.add(readerIcon.result);
            let ipfsHash = results.cid.string;
            resolve('https://gateway.ipfs.io/ipfs/' + ipfsHash);
          };
        } else {
          resolve();
        }
      });

      const promiseBanner = new Promise((resolve, reject) => {
        if (!!bannerImg) {
          const readerBanner = new window.FileReader();
          readerBanner.readAsArrayBuffer(bannerImg);
          readerBanner.onloadend = async () => {
            let results = await ipfs.add(readerBanner.result);
            let ipfsHash = results.cid.string;
            resolve('https://gateway.ipfs.io/ipfs/' + ipfsHash);
          };
        } else {
          resolve();
        }
      });

      let result = await Promise.all([promiseIcon, promiseBanner]);
      contentCampaign.titleShort = titleShort ? titleShort : '';
      contentCampaign.slogan = slogan ? slogan : '';
      contentCampaign.titleDescription = titleDescription ? titleDescription : '';
      contentCampaign.description = description ? description : '';
      contentCampaign.urlIcon = result[0] ? result[0] : '';
      contentCampaign.urlBanner = result[1] ? result[1] : '';
      contentCampaign = JSON.stringify(contentCampaign);
      let results = await ipfs.add(contentCampaign);
      let ipfsHash = results.cid.string;
      let infoURL = 'https://gateway.ipfs.io/ipfs/' + ipfsHash;

      amountPerSlot = web3.utils.toWei(amountPerSlot.toString(), 'ether');
      resultAdd = await nftCampaign.methods
        .registerCampaign(
          nftAddress,
          tokenAddress,
          totalSlots,
          amountPerSlot,
          startTime,
          endTime,
          infoURL
        )
        .send({ from: walletAddress })
        .on('receipt', (receipt) => {
          message.success('Create Campaign Successfully');
          return true;
        })
        .on('error', (error, receipt) => {
          console.log(error);
          message.error('Oh no! Something went wrong !');
          return false;
        });
    }
    return resultAdd;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkWhiteListNft = (addressNft) => async (dispatch, getState) => {
  let { nftList, web3 } = getState();
  try {
    if (!nftList) {
      let nftList = new web3.eth.Contract(NFTList.abi, contractAddress.NftList);
      dispatch(setNftList(nftList));
    }
    const result = await nftList.methods.isAcceptedNFT(addressNft).call();
    return result;
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }
};

export const checkAllowance = (addressToken, amount) => async (dispatch, getState) => {
  const { walletAddress, web3 } = getState();
  try {
    const instaneErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    let allowance = await instaneErc20.methods
      .allowance(walletAddress, contractAddress.NFTCampaign)
      .call();
    return allowance;
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }
};

export const checkBalance = (addressToken) => async (dispatch, getState) => {
  const { walletAddress, web3 } = getState();
  try {
    const instaneErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    let weiBalance = await instaneErc20.methods.balanceOf(walletAddress).call();
    let symbol = await instaneErc20.methods.symbol().call();
    return { weiBalance, symbol };
  } catch (error) {
    console.log(error);
    message.error('Oh no! Something went wrong !');
  }
};

export const approveERC20 = (addressToken, amount) => async (dispatch, getState) => {
  let { web3, walletAddress } = getState();
  try {
    const instaneErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    await instaneErc20.methods
      .approve(
        contractAddress.NFTCampaign,
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Approve Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const forceEndCampaign = (campaignId) => async (dispatch, getState) => {
  let { nftCampaign, walletAddress } = getState();
  try {
    let result = await nftCampaign.methods
      .forceEnd(campaignId)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Cancel Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
        return false;
      });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const claimTokenByNFT = (campaignId, tokenIds) => async (dispatch, getState) => {
  let { nftCampaign, walletAddress } = getState();
  try {
    let result = await nftCampaign.methods
      .claim(campaignId, tokenIds, walletAddress)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Claim Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
        return false;
      });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const acceptCampaign = (campaignId) => async (dispatch, getState) => {
  let { nftCampaign, walletAddress } = getState();
  try {
    let result = await nftCampaign.methods
      .acceptCampaign(campaignId)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Accept Campaign Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
        return false;
      });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SET_LOADING_CAMPAIGN = 'SET_LOADING_CAMPAIGN';
export const setLoadingCampaign = (loadingCampaign) => async (dispatch) => {
  dispatch({
    type: SET_LOADING_CAMPAIGN,
    loadingCampaign,
  });
};

export const addMoreSlots = (campaignId, slots) => async (dispatch, getState) => {
  let { nftCampaign, walletAddress } = getState();
  try {
    let result = await nftCampaign.methods
      .addMoreSlots(campaignId, slots)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        message.success('Add More Slots Successfully !');
        return true;
      })
      .on('error', (error, receipt) => {
        console.log(error);
        message.error('Oh no! Something went wrong !');
        return false;
      });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
