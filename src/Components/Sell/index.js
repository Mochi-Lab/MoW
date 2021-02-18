import s from 'Views/DetailNFT/style.module.css';
import { Button, InputNumber } from 'antd';
import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useParams } from 'react-router-dom';
import { createSellOrder } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import bnb from 'Assets/binance-coin.svg';

import './index.css';

export default function Sell({ token }) {
  const dispatch = useDispatch();
  const [price, setPrice] = useState();
  const { addressToken, id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { web3 } = useSelector((state) => state);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await dispatch(createSellOrder(addressToken, id, web3.utils.toWei(price.toString(), 'ether')));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setPrice(e);
  };

  return (
    <>
      <div className={s.gSzfBw}>
        <Button type='primary' shape='round' size='large' onClick={showModal}>
          Sell
        </Button>
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
        <div style={{ display: 'flex' }}>
          <div className='center' style={{ height: 38, padding: '0px 10px 0px 0px' }}>
            <img className='bnb-coin' src={bnb} alt='bnb' />
          </div>
          <InputNumber
            size='large'
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            onChange={onChange}
            style={{ width: 250 }}
            placeholder='Set Price'
          />
        </div>
      </Modal>
    </>
  );
}
