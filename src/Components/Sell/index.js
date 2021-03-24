import 'Views/DetailNFT/style.css';
import { Button, InputNumber, Modal, Form } from 'antd';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { createSellOrder } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import bnb from 'Assets/binance-coin.svg';

import './index.css';

export default function Sell({ token }) {
  const dispatch = useDispatch();
  const { addressToken, id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { web3 } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      await dispatch(
        createSellOrder(addressToken, id, web3.utils.toWei(values.price.toString(), 'ether'))
      );
      setIsModalVisible(false);
      setLoading(false);
    },
    [dispatch, addressToken, id, web3.utils]
  );

  const handleOk = async () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='gSzfBw'>
        <Button type='primary' shape='round' size='large' onClick={showModal}>
          Sell
        </Button>
      </div>

      <Modal
        title={
          <h3 className='textmode' style={{ marginBottom: 0 }}>
            Sell order
          </h3>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key='cancel'
            shape='round'
            size='large'
            loading={loading}
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>,
          <Button
            key='sell'
            type='primary'
            shape='round'
            size='large'
            loading={loading}
            onClick={() => handleOk()}
          >
            Sell
          </Button>,
        ]}
      >
        <div className='sell-img'>
          <img alt='img-nft' src={token.image} />
          <p className='textmode'>{token.name}</p>
        </div>
        <div className='price-des'>
          <p className='textmode'>Price</p>

          <p className='textmode'>Will be on sale until you transfer this item or cancel it.</p>
        </div>
        <div style={{ display: 'flex' }}>
          <div className='center' style={{ height: 38, padding: '0px 10px 0px 10px' }}>
            <img className='bnb-coin' src={bnb} alt='bnb' />
          </div>
          <Form onFinish={onSubmit} form={form}>
            <Form.Item name={['price']} rules={[{ required: true, message: 'Enter price' }]}>
              <InputNumber
                size='large'
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={{ width: 250 }}
                placeholder='Set Price'
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
