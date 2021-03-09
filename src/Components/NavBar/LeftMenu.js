import { Menu, Input, Grid, Col } from 'antd';
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
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <div>
        <Col
          span={md ? 40 : 23}
          className='center'
          style={{ height: '46px', paddingLeft: md ? '0px' : '10px' }}
        >
          <Input
            size='large'
            allowClear
            style={{ width: '100%' }}
            placeholder='Search by name, collection'
            onChange={(e) => searchNFT(e.target.value)}
            prefix={<SearchOutlined />}
            className='input-search-nft'
          />
        </Col>
      </div>
    </Menu>
  );
}
