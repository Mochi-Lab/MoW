import { Form, Input, Button, Row, message, Radio } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import IconLoading from 'Components/IconLoading';
import Collections from './Collections';
import ConnectWallet from 'Components/ConnectWallet';
import { uploadSia } from './sia';
import { uploadIPFS } from './ipfs';
import './index.css';
import { useHistory } from 'react-router';

const { TextArea } = Input;

export default function CreateERC1155() {
  const { walletAddress } = useSelector((state) => state);
  const [storage, setStorage] = useState(0);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const [form] = Form.useForm();

  const history = useHistory();

  const goBack = () => {
    history.goBack();
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

  const handleStorageChange = (e) => {
    setStorage(e.target.value);
  };

  const onFinish = (values) => {
    if (files.length > 0) {
      if (storage === 0) uploadIPFS(values, form, files, setFiles, setIsLoading, isCreateNew);
      else uploadSia(values, form, files, setFiles, setIsLoading, isCreateNew);
    } else message.warn('Did you forget upload an Image ?');
  };

  return (
    <div className='center create-pt'>
      <div className='my-collection'>
        {isLoading ? (
          <div className='center loading'>
            <IconLoading />
          </div>
        ) : (
          <></>
        )}
        <Button type='text' onClick={goBack} icon={<ArrowLeftOutlined />} className='textmode'>
          Go Back
        </Button>

        <h2 className='textmode'>You can create NFT for your own !!!</h2>

        <div>
          <div>
            <h3 className='text-upload-image textmode'>Upload Image</h3>
            <div className='drag-box-search'>
              <div className='drag-box' {...getRootProps({ className: 'dropzone' })}>
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
            <h3 className='text-upload-image textmode'>Select Storage</h3>
            <Radio.Group value={storage} onChange={handleStorageChange}>
              <Radio.Button value={0}>IPFS</Radio.Button>
              <Radio.Button value={1}>Sia</Radio.Button>
            </Radio.Group>
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
