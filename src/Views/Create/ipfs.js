import store from 'store/index';
import { generateNFT } from 'store/actions';

const IPFS = require('ipfs-http-client');
export const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// use infuria IPFS node to instantie this IPFS instance

const generateURI = async (
  { name, description },
  image,
  form,
  setFiles,
  setIsLoading,
  isCreateNew
) => {
  let draw = {
    name,
    image,
    description,
  };
  draw = JSON.stringify(draw);
  try {
    let results = await ipfs.add(draw);
    let ipfsHash = results.cid.string;
    setIsLoading(false);
    let tokenUri = 'https://gateway.ipfs.io/ipfs/' + ipfsHash;
    await store.dispatch(generateNFT(isCreateNew, tokenUri));

    // reset input
    setFiles([]);
    form.resetFields();
  } catch (error) {
    setIsLoading(false);
    // reset input
    setFiles([]);
    form.resetFields();
    console.log(error);
  }
};

export const uploadIPFS = async (values, form, files, setFiles, setIsLoading, isCreateNew) => {
  setIsLoading(true);
  // post file to IPFS, get the IPFS hash and store it in contract
  try {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(files[0]); // convert file to array for buffer
    reader.onloadend = async () => {
      let results = await ipfs.add(reader.result);
      let ipfsHash = results.cid.string;
      let image = 'https://gateway.ipfs.io/ipfs/' + ipfsHash;
      generateURI(values, image, form, setFiles, setIsLoading, isCreateNew);
    };
  } catch (error) {
    console.error(error);
  }
};
