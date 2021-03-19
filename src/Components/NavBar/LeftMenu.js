import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Grid, Col, Select } from 'antd';
import { setStrSearch, setWeb3 } from 'store/actions';
import { SearchOutlined } from '@ant-design/icons';
import { getWeb3List, web3Default } from 'utils/getWeb3List';
import store from 'store/index';
import './index.css';

const { useBreakpoint } = Grid;
const { Option } = Select;

export default function LeftNar() {
  const dispatch = useDispatch();
  const [network, setNetwork] = useState(97);
  const { chainId } = useSelector((state) => state);

  useEffect(() => {
    if (!!chainId) setNetwork(chainId);
  }, [chainId]);

  useEffect(() => {
    dispatch(setWeb3(getWeb3List(network).web3Default));
  }, [network, dispatch]);

  const { md } = useBreakpoint();
  const searchNFT = (text) => {
    store.dispatch(setStrSearch(text));
  };

  function handleChange(value) {
    setNetwork(value);
  }

  return (
    <Col
      span={md ? 40 : 25}
      className='center'
      style={{ height: '46px', paddingLeft: md ? '0px' : '10px' }}
    >
      <Select
        size='large'
        defaultValue={97}
        value={network}
        className='input-search-nft textmode'
        style={{ minWidth: 180, marginRight: 10 }}
        onChange={handleChange}
      >
        {Object.keys(web3Default).map((item) => (
          <Option key={item} value={parseInt(item)}>
            {web3Default[`${item}`].name}
          </Option>
        ))}
      </Select>
      <Input
        size='large'
        allowClear
        style={{ width: '100%' }}
        placeholder='Search by name, collection'
        onChange={(e) => searchNFT(e.target.value)}
        prefix={<SearchOutlined className='search-style' />}
        className='input-search-nft'
      />
    </Col>
  );
}
