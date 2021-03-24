import 'Views/DetailNFT/style.css';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSellOrder } from 'store/actions';

export default function Cancel({ orderDetail }) {
  const dispatch = useDispatch();
  const { isLoadingTx } = useSelector((state) => state);
  const cancel = async () => {
    dispatch(cancelSellOrder(orderDetail));
  };

  return (
    <div className='actions-btn'>
      <div className='gSzfBw'>
        <Button type='primary' shape='round' size='large' loading={isLoadingTx} onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
