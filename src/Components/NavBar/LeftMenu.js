import { Input, Grid, Col, Select } from 'antd';
import { setStrSearch } from 'store/actions';
import store from 'store/index';
import { SearchOutlined } from '@ant-design/icons';
import './index.css';

const { useBreakpoint } = Grid;
const { Option } = Select;

export default function LeftNar() {
  const { md } = useBreakpoint();
  const searchNFT = (text) => {
    store.dispatch(setStrSearch(text));
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Col
      span={md ? 40 : 25}
      className='center'
      style={{ height: '46px', paddingLeft: md ? '0px' : '10px' }}
    >
      <Select
        size='large'
        defaultValue='Binance Mainnet'
        className='input-search-nft textmode'
        style={{ minWidth: 180, marginRight: 10 }}
        onChange={handleChange}
      >
        <Option value='Binance Mainnet'>Binance Mainnet</Option>
        <Option value='Binance Testnet'>Binance Testnet</Option>
        <Option value='Harmony'>Harmony</Option>
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
