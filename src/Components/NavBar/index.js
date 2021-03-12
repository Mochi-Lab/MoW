import { useState } from 'react';

import { Drawer, Button } from 'antd';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Link } from 'react-router-dom';
import logoMochi from 'Assets/logo-mochi.png';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='menuBar alignItem'>
      <div className='logo'>
        <Link to='/'>
          <img src={logoMochi} alt='logo'></img>
        </Link>
      </div>
      <Button className='barsMenu' style={{ display: 'none' }} onClick={showDrawer}>
        {visible ? <UpOutlined /> : <DownOutlined />}
      </Button>
      <div className='menuCon'>
        <div className='leftMenu'>
          <LeftMenu />
        </div>
        <div className='rightMenu'>
          <RightMenu />
        </div>

        <Drawer
          bodyStyle={{ padding: 0, width: '300px' }}
          placement='left'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
}
