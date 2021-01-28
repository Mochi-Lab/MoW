import { Menu, Input } from 'antd';

export default function LeftNar() {
  return (
    <Menu mode='horizontal'>
      <div className='center' style={{ height: '46px', width: '400px' }}>
        <Input.Search allowClear style={{ width: '100%' }} placeholder='Search NFT' />
      </div>
    </Menu>
  );
}
