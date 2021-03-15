import { ShareAltOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import './index.css';

export default function Share({ token }) {
  const [text] = useState(`Yoo! look what I found! ${token.name}`);

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${window.location.href}&hashtags=MochiMarket%2Cbnb%2Cnonfungible%2Cdigitalasset%2Cnft`,
      '_blank',
      'toolbar=yes,resizable=yes,top=300,width=500,height=400'
    );
  };

  return (
    <Popconfirm
      placement='bottomRight'
      title={
        <div>
          <h3>Share this collectible</h3>
          <Button
            shape='circle'
            icon={<TwitterOutlined />}
            size='large'
            onClick={() => shareTwitter()}
          />
        </div>
      }
      style={{ height: '40px', borderRadius: '30px' }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      icon={<></>}
    >
      <div>
        <Button shape='circle' icon={<ShareAltOutlined />} size='large' />
      </div>
    </Popconfirm>
  );
}
