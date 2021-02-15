import s from 'Views/DetailNFT/style.module.css';
import { Button, InputNumber } from 'antd';
import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useParams } from 'react-router-dom';
import { createSellOrder } from 'store/actions';
import { useDispatch } from 'react-redux';

import './index.css';

export default function Sell({ token }) {
  const dispatch = useDispatch();
  const [price, setPrice] = useState();
  const { addressToken, id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await dispatch(createSellOrder(addressToken, id, price));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setPrice(e);
  };

  return (
    <div className='PE'>
      <div className={s['actions-btn']}>
        <div className={s.gSzfBw}>
          <Button type='primary' shape='round' size='large' onClick={showModal}>
            Sell
          </Button>
        </div>
      </div>
      <Modal title='Sell order' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='sell-img'>
          <img alt='img-nft' src={token.image} />
          <p>{token.name}</p>
        </div>
        <div className='price-des'>
          <p>Price</p>

          <p>Will be on sale until you transfer this item or cancel it.</p>
        </div>
        <InputNumber
          size='large'
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onChange={onChange}
          style={{ width: 250 }}
          placeholder='Set Price'
        />
      </Modal>
    </div>
  );
}
