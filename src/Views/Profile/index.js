import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { WalletOutlined, HistoryOutlined } from '@ant-design/icons';
import ConnectWallet from 'Components/ConnectWallet';
import ERC721Filter from 'Components/ERC721Filter';
import Edit from './Edit';

import './index.css';
import TransactionTable from 'Components/TransactionTable';

const { TabPane } = Tabs;

export default function Profile() {
  const { web3, walletAddress, threeboxProfile } = useSelector((state) => state);
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
                src={
                  threeboxProfile && threeboxProfile.coverPhoto
                    ? 'https://gateway.ipfs.io/ipfs/' +
                      threeboxProfile.coverPhoto[0].contentUrl['/']
                    : 'https://jordan-medical-services.com/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-4.jpg'
                }
                alt='banner'
              />
              <Edit />
            </div>

            <div className='avatar center'>
              <img
                src={
                  threeboxProfile && threeboxProfile.image
                    ? 'https://gateway.ipfs.io/ipfs/' + threeboxProfile.image[0].contentUrl['/']
                    : 'https://medisetter.com/vi/medical/accr/1.png'
                }
                alt='avatar'
              />
            </div>
            <div className='name'>
              {threeboxProfile && threeboxProfile.name ? (
                <p>{threeboxProfile.name}</p>
              ) : (
                <p>Unnamed</p>
              )}
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
          <div style={{ width: '95vw' }}>
            <Tabs defaultActiveKey='1' type='card' size={'large'}>
              <TabPane
                tab={
                  <div>
                    <WalletOutlined />
                    <strong>My Wallet</strong>
                  </div>
                }
                key='1'
              >
                <ERC721Filter />
              </TabPane>
              <TabPane
                tab={
                  <div>
                    <HistoryOutlined />
                    <strong>Activity</strong>
                  </div>
                }
                key='2'
              >
                <TransactionTable />
              </TabPane>
              <TabPane tab={<strong>Card Tab 3</strong>} key='3'>
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
