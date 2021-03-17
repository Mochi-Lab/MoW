import 'Views/DetailNFT/style.css';
import { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { transferNft } from 'store/actions';

export default function Transfer({ token }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const { addressToken, id } = useParams();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await dispatch(transferNft(addressToken, transferTo, id));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setTransferTo(e.target.value);
  };

  return (
    <>
      <div className='gSzfBw'>
        <Button shape='round' size='large' onClick={showModal}>
          Transfer
        </Button>
      </div>
      <Modal
        title={
          <h3 className='textmode' style={{ marginBottom: 0 }}>
            Transfer
          </h3>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key='cancel' shape='round' size='large' onClick={() => handleCancel()}>
            Cancel
          </Button>,
          <Button key='sell' type='primary' shape='round' size='large' onClick={() => handleOk()}>
            Transfer
          </Button>,
        ]}
      >
        <div className='sell-img'>
          <img alt='img-nft' src={token.image} />
          <p className='textmode'>{token.name}</p>
        </div>
        <div className='price-des'>
          <Input
            size='large'
            onChange={onChange}
            style={{ width: '100%' }}
            placeholder='Transfer to address'
          />
        </div>
      </Modal>
    </>
  );
}
