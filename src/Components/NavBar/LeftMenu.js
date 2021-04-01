import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Grid, Col, Tag } from 'antd';
import { setStrSearch } from 'store/actions';
import { SearchOutlined } from '@ant-design/icons';
import { web3Default, networkDefault } from 'utils/getWeb3List';
import { useLocation } from 'react-router-dom';
import store from 'store/index';
import './index.css';

const { useBreakpoint } = Grid;

export default function LeftNar() {
  const [network, setNetwork] = useState(networkDefault);
  const { chainId } = useSelector((state) => state);
  const location = useLocation();

  useEffect(() => {
    if (!!chainId) setNetwork(chainId);
  }, [chainId]);

  const { md } = useBreakpoint();
  const searchNFT = (text) => {
    store.dispatch(setStrSearch(text));
  };

  return (
    <Col
      span={md ? 40 : 25}
      className={location.pathname === '/browse' ? 'center' : 'alignItems'}
      style={{ height: '46px', paddingLeft: md ? '0px' : '10px' }}
    >
      <Tag color='success' className='radius-1rem'>
        <div className='box-live-time'>
          <div className='icon-live successDot'></div>
          <span className='time-counter--container'>
            <span>&nbsp;{web3Default[`${network}`].name}</span>
          </span>
        </div>
      </Tag>

      {location.pathname === '/browse' ? (
        <Input
          size='large'
          allowClear
          style={{ width: '100%' }}
          placeholder='Search by name, collection'
          onChange={(e) => searchNFT(e.target.value)}
          prefix={<SearchOutlined className='search-style' />}
          className='input-search-nft'
        />
      ) : (
        <></>
      )}
    </Col>
  );
}
