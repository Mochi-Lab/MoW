import { Form, Input, Button, Row, message } from 'antd';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { generateNFt } from 'store/actions';
import IconLoading from 'Components/IconLoading';
import Collections from './Collections';
import ConnectWallet from 'Components/ConnectWallet';

const { TextArea } = Input;

export default function MyCollection() {
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state) => state);
  const [isCreateNew, setIsCreateNew] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const [form] = Form.useForm();

  const generateUUID = () => {
    let uuid = '';
    const cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      uuid += cs.charAt(Math.floor(Math.random() * cs.length));
    }
    return uuid;
  };

  const generateImageUri = (values) => {
    // Start Upload image
    setIsLoading(true);

    var blob = new Blob([files[0]], { type: files[0].fype });
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
        generateURI(values, image);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  const generateURI = ({ name, description }, image) => {
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

        await dispatch(generateNFt(isCreateNew, tokenUri));

        // reset inpurt
        setFiles([]);
        form.resetFields();
      })
      .catch((e) => {
        setIsLoading(false);
        // reset inpurt
        setFiles([]);
        form.resetFields();
        console.log(e);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onFinish = (values) => {
    if (files.length > 0) generateImageUri(values);
    else message.warn('Did you forget upload an Image ?');
  };

  return (
    <div className='center'>
      <div className='my-collection'>
        {isLoading ? (
          <div className='center loading'>
            <IconLoading />
          </div>
        ) : (
          <></>
        )}
        <h2 className='textmode'>You can create NFT for your own !!!</h2>

        <div>
          <div>
            <h3 className='text-upload-image textmode'>Upload Image</h3>
            <div className='drag-box-search'>
              <div className='drag-box' {...getRootProps({ className: 'dropzone input-mode-bc' })}>
                <input {...getInputProps()} />
                {!!files[0] ? (
                  <img
                    src={files[0].preview}
                    alt='priview'
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <p className='textmode'>{'Drag and Drop your image here'}</p>
                )}
              </div>
            </div>
          </div>
          <div className='input-area'>
            <div>
              <h3 className='text-upload-image textmode'>Choose collection</h3>
              <Collections isCreateNew={isCreateNew} setIsCreateNew={setIsCreateNew} />
            </div>
            <Form onFinish={onFinish} form={form} layout='vertical'>
              <Form.Item
                label='Name'
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Please input name of NFT!',
                  },
                ]}
              >
                <Input
                  className='input-name-nft input-mode-bc'
                  placeholder='Name of Nft'
                  size='large'
                />
              </Form.Item>
              <Form.Item label='Description' name='description'>
                <TextArea
                  className='input-name-nft input-mode-bc'
                  autoSize={{ minRows: 6 }}
                  placeholder='Description'
                />
              </Form.Item>
              <Form.Item>
                <Row justify='end'>
                  {walletAddress ? (
                    <Button type='primary' htmlType='submit' shape='round' size='large'>
                      Create Item
                    </Button>
                  ) : (
                    <ConnectWallet />
                  )}
                </Row>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
