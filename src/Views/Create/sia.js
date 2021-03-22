import store from 'store/index';
import { generateNFT } from 'store/actions';

const generateUUID = () => {
  let uuid = '';
  const cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) {
    uuid += cs.charAt(Math.floor(Math.random() * cs.length));
  }
  return uuid;
};

const generateURI = ({ name, description }, image, form, setFiles, setIsLoading, isCreateNew) => {
  let draw = {
    name,
    image,
    description,
  };
  draw = JSON.stringify(draw);
  var blob = new Blob([draw], { type: 'application/json' });
  var formData = new FormData();
  formData.append('file', blob);

  const uuid = generateUUID();
  fetch(`https://siasky.net/skynet/skyfile/${uuid}`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then(async (result) => {
      let tokenUri = 'https://siasky.net/' + result.skylink;
      setIsLoading(false);

      await store.dispatch(generateNFT(isCreateNew, tokenUri));

      // reset input
      setFiles([]);
      form.resetFields();
    })
    .catch((e) => {
      setIsLoading(false);
      // reset input
      setFiles([]);
      form.resetFields();
      console.log(e);
    });
};

export const uploadSia = (values, form, files, setFiles, setIsLoading, isCreateNew) => {
  // Start Upload image
  setIsLoading(true);

  var blob = new Blob([files[0]], { type: files[0].type });
  var formData = new FormData();
  formData.append('file', blob);

  const uuid = generateUUID();
  fetch(`https://siasky.net/skynet/skyfile/${uuid}`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      let image = 'https://siasky.net/' + result.skylink;
      generateURI(values, image, form, setFiles, setIsLoading, isCreateNew);
    })
    .catch((e) => {
      setIsLoading(false);
      console.log(e);
    });
};
