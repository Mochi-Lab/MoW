import s from 'Views/DetailNFT/style.module.css';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { cancelSellOrder } from 'store/actions';

export default function Cancel({ orderDetail }) {
  const dispatch = useDispatch();
  const cancel = async () => {
    dispatch(cancelSellOrder(orderDetail));
  };

  return (
    <div className={s['actions-btn']}>
      <div className={s.gSzfBw}>
        <Button type='primary' shape='round' size='large' onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
