import { Input, Grid, Col } from 'antd';
import { setStrSearch } from 'store/actions';
import store from 'store/index';
import { SearchOutlined } from '@ant-design/icons';
import './index.css';

const { useBreakpoint } = Grid;

export default function LeftNar() {
  const { md } = useBreakpoint();
  const searchNFT = (text) => {
    store.dispatch(setStrSearch(text));
  };
  return (
    <Col
      span={md ? 40 : 25}
      className='center'
      style={{ height: '46px', paddingLeft: md ? '0px' : '10px' }}
    >
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
