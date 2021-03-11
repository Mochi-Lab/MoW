import 'Views/DetailNFT/style.css';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { buyNft } from 'store/actions';

export default function Buy({ orderDetail }) {
  const dispatch = useDispatch();
  const buy = async () => {
    dispatch(buyNft(orderDetail));
  };

  return (
    <div className='actions-btn'>
      <div className='gSzfBw'>
        <Button type='primary' shape='round' size='large' onClick={buy}>
          Buy now
        </Button>
      </div>
    </div>
  );
}
