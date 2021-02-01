import { Tabs } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

import './index.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ConnectWallet from 'Components/ConnectWallet';

const { TabPane } = Tabs;

export default function Profile() {
  const { web3, walletAddress } = useSelector((state) => state);
  const [copy, setCopy] = useState('CLICK TO COPY');
  const [isWantCopy, setIsWantCopy] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopy('COPIED!');
  };

  const onEnter = () => {
    setCopy('CLICK TO COPY');
    setIsWantCopy(true);
  };

  const onLeave = () => {
    setIsWantCopy(false);
  };

  return (
    <>
      {!!web3 ? (
        <div>
          <div className='profile-header'>
            <div className='banner relative'>
              <img
                src='https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-9/p720x720/73196497_2232701780168912_3454505503990743040_o.jpg?_nc_cat=104&ccb=2&_nc_sid=e3f864&_nc_ohc=1rBDld0-k08AX9vObpb&_nc_oc=AQlH2TP3kGh7vO29bA0hIJBn-ngflDW3OcDHYLwe_BDrwEwEgj8BBknXB3X_XbFou6ptuCBZrp4FrNBoKrAElfIG&_nc_ht=scontent.fsin1-1.fna&tp=6&oh=1d92a7d825941c0ab9ccedb1646938f3&oe=603ED3EA'
                alt='banner'
              />
              <div className='change-image' style={{ display: 'flex' }}>
                <CameraOutlined style={{ fontSize: '20px' }} />
                <p style={{ paddingLeft: '5px', margin: 0 }}>
                  <strong>Change your cover</strong>
                </p>
              </div>
            </div>

            <div className='avatar center'>
              <img
                src='https://scontent.fsin1-1.fna.fbcdn.net/v/t31.0-1/p200x200/27913008_1343532222419210_5035256045101811857_o.jpg?_nc_cat=101&ccb=2&_nc_sid=7206a8&_nc_ohc=wj7IFtQdmQUAX_N8StO&_nc_ht=scontent.fsin1-1.fna&tp=6&oh=98ad1d40ab38ccadf1701bfd51a09f2d&oe=603BA99C'
                alt='avatar'
              />
              <div className='change-image'>
                <CameraOutlined style={{ fontSize: '20px' }} />
              </div>
            </div>
            <div className='name'>
              <p>Unnamed</p>
            </div>
            <div
              className='address'
              onClick={copyToClipboard}
              onMouseEnter={() => onEnter()}
              onMouseLeave={() => onLeave()}
            >
              <p>{walletAddress}</p>
              {isWantCopy ? (
                <p style={{ fontSize: '10px', textAlign: 'center' }}>{copy}</p>
              ) : (
                <div style={{ height: '25px' }} />
              )}
            </div>
          </div>
          <div>
            <Tabs defaultActiveKey='1' type='card' size={'large'}>
              <TabPane tab='ERC 721' key='1'>
                Content of card tab 1
              </TabPane>
              <TabPane tab='ERC 1155' key='2'>
                Content of card tab 2
              </TabPane>
              <TabPane tab='Card Tab 3' key='3'>
                Content of card tab 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className='center' style={{ height: '400px', width: '100wh' }}>
          <ConnectWallet />
        </div>
      )}
    </>
  );
}
