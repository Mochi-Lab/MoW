import { Menu, Input, Grid, Col } from 'antd';

const { useBreakpoint } = Grid;

export default function LeftNar() {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <div>
        <Col
          span={md ? 40 : 23}
          className='center'
          style={{ height: '46px', paddingLeft: md ? '0px' : '10px' }}
        >
          <Input.Search allowClear style={{ width: '100%' }} placeholder='Search NFT' />
        </Col>
      </div>
    </Menu>
  );
}
