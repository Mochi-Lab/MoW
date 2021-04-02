import 'Views/DetailNFT/style.css';
import { Button } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cancelSellOrder } from 'store/actions';
import LoadingModal from 'Components/LoadingModal';

export default function Cancel({ orderDetail }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const cancel = async () => {
    setVisible(true);
    await dispatch(cancelSellOrder(orderDetail));
    setVisible(false);
  };

  return (
    <div className='actions-btn'>
      <LoadingModal title={'Cancel'} visible={visible} />
      <div className='gSzfBw'>
        <Button type='primary' shape='round' size='large' onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
