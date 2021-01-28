import { Menu, Input, Grid } from 'antd';

const { useBreakpoint } = Grid;

export default function LeftNar() {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <div
        className='center'
        style={{ height: '46px', width: md ? '400px' : '250px', paddingLeft: md ? '0px' : '10px' }}
      >
        <Input.Search allowClear style={{ width: '100%' }} placeholder='Search NFT' />
      </div>
    </Menu>
  );
}
