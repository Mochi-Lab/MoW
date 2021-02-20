import { Form, Input, Button, Row, message } from 'antd';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import './index.css';
import { generateNFt } from 'store/actions';
import { PacmanLoader } from 'react-spinners';

const { TextArea } = Input;

export default function MyCollection() {
  const dispatch = useDispatch();

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

        await dispatch(generateNFt(name, tokenUri));

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
    <div className='my-collection'>
      {isLoading ? (
        <div className='center loading'>
          <PacmanLoader color={'#36D7B7'} />
        </div>
      ) : (
        <></>
      )}
      <h2>You can create NFT for your own !!!</h2>

      <div>
        <div>
          <h3>Upload Image</h3>
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
                <p>{'Drag and Drop your image here'}</p>
              )}
            </div>
          </div>
        </div>
        <div className='input-area'>
          <Form onFinish={onFinish} form={form}>
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
                style={{ marginBottom: '15px', width: '30vw' }}
                placeholder='Name of Nft'
                size='large'
              />
            </Form.Item>
            <Form.Item label='Description' name='description'>
              <TextArea
                style={{ width: '30vw' }}
                autoSize={{ minRows: 6 }}
                placeholder='Description'
              />
            </Form.Item>
            <Form.Item>
              <Row justify='end'>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
