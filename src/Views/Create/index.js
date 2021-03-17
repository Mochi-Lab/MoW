import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router';
import './index.css';

export default function Create() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  function push(to) {
    history.push(to);
  }

  return (
    <div className='center create-pt'>
      <div className='create-box'>
        <Button type='text' onClick={goBack} icon={<ArrowLeftOutlined />} className='textmode'>
          Go Back
        </Button>
        <h2 className='textmode'>Create collectible</h2>
        <p className='textmode'>
          Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want
          to sell one collectible multiple times
        </p>

        <div className='justifyContentSa'>
          <div className='box input-mode-bc slt center' onClick={() => push('/create/erc721/')}>
            <img
              src='https://rarible.com/static/2a78e39400f51f1dbeba13832f421092.png'
              alt='single'
            />
            <p>Single</p>
          </div>

          <div className='box input-mode-bc slt center' onClick={() => push('/create/erc1155')}>
            <img
              src='https://rarible.com/static/48dc30c106da96755b60ead8627c8888.png'
              alt='multiple'
            />
            <p>Multiple</p>
          </div>
        </div>

        <p className='textmode'>
          We do not own your private keys and cannot access your funds without your confirmation
        </p>
      </div>
    </div>
  );
}
